import psycopg2
try:
    conn = psycopg2.connect('postgresql://postgres@localhost:5433/solda_inspecao')
    cur = conn.cursor()
    
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    tables = [r[0] for r in cur.fetchall()]
    
    required_tables = ['lesson_questions', 'questions', 'lessons', 'question_import_queue']
    found = {t: (t in tables) for t in required_tables}
    print('Tables found in solda_inspecao (5433):', found)
    
    for t in required_tables:
        if t in tables:
            cur.execute(f'SELECT COUNT(*) FROM {t}')
            print(f'Count {t}: {cur.fetchone()[0]}')
            
    conn.close()
except Exception as e:
    print('Error:', e)
