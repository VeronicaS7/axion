import sqlite3
try:
    conn = sqlite3.connect('axion_knowledge.db')
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [r[0] for r in cur.fetchall()]
    print('Tables in SQLite:', tables)
    
    if 'lesson_questions' in tables:
        cur.execute("SELECT COUNT(*) FROM lesson_questions")
        print('lesson_questions count:', cur.fetchone()[0])
    
    if 'question_import_queue' in tables:
        cur.execute("SELECT COUNT(*) FROM question_import_queue")
        print('question_import_queue count:', cur.fetchone()[0])
        
    if 'questions' in tables:
        cur.execute("SELECT COUNT(*) FROM questions")
        print('questions count:', cur.fetchone()[0])
        
        # check columns
        cur.execute("PRAGMA table_info(questions);")
        cols = [r[1] for r in cur.fetchall()]
        print('questions has needs_image_review:', 'needs_image_review' in cols)
        
    if 'lessons' in tables:
        cur.execute("SELECT COUNT(*) FROM lessons")
        print('lessons count:', cur.fetchone()[0])
        
    # Snapshots check
    snapshots = [t for t in tables if t.startswith('snapshot_') and t.endswith('_backup')]
    print('Snapshots:', snapshots)
        
except Exception as e:
    print('Error:', e)
