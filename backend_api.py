from fastapi import FastAPI, HTTPException, Query, Depends, Header
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
import os
import json
import random
import secrets
import uuid
from datetime import datetime, timedelta, timezone
import requests
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor
import bcrypt
import jwt

# Carregar variáveis de ambiente
load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/solda_inspecao"
)

JWT_SECRET = os.getenv("JWT_SECRET", "insecure-dev-secret-change-me")
JWT_ALGORITHM = "HS256"
JWT_EXPIRES_HOURS = 24 * 30

app = FastAPI(
    title="Axion Academy API - Soldagem & Inspeção",
    description="Backend API integrada ao banco de dados PostgreSQL solda_inspecao"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexão com o banco de dados PostgreSQL
def get_db_connection():
    """Retorna uma conexão ativa com o banco PostgreSQL solda_inspecao."""
    return psycopg2.connect(DATABASE_URL)

# ============================================================================
# AUTENTICAÇÃO (JWT + bcrypt, substitui o Supabase Auth)
# ============================================================================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(password: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
    except Exception:
        return False

def create_access_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRES_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def user_to_public_dict(row: dict) -> dict:
    return {
        "id": str(row["id"]),
        "name": row["full_name"],
        "email": row["email"],
        "is_admin": row.get("is_admin", False),
    }

def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    """Dependency que decodifica o Bearer token e carrega o usuário atual."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token de autenticação ausente.")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Sessão expirada. Faça login novamente.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido.")

    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT id, full_name, email, is_admin FROM users WHERE id = %s;", (payload["sub"],))
    user = cur.fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado.")
    return user_to_public_dict(user)

# IA Desacoplada: o carregamento do modelo de embedding local foi removido 
# para reduzir o uso de memória no Render (OOM - 512 MiB limit).
# A busca de conhecimento usará busca textual simples (ILIKE) por padrão.

def search_knowledge_chunks(query_text: str, limit: int = 3):
    """
    Busca semântica no PostgreSQL solda_inspecao na tabela content_chunks com pgvector.
    Possui fallback textual automático caso o vetor ou modelo não estejam disponíveis.
    """
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # Check if table exists
    cur.execute("SELECT to_regclass('public.content_chunks');")
    if not cur.fetchone()['to_regclass']:
        conn.close()
        return []

    # Apenas busca textual simples (fallback)
    try:
        like_pattern = f"%{query_text[:60]}%"
        cur.execute("""
            SELECT c.id, c.content, c.page_number, s.filename as book_title
            FROM content_chunks c
            LEFT JOIN source_documents s ON c.source_document_id = s.id
            WHERE c.content ILIKE %s
            LIMIT %s;
        """, (like_pattern, limit))
        rows = cur.fetchall()
        
        if not rows:
            # Se nada for encontrado por texto, retornar os primeiros trechos relevantes do material
            cur.execute("""
                SELECT c.id, c.content, c.page_number, s.filename as book_title
                FROM content_chunks c
                LEFT JOIN source_documents s ON c.source_document_id = s.id
                LIMIT %s;
            """, (limit,))
            rows = cur.fetchall()
            
        conn.close()
        return rows
    except Exception as e:
        conn.rollback()
        conn.close()
        return []

# ============================================================================
# ENDPOINTS DE SAÚDE E METADADOS DO BANCO
# ============================================================================

import requests

@app.get("/api/health/ai")
def health_ai():
    status = {"ollama": False, "model": "granite4.2:3b", "api": False}
    ollama_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    try:
        res = requests.get(f"{ollama_url}/api/tags", timeout=3)
        if res.status_code == 200:
            status["api"] = True
            models = res.json().get("models", [])
            for m in models:
                if m.get("name") == "granite4.2:3b":
                    status["ollama"] = True
                    break
    except Exception:
        pass
    return status

@app.get("/api/health/database")
def health_database():
    status = {"database": "solda_inspecao", "port": 5432, "connected": False}
    try:
        conn = get_db_connection()
        status["connected"] = True
        conn.close()
    except Exception:
        pass
    return status


@app.get("/api/health")
def health_check():
    """Retorna o status da API e da conexão com o banco PostgreSQL solda_inspecao."""
    db_status = {"connected": False, "database": "solda_inspecao", "host": "localhost"}
    stats = {}
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT current_database(), inet_server_addr(), inet_server_port();")
        db_info = cur.fetchone()
        db_status["connected"] = True
        db_status["database"] = db_info.get("current_database", "solda_inspecao")
        
        # Contagens reais
        for tbl in ['questions', 'question_options', 'content_chunks', 'modules', 'courses']:
            try:
                cur.execute(f"SELECT COUNT(*) as cnt FROM {tbl};")
                stats[tbl] = cur.fetchone()['cnt']
            except:
                pass
        conn.close()
    except Exception as e:
        db_status["error"] = str(e)

    return {
        "status": "online",
        "service": "Axion Academy API",
        "database": db_status,
        "stats": stats
    }

@app.get("/api/courses")
def get_courses():
    """Retorna os cursos disponíveis no banco solda_inspecao."""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT id, title, description FROM courses;")
        courses = cur.fetchall()
        conn.close()
        return courses
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/modules")
def get_modules(course_id: Optional[str] = None):
    """Retorna os módulos do curso de soldagem."""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        if course_id:
            cur.execute("SELECT id, course_id, title, description, position FROM modules WHERE course_id::text = %s ORDER BY position ASC;", (course_id,))
        else:
            cur.execute("SELECT id, course_id, title, description, position FROM modules ORDER BY position ASC;")
        modules = cur.fetchall()
        conn.close()
        return modules
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/subjects")
def get_subjects():
    """Retorna as disciplinas/assuntos de soldagem com total de questões."""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            SELECT s.id, s.name, s.slug, COUNT(q.id) as question_count
            FROM subjects s
            LEFT JOIN questions q ON s.id = q.subject_id
            GROUP BY s.id, s.name, s.slug
            ORDER BY question_count DESC;
        """)
        subjects = cur.fetchall()
        conn.close()
        return subjects
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# ENDPOINTS DE AUTENTICAÇÃO (substitui o Supabase Auth)
# ============================================================================

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

