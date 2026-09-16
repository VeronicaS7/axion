import psycopg2
try:
    conn = psycopg2.connect('postgresql://postgres@localhost:5432/axion')
    cur = conn.cursor()
    
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    tables = [r[0] for r in cur.fetchall()]
    
    required_tables = ['lesson_questions', 'questions', 'lessons', 'question_import_queue']
    found = {t: (t in tables) for t in required_tables}
    print('Tables found:', found)
    
    for t in required_tables:
        if t in tables:
            cur.execute(f'SELECT COUNT(*) FROM {t}')
            print(f'Count {t}: {cur.fetchone()[0]}')
            
    # Check needs_image_review
    if 'questions' in tables:
        cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'needs_image_review';")
        print('questions has needs_image_review:', bool(cur.fetchone()))
            
    conn.close()
except Exception as e:
    print('Error:', e)
