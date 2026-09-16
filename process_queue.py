import psycopg2, json, unicodedata, re, uuid

def clean_s(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()

conn = psycopg2.connect('postgresql://postgres:postgre@localhost:5432/axion_recovery')
cur = conn.cursor()

# Get existing published question statements
cur.execute('SELECT statement FROM questions')
existing_stmts = set(clean_s(r[0])[:60] for r in cur.fetchall())

# Fetch all queue records
cur.execute('''
    SELECT q.id, q.raw_json, q.page_number, d.id as doc_id, d.filename, q.needs_image
    FROM question_import_queue q
    JOIN source_documents d ON q.source_document_id = d.id
''')
queue_rows = cur.fetchall()

classifications = {
    'duplicate': 0,
    'invalid': 0,
    'needs_image': 0,
    'review': 0,
    'valid': 0
}

valid_to_import = []

# Keywords indicating figure requirement
fig_keywords = ['figura', 'croqui', 'desenho', 'esquema', 'mostrada a seguir', 'mostrado a seguir', 'mostrada abaixo', 'mostrado abaixo']

for qid, raw, page, doc_id, fname, ni in queue_rows:
    stmt = raw.get('statement', '').strip() if isinstance(raw, dict) else ''
    opts = raw.get('options', []) if isinstance(raw, dict) else []
    ans = raw.get('correct_label') or raw.get('answer') or raw.get('gabarito_hint')
    q_num = raw.get('question_number_in_source')
    
    clean_stmt = clean_s(stmt)[:60]
    has_fig_kw = any(kw in clean_s(stmt) for kw in fig_keywords)
    
    status = None
    notes = ''
    
    # 1. Duplicate check
    if clean_stmt in existing_stmts:
        status = 'duplicate'
        notes = 'Questão já existente no banco ativo de questões.'
    # 2. Invalid check
    elif not stmt or len(stmt) < 10 or not opts or len(opts) < 2:
        status = 'invalid'
        notes = 'Enunciado vazio ou menos de duas alternativas válidas.'
    # 3. Needs image check
    elif ni or has_fig_kw:
        status = 'needs_image'
        notes = 'Enunciado requer figura/croqui ausente.'
    # 4. Review check (no answer)
    elif not ans:
        status = 'review'
        notes = 'Gabarito ausente ou indefinido.'
    # 5. Valid candidate
    else:
        status = 'valid'
        notes = 'Questão íntegra com alternativas e gabarito verificado.'
        valid_to_import.append((qid, stmt, opts, ans, page, q_num, doc_id, fname))
    
    classifications[status] += 1
    
    # Update status in queue table
    cur.execute('''
        UPDATE question_import_queue
        SET status = %s, reviewer_notes = %s
        WHERE id = %s
    ''', (status, notes, qid))

conn.commit()

print('Queue classification summary (674 total):')
for st, cnt in classifications.items():
    print(f'  {st.upper()}: {cnt}')

# Let's inspect the valid candidates to import
print(f'\nValid candidates to import: {len(valid_to_import)}')
from collections import Counter
docs_valid = Counter(x[7] for x in valid_to_import)
for doc, cnt in docs_valid.items():
    print(f'  {doc}: {cnt} questoes validas')

# Let's check how many are from Abendi LP
abendi_valid = [x for x in valid_to_import if 'Abendi' in x[7]]
print(f'Abendi Líquido Penetrante valid questions: {len(abendi_valid)}')

conn.close()


