import os
import re
import fitz
import json
import uuid
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/solda_inspecao"
)

def ingest_pdf_questions(pdf_path, max_questions=20):
    if not os.path.exists(pdf_path):
        print(f"Arquivo PDF não encontrado: {pdf_path}")
        return

    doc = fitz.open(pdf_path)
    full_text = ""
    for i in range(min(30, len(doc))):  # Processar primeiras 30 páginas
        full_text += doc[i].get_text() + "\n"

    full_text = full_text.replace('\ufffd', ' ').replace('\u2013', '-').replace('\u2014', '-')
    
    questions_found = []
    chunks = re.split(r'RESPOSTA:\s*([A-Ea-e])', full_text)
    
    if len(chunks) < 3:
        print("Nenhuma questão encontrada com o padrão RESPOSTA:")
        return
        
    for i in range(0, len(chunks)-1, 2):
        chunk_text = chunks[i]
        correct_letter = chunks[i+1].upper().strip()
        
        match = re.search(r'(\d+)\s*?[-]?\s*(.*?)(?=\(a\))', chunk_text, re.DOTALL | re.IGNORECASE)
        if not match:
            continue
            
        q_num = match.group(1)
        q_prompt = match.group(2).replace('\n', ' ').strip()
        
        options_text = chunk_text[match.end():]
        opt_matches = list(re.finditer(r'\(([a-e])\)\s*(.*?)(?=\([a-e]\)|$)', options_text, re.DOTALL | re.IGNORECASE))
        
        options = []
        for o in opt_matches:
            opt_letter = o.group(1).upper()
            opt_content = o.group(2).replace('\n', ' ').strip()
            options.append({'letter': opt_letter, 'text': opt_content})
            
        if len(options) >= 2:
            questions_found.append({
                'prompt': q_prompt,
                'options': options,
                'correct_letter': correct_letter
            })
            
        if len(questions_found) >= max_questions:
            break

    print(f"Extraídas {len(questions_found)} questões do PDF. Conectando ao PostgreSQL...")
    
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    # Obter ou criar um subject padrão para o caderno de exercícios
    cursor.execute("SELECT id FROM subjects WHERE slug = 'caderno-de-exercicios-n1' LIMIT 1;")
    sub_row = cursor.fetchone()
    if sub_row:
        subject_id = sub_row[0]
    else:
        subject_id = str(uuid.uuid4())
        cursor.execute("""
            INSERT INTO subjects (id, name, slug)
            VALUES (%s, %s, %s)
            ON CONFLICT (id) DO NOTHING;
        """, (subject_id, "Caderno de Exercícios N1", "caderno-de-exercicios-n1"))

    inserted_count = 0
    for q in questions_found:
        q_id = str(uuid.uuid4())
        cursor.execute('''
            INSERT INTO questions (id, subject_id, statement, difficulty)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING;
        ''', (q_id, subject_id, q['prompt'], "Médio"))
        
        for opt in q['options']:
            opt_id = str(uuid.uuid4())
            is_corr = (opt['letter'] == q['correct_letter'])
            cursor.execute('''
                INSERT INTO question_options (id, question_id, label, content, is_correct)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING;
            ''', (opt_id, q_id, opt['letter'], opt['text'], is_corr))
            
        inserted_count += 1
    
    conn.commit()
    conn.close()
    print(f"Sucesso! {inserted_count} questões inseridas no banco PostgreSQL solda_inspecao.")

if __name__ == "__main__":
    pdf_path = r"C:\Users\Veronica\Desktop\Axion\Soldagem\668910950-Caderno-de-exerci-cios-N1.pdf"
    if not os.path.exists(pdf_path):
        pdf_path = r"C:\Users\Veronica\Desktop\Axion\arquivos\668910950-Caderno-de-exerci-cios-N1.pdf"
    ingest_pdf_questions(pdf_path, max_questions=20)
