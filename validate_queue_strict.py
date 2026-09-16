import psycopg2, json

conn = psycopg2.connect('postgresql://postgres:postgre@localhost:5432/axion_recovery')
cur = conn.cursor()

cur.execute('''
    SELECT q.id, q.raw_json, d.filename
    FROM question_import_queue q
    JOIN source_documents d ON q.source_document_id = d.id
    WHERE q.status = 'valid'
''')
valid_rows = cur.fetchall()

strict_valid = []
broken_answer = []
corrupted_statement = []

for qid, raw, fname in valid_rows:
    stmt = raw.get('statement', '').strip()
    opts = raw.get('options', [])
    opt_labels = set()
    for o in opts:
        lbl = o.get('label')
        if lbl: opt_labels.add(lbl.strip().upper())
    
    ans = raw.get('correct_label') or raw.get('answer')
    if not ans and raw.get('gabarito_hint'):
        hint = raw.get('gabarito_hint').strip().upper()
        if hint in opt_labels:
            ans = hint
    
    if len(stmt) < 25 or 'propr,e a' in stmt:
        corrupted_statement.append((qid, stmt))
    elif not ans or ans not in opt_labels:
        broken_answer.append((qid, stmt, ans, opt_labels))
    else:
        strict_valid.append((qid, stmt, opts, ans, fname))

print(f'Total candidates previously flagged as valid: {len(valid_rows)}')
print(f'Corrupted statements: {len(corrupted_statement)}')
print(f'Broken/mismatched answer: {len(broken_answer)}')
print(f'Strictly valid (perfect statement, options, matching answer): {len(strict_valid)}')

# Update queue records:
for qid, stmt in corrupted_statement:
    cur.execute("UPDATE question_import_queue SET status = 'invalid', reviewer_notes = 'Texto corrompido por OCR' WHERE id = %s", (qid,))

for qid, stmt, ans, labels in broken_answer:
    cur.execute("UPDATE question_import_queue SET status = 'review', reviewer_notes = 'Gabarito não coincide com alternativas extraídas' WHERE id = %s", (qid,))

conn.commit()

# Recheck queue counts
cur.execute('SELECT status, count(*) FROM question_import_queue GROUP BY status ORDER BY count(*) DESC')
print('\nUpdated question_import_queue status breakdown:')
for st, cnt in cur.fetchall():
    print(f'  {st.upper()}: {cnt}')

conn.close()