@app.post("/api/auth/signup")
def signup(req: SignupRequest):
    email = req.email.strip().lower()
    if not req.name.strip() or not email or len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Nome, e-mail e senha (mínimo 6 caracteres) são obrigatórios.")

    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute("SELECT id FROM users WHERE email = %s;", (email,))
        if cur.fetchone():
            raise HTTPException(status_code=409, detail="Este e-mail já está cadastrado.")

        user_id = str(uuid.uuid4())
        cur.execute(
            "INSERT INTO users (id, email, password_hash, full_name, is_admin, created_at) "
            "VALUES (%s, %s, %s, %s, false, now()) "
            "RETURNING id, full_name, email, is_admin;",
            (user_id, email, hash_password(req.password), req.name.strip()),
        )
        user = cur.fetchone()
        conn.commit()
    finally:
        conn.close()

    token = create_access_token(str(user["id"]))
    return {"token": token, "user": user_to_public_dict(user)}

@app.post("/api/auth/login")
def login(req: LoginRequest):
    email = req.email.strip().lower()
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT id, full_name, email, is_admin, password_hash FROM users WHERE email = %s;", (email,))
    user = cur.fetchone()
    conn.close()

    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

    token = create_access_token(str(user["id"]))
    return {"token": token, "user": user_to_public_dict(user)}

@app.post("/api/auth/logout")
def logout():
    """Logout é stateless (sem sessão de servidor); o cliente apenas descarta o token."""
    return {"ok": True}

