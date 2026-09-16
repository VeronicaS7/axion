import psycopg2

def check_db(port, db):
    try:
        conn = psycopg2.connect(f'postgresql://postgres@localhost:{port}/{db}')
        cur = conn.cursor()
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        tables = [r[0] for r in cur.fetchall()]
        if 'lesson_questions' in tables:
            cur.execute('SELECT COUNT(*) FROM lesson_questions')
            print(f'FOUND in {db} on port {port}! count = {cur.fetchone()[0]}')
            
            # Check needs_image_review
            cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'needs_image_review';")
            print('questions has needs_image_review:', bool(cur.fetchone()))
            
        else:
            print(f'{db} on {port}: no lesson_questions')
        conn.close()
    except Exception as e:
        print(f'Error connecting to {db} on {port}: {e}')

check_db(5432, 'postgres')
check_db(5432, 'axion')
