import psycopg2
import sys

def get_stats(db_name):
    conn = psycopg2.connect(f'postgresql://postgres:postgre@localhost:5432/{db_name}')
    cur = conn.cursor()
    
    stats = {}
    
    tables = [
        'questions', 'question_options', 'lessons', 'modules', 
        'subjects', 'lesson_questions', 'question_import_queue', 
        'source_documents', 'content_chunks'
    ]
    for t in tables:
        try:
            cur.execute(f"SELECT count(*) FROM {t}")
            stats[t] = cur.fetchone()[0]
        except Exception as e:
            conn.rollback()
            stats[t] = f"Error"

    cur.execute("SELECT count(*) FROM questions WHERE status = 'duplicate'")
    stats['status_duplicate'] = cur.fetchone()[0]
    
    cur.execute("SELECT count(*) FROM questions WHERE status = 'needs_image_review'")
    stats['status_needs_image_review'] = cur.fetchone()[0]
    
    cur.execute("SELECT count(*) FROM questions q JOIN subjects s ON q.subject_id = s.id WHERE s.name = 'Geral'")
    stats['questions_geral'] = cur.fetchone()[0]
    
    conn.close()
    return stats

rec = get_stats('axion_recovery')
solda = get_stats('solda_inspecao')

diffs = 0
for k in rec:
    print(f"{k}: Recovery={rec[k]} | Solda={solda.get(k)}")
    if str(rec[k]) != str(solda.get(k)):
        diffs += 1
        print(f"  --> MISMATCH IN {k}!")

if diffs == 0:
    print("\nALL METRICS MATCH PERFECTLY.")
else:
    print(f"\nFound {diffs} mismatches.")
