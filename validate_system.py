import psycopg2

conn = psycopg2.connect('postgresql://postgres:postgres@localhost:5432/solda_inspecao')
cur = conn.cursor()

print("="*70)
print("       RELATÓRIO DE AUDITORIA E VALIDAÇÃO AUTOMÁTICA - AXION")
print("="*70)

# 1. Total de questões
cur.execute("SELECT count(*) FROM questions")
total_questions = cur.fetchone()[0]

# 2. Questões publicadas
cur.execute("SELECT count(*) FROM questions WHERE status = 'published'")
published_questions = cur.fetchone()[0]

# 3. Questões bloqueadas
cur.execute("SELECT count(*) FROM questions WHERE status != 'published'")
blocked_questions = cur.fetchone()[0]

# 4. Questões com imagem
cur.execute("SELECT count(*) FROM questions WHERE image_path IS NOT NULL")
with_image = cur.fetchone()[0]

# 5. Questões sem imagem
cur.execute("SELECT count(*) FROM questions WHERE image_path IS NULL")
without_image = cur.fetchone()[0]

# 6. Questões duplicadas marcadas
cur.execute("SELECT count(*) FROM questions WHERE status = 'duplicate'")
duplicate_questions = cur.fetchone()[0]

# 7. Questões aguardando revisão de imagem
cur.execute("SELECT count(*) FROM questions WHERE status = 'needs_image_review'")
needs_image_review = cur.fetchone()[0]

# 8. Questões sem classificação ou em "Geral"
cur.execute("""
    SELECT count(*) 
    FROM questions q 
    LEFT JOIN subjects s ON q.subject_id = s.id 
    WHERE q.subject_id IS NULL OR s.name = 'Geral'
""")
unclassified = cur.fetchone()[0]

# 9. Questões publicadas sem aula
cur.execute("""
    SELECT count(*) 
    FROM questions q 
    WHERE q.status = 'published' 
      AND NOT EXISTS (SELECT 1 FROM lesson_questions lq WHERE lq.question_id = q.id)
""")
without_lesson = cur.fetchone()[0]

# 10. Questões sem fonte
cur.execute("SELECT count(*) FROM questions WHERE source_document_id IS NULL")
without_source = cur.fetchone()[0]

# 11. Questões sem gabarito (sem alternativa correta)
cur.execute("""
    SELECT count(*) 
    FROM questions q 
    WHERE NOT EXISTS (
        SELECT 1 FROM question_options o WHERE o.question_id = q.id AND o.is_correct = TRUE
    )
""")
without_correct = cur.fetchone()[0]

# 12. Questões com mais de 1 gabarito
cur.execute("""
    SELECT count(*) FROM (
        SELECT q.id 
        FROM questions q 
        JOIN question_options o ON q.id = o.question_id 
        WHERE o.is_correct = TRUE 
        GROUP BY q.id 
        HAVING count(o.id) > 1
    ) sub
""")
multiple_correct = cur.fetchone()[0]

# 13. Questões sem alternativas
cur.execute("""
    SELECT count(*) 
    FROM questions q 
    WHERE NOT EXISTS (
        SELECT 1 FROM question_options o WHERE o.question_id = q.id
    )
""")
without_options = cur.fetchone()[0]

# 14. Questões que necessitam de figura mas estão publicadas sem imagem (deve ser ZERO)
cur.execute("""
    SELECT count(*) 
    FROM questions q 
    WHERE q.status = 'published' 
      AND q.needs_image = TRUE 
      AND q.image_path IS NULL
""")
published_missing_required_image = cur.fetchone()[0]

print(f"TOTAL DE QUESTÕES:                           {total_questions}")
print(f"QUESTÕES PUBLICADAS:                         {published_questions}")
print(f"QUESTÕES BLOQUEADAS:                         {blocked_questions}")
print(f"  - Por duplicidade (Type A):                {duplicate_questions}")
print(f"  - Aguardando revisão de imagem:            {needs_image_review}")
print(f"QUESTÕES COM IMAGEM:                         {with_image}")
print(f"QUESTÕES SEM IMAGEM:                         {without_image}")
print(f"QUESTÕES PUBLICADAS SEM IMAGEM OBRIGATÓRIA:  {published_missing_required_image} (Critério de Segurança)")
print(f"QUESTÕES SEM CLASSIFICAÇÃO / EM GERAL:       {unclassified}")
print(f"QUESTÕES PUBLICADAS SEM AULA:                {without_lesson}")
print(f"QUESTÕES SEM FONTE:                          {without_source}")
print(f"QUESTÕES SEM GABARITO:                       {without_correct}")
print(f"QUESTÕES COM GABARITO DUPLO:                 {multiple_correct}")
print(f"QUESTÕES SEM ALTERNATIVAS:                   {without_options}")
print("="*70)

# Queue status
print("\nSTATUS DA FILA DE IMPORTAÇÃO (question_import_queue - 674 registros):")
cur.execute("SELECT status, count(*) FROM question_import_queue GROUP BY status ORDER BY count(*) DESC")
for st, cnt in cur.fetchall():
    print(f"  {st.upper():20}: {cnt}")

print("\nDISTRIBUIÇÃO DE QUESTÕES PUBLICADAS POR DISCIPLINA/AULA:")
cur.execute("""
    SELECT m.title, count(lq.question_id)
    FROM lesson_questions lq
    JOIN lessons l ON lq.lesson_id = l.id
    JOIN modules m ON l.module_id = m.id
    GROUP BY m.title, m.position
    ORDER BY m.position ASC
""")
for mtitle, cnt in cur.fetchall():
    print(f"  {mtitle:42}: {cnt} questões")

conn.close()
