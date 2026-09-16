import requests
import json
from typing import Optional, Dict

OLLAMA_URL = "http://localhost:11434/api/chat"
OLLAMA_MODEL = "granite4.2:3b"

# Simple in-memory session store (question_id -> list of messages)
chat_memory: Dict[str, list] = {}

def check_ollama_health() -> bool:
    try:
        res = requests.get("http://localhost:11434/api/tags", timeout=3)
        return res.status_code == 200
    except requests.RequestException:
        return False

def generate_teacher_response(context: str, question: str, options: list, selected_option: dict, correct_option: dict, user_message: Optional[str] = None, question_id: str = "") -> str:
    if not check_ollama_health():
        return "Professor indisponível no momento."

    is_correct = selected_option.get("id") == correct_option.get("id")
    
    if question_id not in chat_memory or not user_message:
        prompt = f"""Você é um Professor e instrutor especialista de Inspeção de Soldagem.
Perfil: paciente, claro, didático, profissional e objetivo. Explicar para alguém que está aprendendo, sem ser arrogante.
Idioma: Português do Brasil.
REGRA PRINCIPAL: Utilize PRIMEIRO o conteúdo fornecido. Não invente informações. Se o contexto fornecido não for suficiente, diga exatamente: 'Não encontrei informação suficiente no material desta aula para responder com segurança.'
NUNCA entregue a resposta imediatamente se o aluno errar.

CONTEXTO DA AULA:
{context}

QUESTÃO:
{question}

ALTERNATIVAS:
{chr(10).join(f"- {opt['text']}" for opt in options)}

A alternativa correta é: {correct_option['text']}
A alternativa selecionada pelo aluno foi: {selected_option['text']}

"""
        if is_correct:
            prompt += "O aluno ACERTOU. Explique brevemente (em 2 a 4 parágrafos curtos) por que a alternativa está correta, focando no conceito principal e na aplicação prática na inspeção."
        else:
            prompt += """O aluno ERROU. Explique:
1. Por que a alternativa escolhida não está correta;
2. Qual conceito foi confundido;
3. Qual conceito deveria ser observado;
4. Dê um exemplo simples;
5. Termine com uma pergunta curta para fazer o aluno pensar.
NÃO DÊ A RESPOSTA CORRETA EXPLICITAMENTE."""

        messages = [
            {"role": "system", "content": "Você é um professor de soldagem."},
            {"role": "user", "content": prompt}
        ]
        chat_memory[question_id] = messages
    else:
        # Append to existing memory
        messages = chat_memory[question_id]
        messages.append({"role": "user", "content": user_message})

    payload = {
        "model": OLLAMA_MODEL,
        "messages": messages,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=25)
        response.raise_for_status()
        data = response.json()
        content = data["message"]["content"].strip()
        
        # Save assistant reply to memory
        chat_memory[question_id].append({"role": "assistant", "content": content})
        
        return content
    except Exception as e:
        print(f"Error calling Ollama: {e}")
        return "Professor indisponível no momento."

def generate_hint_response(context: str, question: str, options: list) -> str:
    if not check_ollama_health():
        return "Releia a seção correspondente no material de estudo. Preste atenção aos detalhes que diferenciam as alternativas."

    prompt = f"""Você é um professor didático ajudando um aluno de soldagem.
Produza uma dica curta para ajudar o aluno a raciocinar sobre a questão abaixo.
NÃO diga a alternativa correta.
NÃO mencione explicitamente a letra correta.
NÃO entregue a resposta.
Faça o aluno lembrar do conceito necessário. A dica deve ter aproximadamente 1 a 3 frases curtas.

CONTEXTO:
{context}

QUESTÃO:
{question}

ALTERNATIVAS:
{chr(10).join(f"- {opt['text']}" for opt in options)}
"""

    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "system", "content": "Você é um assistente pedagógico de soldagem que dá pequenas dicas."},
            {"role": "user", "content": prompt}
        ],
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=15)
        response.raise_for_status()
        data = response.json()
        return data["message"]["content"].strip()
    except Exception as e:
        print(f"Error calling Ollama: {e}")
        return "Releia a seção correspondente no material de estudo. Preste atenção aos detalhes que diferenciam as alternativas."
