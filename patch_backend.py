api_additions = """
class HintRequest(BaseModel):
    question_id: str

class TeacherRequest(BaseModel):
    question_id: str
    selected_option: str

@app.post("/api/lesson/hint")
def generate_hint(req: HintRequest):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB Connection failed")
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(\"\"\"
                SELECT q.statement, q.explanation
                FROM questions q
                WHERE q.id = %s
            \"\"\", (req.question_id,))
            qdata = cur.fetchone()
            if not qdata:
                return {"hint": "Revise o conceito apresentado nesta etapa da aula antes de responder novamente.", "source": "fallback"}
            
            # Simple prompt for Ollama
            OLLAMA_URL = "http://localhost:11434/api/chat"
            system_prompt = "Você é um professor de Inspeção de Soldagem. Dê uma dica didática e curta (1-2 frases) que faça o aluno pensar, SEM revelar qual é a alternativa correta."
            user_prompt = f"Questão: {qdata['statement']}\\nExplicação da questão: {qdata['explanation']}\\nGere uma dica curta que não entregue a resposta."
            
            payload = {
                "model": "granite4.2:3b",
                "think": False,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                "stream": False,
                "options": {"num_predict": 100, "temperature": 0.3}
            }
            
            try:
                resp = requests.post(OLLAMA_URL, json=payload, timeout=8)
                if resp.status_code == 200:
                    data = resp.json()
                    content = (data.get("message", {}).get("content") or "").strip()
                    if content:
                        return {"hint": content, "source": "ollama"}
            except Exception:
                pass
            
            return {"hint": "Pense sobre o conceito de funcionamento e proteção abordado na explicação.", "source": "fallback"}
    finally:
        conn.close()

@app.post("/api/lesson/teacher")
def explain_teacher(req: TeacherRequest):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB Connection failed")
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(\"\"\"
                SELECT q.statement, q.explanation, 
                       qo_sel.content as selected_text, qo_sel.is_correct as selected_is_correct
                FROM questions q
                LEFT JOIN question_options qo_sel ON qo_sel.question_id = q.id AND qo_sel.id = %s
                WHERE q.id = %s
            \"\"\", (req.selected_option, req.question_id))
            qdata = cur.fetchone()
            if not qdata:
                return {"explanation": "Não tenho informação suficiente no material desta aula para explicar isso com segurança.", "source": "fallback"}
            
            # Identify correct answer text for context
            cur.execute(\"\"\"
                SELECT content FROM question_options WHERE question_id = %s AND is_correct = TRUE LIMIT 1
            \"\"\", (req.question_id,))
            correct_opt = cur.fetchone()
            correct_text = correct_opt['content'] if correct_opt else "Não disponível"
            
            OLLAMA_URL = "http://localhost:11434/api/chat"
            system_prompt = (
                "Você é o Professor da Axion Academy. Responda SEMPRE em português brasileiro (pt-BR). "
                "O aluno respondeu a uma questão. Explique de forma pedagógica, contextualizada e curta o porquê de ele ter errado ou acertado. "
                "SE ele errou, NÃO revele qual é a alternativa correta. Ensine o conceito para que ele tente novamente."
            )
            
            status = "ACERTOU" if qdata['selected_is_correct'] else "ERROU"
            user_prompt = f"Questão: {qdata['statement']}\\nExplicação da questão: {qdata['explanation']}\\nO aluno {status} a questão ao escolher a seguinte alternativa: {qdata['selected_text']}. A resposta correta oficial era: {correct_text}\\nComo Professor, dê o feedback adequando-se ao acerto ou erro."
            
            payload = {
                "model": "granite4.2:3b",
                "think": False,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                "stream": False,
                "options": {"num_predict": 300, "temperature": 0.4}
            }
            
            try:
                resp = requests.post(OLLAMA_URL, json=payload, timeout=12)
                if resp.status_code == 200:
                    data = resp.json()
                    content = (data.get("message", {}).get("content") or "").strip()
                    if content:
                        return {"explanation": content, "source": "ollama"}
            except Exception:
                pass
            
            return {"explanation": "Esta é a área que você deve revisar com base no conteúdo abordado. Consulte novamente as informações desta etapa para entender por que sua escolha foi processada desta maneira.", "source": "fallback"}
    finally:
        conn.close()
"""

with open(r'C:\Users\Veronica\Desktop\Axion\backend_api.py', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('if __name__ == "__main__":', api_additions + '\\n\\nif __name__ == "__main__":')

with open(r'C:\Users\Veronica\Desktop\Axion\backend_api.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Backend endpoints added.")
