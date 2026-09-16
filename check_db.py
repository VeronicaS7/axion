import psycopg2
from psycopg2 import sql

def get_databases():
    conn = psycopg2.connect(host="localhost", port=5432, user="postgres", password="postgres", dbname="postgres")
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute("SELECT datname FROM pg_database WHERE datistemplate = false;")
    dbs = [row[0] for row in cur.fetchall()]
    conn.close()
    return dbs

def check_db(dbname):
    try:
        conn = psycopg2.connect(host="localhost", port=5432, user="postgres", password="postgres", dbname=dbname)
        cur = conn.cursor()
        
        # Check if lesson_questions exists
        cur.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'lesson_questions');")
        has_lesson_questions = cur.fetchone()[0]
        
        # Check snapshots
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'snapshot_%_backup';")
        snapshots = [row[0] for row in cur.fetchall()]
        
        counts = {}
        # Count questions
        cur.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'questions');")
        if cur.fetchone()[0]:
            cur.execute("SELECT COUNT(*) FROM questions;")
            counts['questions'] = cur.fetchone()[0]
            
            # Check needs_image_review
            cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'needs_image_review';")
            counts['has_needs_image_review_col'] = bool(cur.fetchone())
        
        # Count lessons
        cur.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'lessons');")
        if cur.fetchone()[0]:
            cur.execute("SELECT COUNT(*) FROM lessons;")
            counts['lessons'] = cur.fetchone()[0]
            
        # Count lesson_questions
        if has_lesson_questions:
            cur.execute("SELECT COUNT(*) FROM lesson_questions;")
            counts['lesson_questions'] = cur.fetchone()[0]
            
        # Count question_import_queue
        cur.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'question_import_queue');")
        if cur.fetchone()[0]:
            cur.execute("SELECT COUNT(*) FROM question_import_queue;")
            counts['question_import_queue'] = cur.fetchone()[0]
            
        conn.close()
        
        print(f"\n--- Database: {dbname} ---")
        print(f"has_lesson_questions: {has_lesson_questions}")
        print(f"Counts: {counts}")
        print(f"Snapshots: {snapshots}")
        
    except Exception as e:
        pass # ignore dbs we can't connect to or don't have permissions

dbs = get_databases()
for db in dbs:
    check_db(db)