@app.get("/api/auth/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

@app.post("/api/auth/forgot-password")
def forgot_password(req: ForgotPasswordRequest):
    """
    Gera um token de recuperação de senha. Sem SMTP configurado neste ambiente
    local, o link de recuperação é apenas logado no console do backend em vez
    de ser enviado por e-mail.
    """
    email = req.email.strip().lower()
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT id FROM users WHERE email = %s;", (email,))
    user = cur.fetchone()

    if user:
        token = secrets.token_urlsafe(32)
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
        cur.execute(
            "INSERT INTO password_resets (token, user_id, expires_at) VALUES (%s, %s, %s);",
            (token, user["id"], expires_at),
        )
        conn.commit()
        print(f"[Axion] Link de recuperação de senha para {email}: http://localhost:5173/reset-password?token={token}")
    conn.close()

    # Resposta genérica sempre, para não revelar quais e-mails existem
    return {"ok": True, "message": "Se o e-mail existir, um link de recuperação foi gerado."}

# ============================================================================
# ENDPOINTS DE QUESTÕES E EXERCÍCIOS
# ============================================================================

@app.get("/api/questions/{track_id}")
def get_questions(track_id: str, limit: int = 50, subject_id: Optional[str] = None):
    """
    Retorna questões técnicas e suas alternativas a partir do banco PostgreSQL solda_inspecao.
    Compatível com o frontend do Axion (tracker.js).
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        questions = []
        
        # 1. Se subject_id explícito foi passado
        if subject_id:
            cur.execute("""
                SELECT q.id, q.statement, q.difficulty, q.subject_id, q.image_path, q.source_page, q.source_question_number, s.name as subject_name
                FROM questions q
                LEFT JOIN subjects s ON q.subject_id = s.id
                WHERE q.subject_id::text = %s AND (q.status = 'published' OR q.status IS NULL)
                ORDER BY COALESCE(NULLIF(regexp_replace(q.source_question_number, '\\D', '', 'g'), '')::integer, 9999), q.created_at ASC
                LIMIT %s;
            """, (subject_id, limit))
            questions = cur.fetchall()

        # 2. Se track_id corresponder diretamente a um subject_id
        if not questions and track_id:
            cur.execute("""
                SELECT q.id, q.statement, q.difficulty, q.subject_id, q.image_path, q.source_page, q.source_question_number, s.name as subject_name
                FROM questions q
                LEFT JOIN subjects s ON q.subject_id = s.id
                WHERE q.subject_id::text = %s AND (q.status = 'published' OR q.status IS NULL)
                ORDER BY COALESCE(NULLIF(regexp_replace(q.source_question_number, '\\D', '', 'g'), '')::integer, 9999), q.created_at ASC
                LIMIT %s;
            """, (track_id, limit))
            questions = cur.fetchall()

        # 3. Se track_id corresponder ao ID de um módulo
        if not questions and track_id:
            cur.execute("SELECT title FROM modules WHERE id::text = %s;", (track_id,))
            mod = cur.fetchone()
            if mod:
                cur.execute("""
                    SELECT q.id, q.statement, q.difficulty, q.subject_id, q.image_path, q.source_page, q.source_question_number, s.name as subject_name
                    FROM questions q
                    JOIN subjects s ON q.subject_id = s.id
                    WHERE s.name ILIKE %s AND (q.status = 'published' OR q.status IS NULL)
                    ORDER BY COALESCE(NULLIF(regexp_replace(q.source_question_number, '\\D', '', 'g'), '')::integer, 9999), q.created_at ASC
                    LIMIT %s;
                """, (f"%{mod['title']}%", limit))
                questions = cur.fetchall()

        # 4. Caso seja o ID geral de curso ou fallback geral
        if not questions:
            cur.execute("""
                SELECT q.id, q.statement, q.difficulty, q.subject_id, q.image_path, q.source_page, q.source_question_number, s.name as subject_name
                FROM questions q
                LEFT JOIN subjects s ON q.subject_id = s.id
                WHERE (q.status = 'published' OR q.status IS NULL)
                ORDER BY COALESCE(NULLIF(regexp_replace(q.source_question_number, '\\D', '', 'g'), '')::integer, 9999), q.created_at ASC
                LIMIT %s;
            """, (limit,))
            questions = cur.fetchall()

        if not questions:
            conn.close()
            return []

        # Buscar alternativas para todas as questões recuperadas
        q_ids = tuple([q['id'] for q in questions])
        cur.execute("""
            SELECT id, question_id, label, content, is_correct
            FROM question_options
            WHERE question_id IN %s
            ORDER BY question_id, label ASC;
        """, (q_ids,))
        options_rows = cur.fetchall()
        conn.close()

        from collections import defaultdict
        opts_map = defaultdict(list)
        for opt in options_rows:
            opts_map[str(opt['question_id'])].append(opt)

        formatted_questions = []
        for q in questions:
            q_id_str = str(q['id'])
            raw_opts = opts_map.get(q_id_str, [])

            opts_formatted = []
            correct_idx = 0
            for idx, o in enumerate(raw_opts):
                label = o['label'] or chr(65 + idx)
                content = (o['content'] or '').strip()
                if not content.startswith(f"({label})") and not content.startswith(f"{label})"):
                    text = f"({label}) {content}"
                else:
                    text = content
                opts_formatted.append(text)
                if o['is_correct']:
                    correct_idx = idx

            subject_label = q['subject_name'] or "Inspeção de Soldagem"
            page_ref = f" (Pág. {q['source_page']})" if q.get('source_page') else ""
            num_ref = f" - Questão {q['source_question_number']}" if q.get('source_question_number') else ""
            formatted_questions.append({
                "id": q_id_str,
                "track_id": track_id,
                "skill_id": str(q['subject_id'] or "s_weld_general"),
                "question_text": q['statement'],
                "image_path": q.get('image_path'),
                "source_page": q.get('source_page'),
                "source_question_number": q.get('source_question_number'),
                "options": opts_formatted,
                "correct_index": correct_idx,
                "explanation": f"Gabarito oficial baseado na literatura técnica de {subject_label}{num_ref}{page_ref}.",
                "difficulty": q['difficulty'] or "Intermediário"
            })

        return formatted_questions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# ENDPOINTS DE TRILHAS, AULAS, PROVAS E PROGRESSO
# (schema real: courses -> modules -> lessons; exams -> exam_questions ->
#  questions -> question_options; progresso em user_lesson_progress /
#  user_module_progress; respostas em user_answers)
# ============================================================================

@app.get("/api/courses/{course_id}")
def get_course_detail(course_id: str):
    """Curso + seus módulos e aulas, para a tela de detalhes da trilha."""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM courses WHERE id::text = %s;", (course_id,))
        course = cur.fetchone()
        if not course:
            conn.close()
            raise HTTPException(status_code=404, detail="Curso não encontrado.")
        cur.execute(
            "SELECT * FROM modules WHERE course_id::text = %s ORDER BY position ASC;",
            (course_id,),
        )
        modules = cur.fetchall()
        for m in modules:
            cur.execute(
                "SELECT * FROM lessons WHERE module_id::text = %s ORDER BY position ASC;",
                (str(m["id"]),),
            )
            m["lessons"] = cur.fetchall()
        conn.close()
        return {**course, "modules": modules}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/lessons/{lesson_id}")
def get_lesson_detail(lesson_id: str):
    """
    Detalhe de uma aula pedagógica completa:
    Estrutura autoral (introdução, objetivos, explicação técnica, pontos de atenção, resumo)
    + questões associadas com alternativas, gabarito, imagens e referências.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            """
            SELECT l.*, sd.filename AS source_filename, m.title as module_title
            FROM lessons l
            LEFT JOIN modules m ON l.module_id = m.id
            LEFT JOIN source_documents sd ON sd.id = l.source_document_id
            WHERE l.id::text = %s;
            """,
            (lesson_id,),
        )
        lesson = cur.fetchone()
        if not lesson:
            conn.close()
            raise HTTPException(status_code=404, detail="Aula não encontrada.")

        # Buscar questões associadas à aula via lesson_questions
        cur.execute(
            """
            SELECT q.id, q.statement, q.difficulty, q.image_path, q.source_page, 
                   q.source_question_number, lq.position, s.name as subject_name
            FROM lesson_questions lq
            JOIN questions q ON lq.question_id = q.id
            LEFT JOIN subjects s ON q.subject_id = s.id
            WHERE lq.lesson_id::text = %s AND q.status = 'published'
            ORDER BY lq.position ASC;
            """,
            (lesson_id,),
        )
        questions = cur.fetchall()

        # Se não houver questões ligadas diretamente pelo lesson_id, buscar pelo subject correspondente
        if not questions and lesson.get("module_title"):
            cur.execute(
                """
                SELECT q.id, q.statement, q.difficulty, q.image_path, q.source_page, 
                       q.source_question_number, ROW_NUMBER() OVER (ORDER BY q.created_at ASC) as position,
                       s.name as subject_name
                FROM questions q
                JOIN subjects s ON q.subject_id = s.id
                WHERE s.name = %s AND q.status = 'published'
                ORDER BY q.created_at ASC
                LIMIT 15;
                """,
                (lesson["module_title"],),
            )
            questions = cur.fetchall()

        # Buscar opções das questões
        options_by_qid = {}
        if questions:
            q_ids = tuple([q["id"] for q in questions])
            cur.execute(
                """
                SELECT id, question_id, label, content, is_correct
                FROM question_options
                WHERE question_id IN %s
                ORDER BY question_id, label ASC;
                """,
                (q_ids,),
            )
            opt_rows = cur.fetchall()
            for opt in opt_rows:
                qid_str = str(opt["question_id"])
                options_by_qid.setdefault(qid_str, []).append(opt)

        conn.close()

        # Montar as etapas pedagógicas (steps)
        steps = []
        step_pos = 1

        # Etapa 1: Introdução & Objetivos
        intro_text = lesson.get("introduction") or ""
        obj_text = lesson.get("objectives") or ""
        if intro_text or obj_text:
            content_md = f"### Introdução ao Tema\n\n{intro_text}\n\n"
            if obj_text:
                content_md += f"#### Objetivos de Aprendizagem\n{obj_text}"
            steps.append({
                "id": f"step-{lesson['id']}-intro",
                "lesson_id": str(lesson["id"]),
                "step_type": "text",
                "title": "Introdução e Objetivos",
                "content": content_md,
                "position": step_pos
            })
            step_pos += 1

        # Etapa 2: Explicação Técnica & Conceitos-Chave
        exp_text = lesson.get("explanation") or ""
        if exp_text:
            key_c = lesson.get("key_concepts")
            key_c_md = ""
            if key_c and isinstance(key_c, list):
                key_c_md = "\n\n#### Conceitos Fundamentais\n"
                for kc in key_c:
                    if isinstance(kc, dict):
                        key_c_md += f"- **{kc.get('term', '')}**: {kc.get('definition', '')}\n"
            steps.append({
                "id": f"step-{lesson['id']}-exp",
                "lesson_id": str(lesson["id"]),
                "step_type": "explanation",
                "title": "Conceitos Teóricos Fundamentais",
                "content": f"{exp_text}{key_c_md}",
                "position": step_pos
            })
            step_pos += 1

        # Etapa 3: Pontos de Atenção para o Inspetor de Soldagem N1
        notes_text = lesson.get("inspector_notes") or ""
        if notes_text:
            steps.append({
                "id": f"step-{lesson['id']}-notes",
                "lesson_id": str(lesson["id"]),
                "step_type": "example",
                "title": "Pontos de Atenção para o Inspetor N1",
                "content": notes_text,
                "position": step_pos
            })
            step_pos += 1

        # Etapa 4..N: Questões práticas correspondentes da fonte original
        for idx, q in enumerate(questions):
            q_id_str = str(q["id"])
            raw_opts = options_by_qid.get(q_id_str, [])
            opts_formatted = []
            correct_idx = 0
            for o_idx, opt in enumerate(raw_opts):
                label = opt["label"] or chr(65 + o_idx)
                content = (opt["content"] or "").strip()
                if not content.startswith(f"({label})") and not content.startswith(f"{label})"):
                    formatted_content = f"({label}) {content}"
                else:
                    formatted_content = content
                
                opts_formatted.append({
                    "id": str(opt["id"]),
                    "content": formatted_content,
                    "is_correct": bool(opt["is_correct"]),
                    "position": o_idx + 1
                })
                if opt["is_correct"]:
                    correct_idx = o_idx

            page_ref = f" (Página {q['source_page']})" if q.get("source_page") else ""
            q_num_ref = f" - Questão {q['source_question_number']}" if q.get("source_question_number") else ""
            explanation = f"Gabarito oficial baseado no material técnico de {q.get('subject_name', 'Soldagem')}{q_num_ref}{page_ref}."

            steps.append({
                "id": f"step-{q_id_str}",
                "lesson_id": str(lesson["id"]),
                "step_type": "activity",
                "title": f"Exercício Prático {idx + 1}{q_num_ref}",
                "content": "Resolva a questão baseada nos conceitos da aula.",
                "position": step_pos,
                "activity": {
                    "id": q_id_str,
                    "skill_id": str(lesson.get("module_id", "s_weld")),
                    "activity_type": "multiple_choice",
                    "statement": q["statement"],
                    "image_path": q["image_path"],
                    "source_page": q["source_page"],
                    "source_question_number": q["source_question_number"],
                    "explanation": explanation,
                    "options": opts_formatted,
                    "correct_index": correct_idx
                }
            })
            step_pos += 1

        # Etapa Final: Resumo & Referências Técnicas
        summary_text = lesson.get("summary") or ""
        ref_text = lesson.get("source_pages_ref") or ""
        if summary_text or ref_text:
            steps.append({
                "id": f"step-{lesson['id']}-summary",
                "lesson_id": str(lesson["id"]),
                "step_type": "summary",
                "title": "Resumo da Aula e Referências",
                "content": f"### Resumo dos Pontos-Chave\n\n{summary_text}\n\n**Referência Bibliográfica Obrigatória:**\n{ref_text}",
                "position": step_pos
            })
            step_pos += 1

        return {**lesson, "steps": steps, "questions_count": len(questions)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/lessons/{lesson_id}/complete")
def complete_lesson(lesson_id: str, current_user: dict = Depends(get_current_user)):
    """Marca uma aula como concluída para o usuário atual."""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute("SELECT id, module_id FROM lessons WHERE id::text = %s;", (lesson_id,))
        lesson = cur.fetchone()
        if not lesson:
            raise HTTPException(status_code=404, detail="Aula não encontrada.")

        cur.execute(
            """
            INSERT INTO user_lesson_progress (id, user_id, lesson_id, status, completed_at)
            VALUES (%s, %s, %s, 'completed', now())
            ON CONFLICT (user_id, lesson_id) DO UPDATE SET
                status = 'completed',
                completed_at = COALESCE(user_lesson_progress.completed_at, now());
            """,
            (str(uuid.uuid4()), current_user["id"], lesson_id),
        )
        conn.commit()
        return {"ok": True}
    except HTTPException:
        conn.rollback()
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

class PracticeAnswerRequest(BaseModel):
    selected_option_id: str

@app.post("/api/questions/{question_id}/answer")
def answer_question_practice(
    question_id: str,
    req: PracticeAnswerRequest,
    current_user: dict = Depends(get_current_user),
):
    """Responde uma questão avulsa (fora de uma prova formal), para prática livre."""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute(
            "SELECT is_correct, content FROM question_options WHERE id::text = %s AND question_id::text = %s;",
            (req.selected_option_id, question_id),
        )
        option = cur.fetchone()
        if not option:
            raise HTTPException(status_code=404, detail="Alternativa não encontrada para esta questão.")

        is_correct = bool(option["is_correct"])
        cur.execute(
            """
            INSERT INTO user_answers (id, user_id, question_id, selected_option_id, is_correct, exam_attempt_id, created_at)
            VALUES (%s, %s, %s, %s, %s, NULL, now());
            """,
            (str(uuid.uuid4()), current_user["id"], question_id, req.selected_option_id, is_correct),
        )
        conn.commit()

        cur.execute(
            "SELECT label, content FROM question_options WHERE question_id::text = %s AND is_correct = true LIMIT 1;",
            (question_id,),
        )
        correct = cur.fetchone()
        return {
            "is_correct": is_correct,
            "correct_option": correct,
        }
    except HTTPException:
        conn.rollback()
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/api/exams")
def list_exams(course_id: Optional[str] = None):
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        if course_id:
            cur.execute("SELECT * FROM exams WHERE course_id::text = %s ORDER BY created_at ASC;", (course_id,))
        else:
            cur.execute("SELECT * FROM exams ORDER BY created_at ASC;")
        exams = cur.fetchall()
        conn.close()
        return exams
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/exams/{exam_id}/attempts")
def start_exam_attempt(exam_id: str, current_user: dict = Depends(get_current_user)):
    """Inicia uma tentativa de prova e retorna as questões (sem revelar o gabarito)."""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute("SELECT * FROM exams WHERE id::text = %s;", (exam_id,))
        exam = cur.fetchone()
        if not exam:
            raise HTTPException(status_code=404, detail="Prova não encontrada.")

        attempt_id = str(uuid.uuid4())
        cur.execute(
            "INSERT INTO exam_attempts (id, exam_id, user_id, started_at, status) "
            "VALUES (%s, %s, %s, now(), 'in_progress');",
            (attempt_id, exam_id, current_user["id"]),
        )
        conn.commit()

        cur.execute(
            """
            SELECT q.id AS question_id, q.statement, q.difficulty, eq.position,
                   json_agg(json_build_object('id', o.id, 'label', o.label, 'content', o.content) ORDER BY o.label) AS options
            FROM exam_questions eq
            JOIN questions q ON q.id = eq.question_id
            JOIN question_options o ON o.question_id = q.id
            WHERE eq.exam_id::text = %s
            GROUP BY q.id, q.statement, q.difficulty, eq.position
            ORDER BY eq.position ASC;
            """,
            (exam_id,),
        )
        questions = cur.fetchall()
        conn.close()
        return {"attempt_id": attempt_id, "exam": exam, "questions": questions}
    except HTTPException:
        conn.rollback()
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

class ExamAnswerRequest(BaseModel):
    question_id: str
    selected_option_id: str

@app.post("/api/exam-attempts/{attempt_id}/answers")
def answer_exam_question(
    attempt_id: str,
    req: ExamAnswerRequest,
    current_user: dict = Depends(get_current_user),
):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute(
            "SELECT id FROM exam_attempts WHERE id::text = %s AND user_id::text = %s AND status = 'in_progress';",
            (attempt_id, current_user["id"]),
        )
        if not cur.fetchone():
            raise HTTPException(status_code=404, detail="Tentativa de prova não encontrada ou já finalizada.")

        cur.execute(
            "SELECT is_correct FROM question_options WHERE id::text = %s AND question_id::text = %s;",
            (req.selected_option_id, req.question_id),
        )
        option = cur.fetchone()
        if not option:
            raise HTTPException(status_code=404, detail="Alternativa não encontrada.")

        is_correct = bool(option["is_correct"])
        cur.execute(
            """
            INSERT INTO user_answers (id, user_id, question_id, selected_option_id, is_correct, exam_attempt_id, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, now());
            """,
            (str(uuid.uuid4()), current_user["id"], req.question_id, req.selected_option_id, is_correct, attempt_id),
        )
        conn.commit()
        return {"is_correct": is_correct}
    except HTTPException:
        conn.rollback()
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.post("/api/exam-attempts/{attempt_id}/finish")
def finish_exam_attempt(attempt_id: str, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute(
            "SELECT id FROM exam_attempts WHERE id::text = %s AND user_id::text = %s;",
            (attempt_id, current_user["id"]),
        )
        if not cur.fetchone():
            raise HTTPException(status_code=404, detail="Tentativa de prova não encontrada.")

        cur.execute(
            "SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE is_correct) AS correct "
            "FROM user_answers WHERE exam_attempt_id::text = %s;",
            (attempt_id,),
        )
        row = cur.fetchone()
        score = round((row["correct"] / row["total"]) * 100, 2) if row["total"] else 0.0

        cur.execute(
            "UPDATE exam_attempts SET status = 'completed', finished_at = now(), score = %s WHERE id::text = %s;",
            (score, attempt_id),
        )
        conn.commit()
        return {"score": score, "correct": row["correct"], "total": row["total"]}
    except HTTPException:
        conn.rollback()
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/api/progress/courses")
def get_progress_courses(current_user: dict = Depends(get_current_user)):
    """Progresso do usuário em cada curso, calculado a partir das aulas concluídas."""
    try:
        user_id = current_user["id"]
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM courses;")
        courses = cur.fetchall()

        result = []
        for c in courses:
            course_id = str(c["id"])
            cur.execute(
                "SELECT COUNT(*) AS n FROM lessons l JOIN modules m ON m.id = l.module_id WHERE m.course_id::text = %s;",
                (course_id,),
            )
            total_lessons = cur.fetchone()["n"]
            cur.execute(
                """
                SELECT COUNT(*) AS n FROM user_lesson_progress ulp
                JOIN lessons l ON l.id = ulp.lesson_id JOIN modules m ON m.id = l.module_id
                WHERE ulp.user_id::text = %s AND m.course_id::text = %s AND ulp.status = 'completed';
                """,
                (user_id, course_id),
            )
            completed_lessons = cur.fetchone()["n"]
            pct = round((completed_lessons / total_lessons) * 100, 2) if total_lessons else 0.0
            result.append({**c, "progress_percentage": pct})
        conn.close()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/progress/summary")
def get_progress_summary(current_user: dict = Depends(get_current_user)):
    """Estatísticas para a tela de perfil: aulas, módulos e histórico de provas/respostas."""
    try:
        user_id = current_user["id"]
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute(
            "SELECT lesson_id, status, completed_at FROM user_lesson_progress WHERE user_id::text = %s;",
            (user_id,),
        )
        lesson_progress = cur.fetchall()

        cur.execute(
            "SELECT module_id, status, completed_at FROM user_module_progress WHERE user_id::text = %s;",
            (user_id,),
        )
        module_progress = cur.fetchall()

        cur.execute(
            """
            SELECT ea.id, ea.score, ea.status, ea.started_at, ea.finished_at, e.title AS exam_title
            FROM exam_attempts ea JOIN exams e ON e.id = ea.exam_id
            WHERE ea.user_id::text = %s ORDER BY ea.started_at DESC LIMIT 20;
            """,
            (user_id,),
        )
        exam_attempts = cur.fetchall()

        cur.execute(
            "SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE is_correct) AS correct "
            "FROM user_answers WHERE user_id::text = %s;",
            (user_id,),
        )
        answers_summary = cur.fetchone()
        conn.close()

        return {
            "lesson_progress": lesson_progress,
            "module_progress": module_progress,
            "exam_attempts": exam_attempts,
            "answers_summary": answers_summary,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# ENDPOINTS DE IA, TUTORIA E RAG (PGVECTOR)
# ============================================================================

class QueryRequest(BaseModel):
    topic: str
    limit: int = 3

@app.post("/generate-question")
def generate_question(req: QueryRequest):
    """Gera uma questão contextualizada buscando conteúdo no banco solda_inspecao via pgvector."""
    matches = search_knowledge_chunks(req.topic, req.limit)
        
    if not matches:
        return {"question": f"Não encontrei informações suficientes no banco solda_inspecao sobre '{req.topic}' para compor uma pergunta."}
        
    best_match = matches[0]
    content = best_match['content']
    source = best_match.get('book_title') or "Material Técnico de Soldagem"
    page = best_match.get('page_number', 1)
    
    generated_question = (
        f"Com base na literatura técnica de Engenharia de Soldagem ({source}, página {page}), "
        f"destaca-se o seguinte conceito: '{content[:200]}...'\n\n"
        f"Como você aplicaria este critério na prática de inspeção de soldas?"
    )
    
    return {
        "topic": req.topic,
        "source": source,
        "page": page,
        "context": content,
        "generated_question": generated_question
    }

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

@app.post("/chat")
def chat(req: ChatRequest):
    OLLAMA_URL = "http://localhost:11434/api/chat"
    SYSTEM_PROMPT = (
        "Você é um tutor da plataforma Axion de engenharia e inspeção de soldagem. "
        "Você deve responder perguntas sempre baseadas nos materiais de estudos de soldagem e ensaios não destrutivos. "
        "Mantenha um tom socrático para ensinar. Responda de forma curta e direta."
    )
    
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for m in req.messages:
        messages.append({"role": m.role, "content": m.content})
        
    payload = {
        "model": "granite4.2:3b",
        "messages": messages,
        "stream": False,
        "options": {
            "num_predict": 120,
            "temperature": 0.5,
            "top_k": 20,
            "num_ctx": 1024
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=15)
        response.raise_for_status()
        data = response.json()
        return {"response": data["message"]["content"]}
    except Exception as e:
        # Fallback gracioso se Ollama local não estiver ativo
        last_user_msg = req.messages[-1].content if req.messages else ""
        return {
            "response": f"Como tutor de soldagem, sugiro analisar os parâmetros de arco e requisitos da norma aplicável (ex: ASME IX / AWS D1.1) em relação a '{last_user_msg}'."
        }

class ChatContextRequest(BaseModel):
    messages: List[ChatMessage]
    lesson_context: str

@app.post("/chat/contextual")
def chat_contextual(req: ChatContextRequest):
    OLLAMA_URL = "http://localhost:11434/api/chat"
    SYSTEM_PROMPT = (
        f"Você é um tutor da plataforma Axion de engenharia de soldagem. "
        f"O aluno está resolvendo o seguinte tópico: '{req.lesson_context}'. "
        f"Ajude-o socraticamente, sem dar a resposta direta, e foque nesse contexto técnico."
    )
    
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for m in req.messages:
        messages.append({"role": m.role, "content": m.content})
        
    payload = {
        "model": "granite4.2:3b",
        "messages": messages,
        "stream": False,
        "options": {
            "num_predict": 120,
            "temperature": 0.5,
            "top_k": 20,
            "num_ctx": 1024
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=15)
        response.raise_for_status()
        data = response.json()
        return {"response": data["message"]["content"]}
    except Exception as e:
        return {
            "response": f"Pense em como as variáveis essenciais de soldagem impactam o processo em '{req.lesson_context}'. Qual seria o primeiro passo de inspeção?"
        }

class TutorExplainRequest(BaseModel):
    question_text: str
    options: List[str] = []
    selected_option: str
    correct_option: str
    is_correct: bool
    subject: Optional[str] = "Inspeção de Soldagem"
    lesson_title: Optional[str] = ""
    image_path: Optional[str] = None

@app.post("/api/tutor/explain")
def tutor_explain(req: TutorExplainRequest):
    """
    Explica a resposta de forma pedagógica para o aluno de Inspeção de Soldagem N1.
    Garante 100% de resposta em português do Brasil e fallback instantâneo seguro.
    """
    matches = search_knowledge_chunks(f"{req.subject} {req.question_text}", limit=1)
    context = matches[0]['content'] if matches else ""

    image_context = ""
    if req.image_path:
        image_context = (
            f"\nNota visual: Esta questão contém uma figura técnica ({req.image_path}). "
            f"Faça referência ao elemento visual pertinente (ex.: detalhes de chanfro, abertura da raiz, "
            f"perfil do cordão ou descontinuidade ilustrada), sem inventar características não visíveis."
        )

    system_prompt = (
        "Você é um professor particular experiente e didático de Inspeção de Soldagem N1 da plataforma Axion. "
        "Sua missão é ensinar o aluno a compreender a fundo os conceitos normativos, metalúrgicos e de ensaios. "
        "REGRA ABSOLUTA: Toda a sua resposta DEVE ser em português do Brasil (pt-BR). "
        "Nunca responda em inglês ou espanhol. Explique com clareza, em linguagem acessível para quem está aprendendo, "
        "mantendo o rigor técnico da área de soldagem. Evite jargões soltos sem explicação."
    )

    options_formatted = "\n".join([f"- {opt}" for opt in req.options]) if req.options else ""

    if req.is_correct:
        user_prompt = f"""O aluno ACERTOU a seguinte questão de Inspeção de Soldagem.
Assunto: {req.subject}
Aula: {req.lesson_title}
Enunciado: {req.question_text}
Alternativas disponíveis:
{options_formatted}
Alternativa correta escolhida: {req.correct_option}
{image_context}
Conteúdo técnico de apoio: {context[:500]}

Forneça um feedback pedagógico estruturado de 3 a 6 frases, semelhante ao padrão:
"Correto! A alternativa {req.correct_option} é a resposta certa porque [explicação técnica clara do motivo]. Esse conceito é importante na prática da soldagem e inspeção porque [aplicação prática/segurança/qualidade]."
"""
    else:
        user_prompt = f"""O aluno ERROU a seguinte questão de Inspeção de Soldagem.
Assunto: {req.subject}
Aula: {req.lesson_title}
Enunciado: {req.question_text}
Alternativas disponíveis:
{options_formatted}
Alternativa que o aluno escolheu (INCORRETA): {req.selected_option}
Alternativa Correta (GABARITO OFICIAL): {req.correct_option}
{image_context}
Conteúdo técnico de apoio: {context[:500]}

Forneça um feedback pedagógico estruturado de 4 a 8 frases, explicando didaticamente o erro e o acerto, semelhante ao padrão:
"Essa alternativa não é a correta.
A resposta correta é a alternativa {req.correct_option}.
O motivo é [explicação clara de por que ela está certa].
A alternativa que você escolheu está incorreta porque [explicação clara do erro].
Para lembrar disso, pense em [regra prática simples ou dica de memorização]."
NÃO use respostas vagas como 'Revise o conteúdo' ou 'Boa tentativa'.
"""

    OLLAMA_URL = "http://localhost:11434/api/chat"
    payload = {
        "model": "granite4.2:3b",
        "think": False,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "stream": False,
        "options": {
            "num_predict": 380,
            "temperature": 0.2,
            "top_k": 20
        }
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=8)
        response.raise_for_status()
        data = response.json()
        ai_content = (data.get("message", {}).get("content") or "").strip()
        if ai_content and len(ai_content) > 30:
            return {"ok": True, "explanation": ai_content, "source": "ai"}
    except Exception as e:
        logger.warning(f"Ollama tutor explanation failed or timed out: {e}")

    # Fallback pedagógico imediato e de alta qualidade técnica em português
    if req.is_correct:
        fallback_exp = (
            f"Correto! A resposta '{req.correct_option}' é a correta porque atende rigorosamente "
            f"aos critérios técnicos e procedimentos de {req.subject}.\n\n"
            f"Esse conceito é fundamental na rotina do Inspetor de Soldagem N1 para assegurar que a execução "
            f"e o controle de qualidade estejam em plena conformidade com as normas aplicáveis."
        )
    else:
        fallback_exp = (
            f"Essa alternativa não é a correta.\n\n"
            f"A resposta correta é: {req.correct_option}.\n\n"
            f"O motivo é que esta alternativa expressa com precisão os parâmetros e definições técnicas de {req.subject}.\n\n"
            f"A alternativa que você escolheu ({req.selected_option}) está incorreta porque não reflete os critérios do processo sob análise.\n\n"
            f"Para lembrar disso, relacione sempre o princípio operacional do método aos requisitos de qualidade da junta soldada."
        )

    return {"ok": True, "explanation": fallback_exp, "source": "fallback"}


class TutorHintRequest(BaseModel):
    question_text: str
    options: List[str] = []
    subject: Optional[str] = "Inspeção de Soldagem"
    lesson_title: Optional[str] = ""
    image_path: Optional[str] = None
    hints_used: Optional[int] = 1

@app.post("/api/tutor/hint")
def tutor_hint(req: TutorHintRequest):
    """
    Gera uma dica socrática contextualizada para a questão atual, sem revelar o gabarito.
    """
    matches = search_knowledge_chunks(f"{req.subject} {req.question_text}", limit=1)
    context = matches[0]['content'] if matches else ""

    image_context = ""
    if req.image_path:
        image_context = (
            f"\nNota visual: Esta questão contém uma figura técnica ({req.image_path}). "
            f"Oriente o aluno a observar atentamente os detalhes geométricos ou visuais da imagem."
        )

    system_prompt = (
        "Você é um tutor socrático de Inspeção de Soldagem N1 da plataforma Axion. "
        "O aluno solicitou uma dica para resolver uma questão. "
        "REGRA CRÍTICA INEGOCIÁVEL: Ajude o aluno a raciocinar por conta própria. "
        "NUNCA revele qual alternativa é a correta, NUNCA cite a letra da resposta certa e "
        "NUNCA diga a resposta diretamente. Responda ESTRITAMENTE em português do Brasil (pt-BR) "
        "em 2 a 4 frases curtas e objetivas."
    )

    options_formatted = "\n".join([f"- {opt}" for opt in req.options]) if req.options else ""

    user_prompt = f"""Questão de estudo:
Assunto: {req.subject}
Aula: {req.lesson_title}
Enunciado: {req.question_text}
Alternativas:
{options_formatted}
{image_context}
Contexto técnico da matéria: {context[:400]}

Nível da dica solicitada: {req.hints_used}.
Forneça uma pista que estimule o raciocínio do aluno sobre as variáveis essenciais ou o princípio físico do tema, SEM dizer ou indicar a resposta."""

    OLLAMA_URL = "http://localhost:11434/api/chat"
    payload = {
        "model": "granite4.2:3b",
        "think": False,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "stream": False,
        "options": {
            "num_predict": 200,
            "temperature": 0.3,
            "top_k": 20
        }
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=7)
        response.raise_for_status()
        data = response.json()
        ai_hint = (data.get("message", {}).get("content") or "").strip()
        if ai_hint and len(ai_hint) > 20:
            return {"ok": True, "hint": ai_hint, "source": "ai"}
    except Exception as e:
        logger.warning(f"Ollama tutor hint failed or timed out: {e}")

    # Fallback contextualizado inteligente em português
    fallback_hint = (
        f"Pense no princípio fundamental de {req.subject}: observe atentamente como o processo atua "
        f"na poça de fusão ou quais parâmetros controlam essa variável técnica. Relacione isso com o que o enunciado pede."
    )
    return {"ok": True, "hint": fallback_hint, "source": "fallback"}

class ErrorExplanationRequest(BaseModel):
    question_text: str
    incorrect_answer: str
    correct_answer: str

@app.post("/chat/explain-error")
def explain_error(req: ErrorExplanationRequest):
    """Gera explicação técnica para o erro do aluno buscando embasamento no banco PostgreSQL solda_inspecao."""
    matches = search_knowledge_chunks(req.question_text, limit=1)
    context = matches[0]['content'] if matches else ""
            
    OLLAMA_URL = "http://localhost:11434/api/chat"
    system_prompt = (
        "Você é um professor particular experiente e didático de Inspeção de Soldagem N1 da plataforma Axion. "
        "Toda a sua resposta DEVE ser em português do Brasil (pt-BR). Nunca responda em inglês ou espanhol. "
        "Explique o erro do aluno de forma clara, didática e encorajadora em 2 parágrafos curtos."
    )
    user_prompt = f"""O aluno errou uma questão de Soldagem e Inspeção.
Questão: {req.question_text}
Resposta do aluno (Incorreta): {req.incorrect_answer}
Resposta Correta (Gabarito Oficial): {req.correct_answer}
Contexto técnico: {context[:500]}

Explique didaticamente por que a resposta que ele escolheu está incorreta e por que a correta é a certa.
Dê uma dica para ele memorizar o conceito."""

    payload = {
        "model": "granite4.2:3b",
        "think": False,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "stream": False,
        "options": {
            "num_predict": 350,
            "temperature": 0.2,
            "top_k": 20
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=8)
        response.raise_for_status()
        data = response.json()
        content = (data.get("message", {}).get("content") or "").strip()
        if content:
            return {"response": content}
    except Exception as e:
        logger.warning(f"Ollama explain-error failed: {e}")
        
    return {
        "response": (
            f"A alternativa correta é '{req.correct_answer}' porque atende rigorosamente aos critérios técnicos estabelecidos pelas normas de qualificação e inspeção de soldagem.\n\n"
            f"A opção escolhida ('{req.incorrect_answer}') não se aplica a este caso específico ou contraria os princípios operacionais do processo."
        )
    }

@app.get("/ai-summary/progress")
def ai_summary_progress():
    OLLAMA_URL = "http://localhost:11434/api/generate"
    prompt = "Gere uma breve mensagem (máximo de 2 frases) como um Mentor de Engenharia de Soldagem motivando o aluno. Ele estudou 'Inspeção e Qualidade de Soldagem'. Seja encorajador e sugira que ele continue a jornada."
    
    payload = {
        "model": "granite4.2:3b",
        "prompt": prompt,
        "stream": False,
        "options": {
            "num_predict": 80
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=10)
        response.raise_for_status()
        data = response.json()
        return {"summary": data["response"]}
    except Exception as e:
        return {"summary": "Excelente progresso em Inspeção de Soldagem! Continue praticando os ensaios e a interpretação de normas para consolidar sua certificação."}

class LabAssistantRequest(BaseModel):
    logs: str
    current_variables: Dict[str, float]

@app.post("/chat/lab-assistant")
def chat_lab_assistant(req: LabAssistantRequest):
    OLLAMA_URL = "http://localhost:11434/api/chat"
    SYSTEM_PROMPT = (
        "Você é um tutor assistente de um laboratório virtual de física e soldagem. "
        "O aluno está com dificuldades e clicou em 'Estou travado'. "
        "Baseado nos logs e variáveis atuais, dê uma dica socrática para ele pensar no que está errado, sem dar a resposta direta."
    )
    
    user_message = f"Variáveis atuais: {req.current_variables}\nLogs: {req.logs}"
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_message}
    ]
        
    payload = {
        "model": "granite4.2:3b",
        "messages": messages,
        "stream": False,
        "options": {
            "num_predict": 100,
            "temperature": 0.5
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=10)
        response.raise_for_status()
        data = response.json()
        return {"response": data["message"]["content"]}
    except Exception as e:
        return {"response": "Observe como os parâmetros atuais estão afetando o equilíbrio do sistema. Tente ajustar gradualmente uma variável por vez."}

class TrackGenerateRequest(BaseModel):
    topic: str

@app.post("/generate-track")
def generate_track(req: TrackGenerateRequest):
    matches = search_knowledge_chunks(req.topic, limit=2)
    context_str = " ".join([m['content'] for m in matches])
    
    OLLAMA_URL = "http://localhost:11434/api/chat"
    SYSTEM_PROMPT = (
        "Você é um especialista em engenharia de soldagem. O aluno quer aprender ou revisar o seguinte tópico: "
        f"'{req.topic}'. O material técnico de referência disponível é: '{context_str[:500]}'.\n"
        "Gere exatamente 3 subtópicos curtos em formato JSON, onde cada item tem um 'title' e um 'description'. "
        "Exemplo: [{\"title\": \"...\", \"description\": \"...\"}]"
    )
    
    payload = {
        "model": "granite4.2:3b",
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}],
        "stream": False,
        "format": "json",
        "options": {
            "num_predict": 150,
            "temperature": 0.3
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=15)
        response.raise_for_status()
        data = response.json()
        topics = json.loads(data["message"]["content"])
        return {"track": topics}
    except Exception as e:
        # Fallback estruturado baseado no tópico
        return {
            "track": [
                {"title": f"Fundamentos de {req.topic}", "description": "Conceitos essenciais e terminologia técnica aplicada."},
                {"title": f"Parâmetros e Variáveis em {req.topic}", "description": "Controle operacional, variáveis essenciais e normas."},
                {"title": f"Critérios de Inspeção de {req.topic}", "description": "Avaliação de descontinuidades e laudos técnicos."}
            ]
        }

class JournalSummaryRequest(BaseModel):
    notes: List[str]

@app.post("/ai-summary/journal")
def ai_summary_journal(req: JournalSummaryRequest):
    OLLAMA_URL = "http://localhost:11434/api/chat"
    
    notes_text = "\n".join([f"- {note}" for note in req.notes])
    SYSTEM_PROMPT = (
        "Você é um assistente de IA para engenharia. Analise as seguintes anotações do diário de estudos do aluno e gere 3 flashcards resumidos ou pontos-chave conceituais. "
        "Retorne em formato de lista Markdown.\n\nAnotações:\n" + notes_text
    )
    
    payload = {
        "model": "granite4.2:3b",
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}],
        "stream": False,
        "options": {
            "num_predict": 150,
            "temperature": 0.4
        }
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=12)
        response.raise_for_status()
        data = response.json()
        return {"summary": data["message"]["content"]}
    except Exception as e:
        return {
            "summary": "### Pontos-Chave dos Estudos:\n- **Revisão de conceitos principais:** Continue revisando os parâmetros anotados.\n- **Aplicação prática:** Relacione os pontos com os exercícios de fixação de solda.\n- **Próximos passos:** Aprofunde-se nos critérios de aceitação de normas técnicas."
        }


import ollama_service

class HintRequest(BaseModel):
    question_id: str

class TeacherRequest(BaseModel):
    question_id: str
    selected_option_id: str
    user_message: Optional[str] = None

@app.post("/api/lesson/hint")
def generate_hint(req: HintRequest):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB Connection failed")
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT q.statement
                FROM questions q
                WHERE q.id = %s
            """, (req.question_id,))
            qdata = cur.fetchone()
            if not qdata:
                return {"hint": "Revise o conceito apresentado nesta etapa da aula antes de responder novamente.", "source": "fallback"}
            
            cur.execute("SELECT id, content as text FROM question_options WHERE question_id = %s", (req.question_id,))
            options = cur.fetchall()
            
            chunks = search_knowledge_chunks(qdata['statement'], limit=2)
            context = "\\n".join([c['content'] for c in chunks]) if chunks else ''
            
            hint = ollama_service.generate_hint_response(context, qdata['statement'], options)
            source = "ollama" if "Releia a seção" not in hint else "fallback"
            return {"hint": hint, "source": source}
    finally:
        conn.close()

@app.post("/api/lesson/teacher")
def explain_teacher(req: TeacherRequest):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB Connection failed")
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT q.statement
                FROM questions q
                WHERE q.id = %s
            """, (req.question_id,))
            qdata = cur.fetchone()
            if not qdata:
                return {"explanation": "Não tenho informação suficiente no material desta aula para explicar isso com segurança.", "source": "fallback"}
            
            cur.execute("SELECT id, content as text, is_correct FROM question_options WHERE question_id = %s", (req.question_id,))
            options = cur.fetchall()
            
            selected_option = next((o for o in options if str(o['id']) == str(req.selected_option_id)), None)
            correct_option = next((o for o in options if o['is_correct']), None)
            
            if not selected_option or not correct_option:
                return {"explanation": "Erro ao identificar as alternativas da questão.", "source": "fallback"}

            chunks = search_knowledge_chunks(qdata['statement'], limit=2)
            context = "\\n".join([c['content'] for c in chunks]) if chunks else ''

            explanation = ollama_service.generate_teacher_response(
                context, 
                qdata['statement'], 
                options, 
                selected_option, 
                correct_option,
                req.user_message,
                req.question_id
            )
            source = "ollama" if "indisponível" not in explanation else "fallback"
            return {"explanation": explanation, "source": source}
    finally:
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
