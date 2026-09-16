import os
import psycopg2
import uuid
import numpy as np
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/solda_inspecao"
)

def ingest_knowledge():
    print("Conectando ao PostgreSQL solda_inspecao...")
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    print("Carregando modelo de embeddings (all-MiniLM-L6-v2)...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    # Caminho do Markdown
    md_path = r"C:\Users\Veronica\Desktop\Axion\Soldagem\base_conhecimento_ia.md"
    if not os.path.exists(md_path):
        md_path = r"C:\Users\Veronica\Desktop\Axion\base_conhecimento_ia.md"
        
    print(f"Lendo material: {md_path}...")
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Quebrar texto em chunks
    lines = content.split('\n')
    chunks = []
    current_chunk = ""
    for line in lines:
        line = line.strip()
        if not line:
            continue
        current_chunk += line + " "
        if len(current_chunk) > 600:
            chunks.append(current_chunk.strip())
            current_chunk = ""
    if current_chunk:
        chunks.append(current_chunk.strip())
        
    print(f"Gerados {len(chunks)} chunks de texto. Gerando embeddings e inserindo no PostgreSQL...")

    # Registrar documento fonte se não existir
    doc_id = str(uuid.uuid4())
    cursor.execute("""
        INSERT INTO source_documents (id, filename, doc_type, status)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (id) DO NOTHING;
    """, (doc_id, "base_conhecimento_ia.md", "apostila", "concluido"))

    inserted = 0
    for idx, chunk in enumerate(chunks):
        embedding = model.encode([chunk])[0].tolist()
        vec_str = "[" + ",".join(map(str, embedding)) + "]"
        chunk_id = str(uuid.uuid4())
        
        cursor.execute("""
            INSERT INTO content_chunks (id, source_document_id, page_number, chunk_index, content, token_count, embedding)
            VALUES (%s, %s, %s, %s, %s, %s, %s::vector)
            ON CONFLICT (id) DO NOTHING;
        """, (chunk_id, doc_id, (idx // 3) + 1, idx, chunk, len(chunk.split()), vec_str))
        inserted += 1
        
        if (inserted % 50) == 0:
            print(f"Progresso: {inserted}/{len(chunks)} inseridos...")
    
    conn.commit()
    conn.close()
    print(f"Sucesso! {inserted} chunks inseridos no banco PostgreSQL solda_inspecao na tabela content_chunks.")

if __name__ == "__main__":
    ingest_knowledge()
