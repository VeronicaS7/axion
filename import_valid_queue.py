import psycopg2, json, uuid, unicodedata, re

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()

conn = psycopg2.connect('postgresql://postgres:postgre@localhost:5432/axion_recovery')
cur = conn.cursor()

# Get subjects
cur.execute('SELECT id, name, slug FROM subjects')
subj_by_slug = {row[2]: row[0] for row in cur.fetchall()}

# Reclassification rules for queue questions
rules = [
    (['aws', 'eletrodo', 'revestimento', 'rutilico', 'basico', 'arame', 'fluxo', 'secagem', 'estufa', 'f-number', 'consumivel'], 'consumiveis-de-soldagem'),
    (['pirometro', 'lapis termico', 'registrador de temperatura', 'paquimetro', 'micrometro', 'medicao', 'instrumento', 'calibre'], 'instrumentos-de-medicao'),
    (['angulo', 'subtracao entre', 'soma entre', 'algarismo', 'converta', 'polegada', 'desenho'], 'desenho-tecnico-aplicado'),
    (['difusao', 'cristalina', 'carbono', 'ferrita', 'austenita', 'martensita', 'diagrama', 'fase', 'diluicao', 'resfriamento', 'solidificacao', 'aisi', 'inoxidav', 'ferro', 'curvas ttt'], 'metalurgia-da-soldagem'),
    (['martelamento', 'pre-deformac', 'deformac', 'tensao residual', 'contra', 'distorcao', 'alivio de tensoes'], 'tensoes-e-deformacoes'),
    (['ultrassom', 'cabecote', 'radiograf', 'liquido penetrante', 'particulas magneticas', 'descontinuidade', 'trinca', 'porosidade', 'ensaio nao destrutivo', 'penetrante', 'revelador', 'emulsificador', 'fluorescente', 'capilaridade', 'lavabilidade'], 'ensaios-nao-destrutivos'),
    (['soldador', 'operador', 'validade da qualificacao', 'ieis', 'rqs'], 'qualificacao-de-soldadores'),
    (['eps', 'rqps', 'procedimento de soldagem', 'qualificacao de procedimento', 'p-number', 'variaveis'], 'qualificacao-de-procedimentos-eps-rqps'),
    (['junta de angulo', 'junta de topo', 'bisel', 'raiz', 'abertura da raiz', 'chanfro', 'perna de uma solda', 'junta'], 'tipos-de-junta-e-solda'),
    (['simbolo', 'simbologia'], 'simbologia-de-soldagem'),
    (['tig', 'mig', 'mag', 'gmaw', 'gtaw', 'smaw', 'arco eletrico', 'chama', 'oxi-gas', 'arco submerso', 'corte a gas', 'gas de protecao', 'argonio', 'helio', 'co2'], 'processos-de-soldagem'),
    (['termo de conduta', 'etica', 'snqc', 'fbts', 'atribuicao', 'qualidade', 'auditoria', 'macrografia', 'tracao', 'dobramento', 'charpy', 'ensaio mecanico', 'dureza'], 'inspecao-e-qualidade'),
    (['protecao', 'seguranca', 'epi', 'fumor', 'fumos', 'ventilacao', 'lente', 'mascara', 'choque'], 'seguranca-do-trabalho'),
]

cur.execute('''
    SELECT q.id, q.raw_json, q.page_number, q.source_document_id, d.filename
    FROM question_import_queue q
    JOIN source_documents d ON q.source_document_id = d.id
    WHERE q.status = 'valid'
''')
valid_rows = cur.fetchall()

imported_count = 0
for qid, raw, page, doc_id, fname in valid_rows:
    stmt = raw.get('statement', '').strip()
    opts = raw.get('options', [])
    ans = raw.get('correct_label') or raw.get('answer')
    if not ans and raw.get('gabarito_hint'):
        ans = raw.get('gabarito_hint').strip().upper()
    q_num = raw.get('question_number_in_source')
    
    # Determine subject
    target_slug = 'ensaios-nao-destrutivos' if 'Abendi' in fname else None
    if not target_slug:
        s_norm = strip_accents(stmt)
        for kw_list, slug in rules:
            if any(kw in s_norm for kw in kw_list):
                target_slug = slug
                break
    if not target_slug:
        target_slug = 'processos-de-soldagem'
    
    subject_id = subj_by_slug.get(target_slug, subj_by_slug['ensaios-nao-destrutivos'])
    
    new_qid = str(uuid.uuid4())
    cur.execute('''
        INSERT INTO questions (
            id, statement, subject_id, source_document_id, source_page, 
            source_question_number, status, difficulty, needs_image, created_at
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
    ''', (new_qid, stmt, subject_id, doc_id, page, str(q_num) if q_num else None, 'published', 'Intermediário', False))
    
    # Insert options
    for o in opts:
        lbl = o.get('label', 'A').strip().upper()
        content = o.get('content', '').strip()
        # Clean content from leading "( ) " or "( X ) "
        content = re.sub(r'^\(\s*[\w\-\+\*\.\,\<\>\?]*\s*\)\s*', '', content)
        is_corr = (lbl == ans.strip().upper())
        cur.execute('''
            INSERT INTO question_options (id, question_id, label, content, is_correct)
            VALUES (%s, %s, %s, %s, %s)
        ''', (str(uuid.uuid4()), new_qid, lbl, content, is_corr))
        
    imported_count += 1

conn.commit()
print(f'Successfully imported {imported_count} questions into the active questions table.')

# Now re-link questions to lessons
print('Re-linking questions to lesson_questions...')
cur.execute('DELETE FROM lesson_questions')

cur.execute('''
    SELECT m.title, l.id as lesson_id, s.id as subject_id
    FROM modules m
    JOIN subjects s ON s.name = m.title
    JOIN lessons l ON l.module_id = m.id AND l.position = 0
''')
mod_targets = cur.fetchall()

total_linked = 0
for mtitle, lid, sid in mod_targets:
    cur.execute('''
        SELECT q.id, q.source_page, q.source_question_number
        FROM questions q
        WHERE q.subject_id = %s AND q.status = 'published'
        ORDER BY 
            COALESCE(NULLIF(regexp_replace(q.source_question_number, '\\D', '', 'g'), '')::integer, 9999),
            q.created_at ASC
    ''', (sid,))
    subj_questions = cur.fetchall()
    
    for pos, (qid, spage, snum) in enumerate(subj_questions, start=1):
        cur.execute('''
            INSERT INTO lesson_questions (lesson_id, question_id, position, source_page, source_question_number)
            VALUES (%s, %s, %s, %s, %s)
        ''', (lid, qid, pos, spage, snum))
        total_linked += 1

conn.commit()
print(f'Total published questions linked across all pedagogical lessons: {total_linked}')

# Final counts check
cur.execute('SELECT status, count(*) FROM questions GROUP BY status ORDER BY count(*) DESC')
print('\nFinal Questions Table Status Breakdown:')
for st, cnt in cur.fetchall():
    print(f'  {st}: {cnt}')

cur.execute('''
    SELECT m.title, count(lq.question_id) as cnt
    FROM lesson_questions lq
    JOIN lessons l ON lq.lesson_id = l.id
    JOIN modules m ON l.module_id = m.id
    GROUP BY m.title, m.position
    ORDER BY m.position ASC
''')
print('\nFinal Questions per Module Lesson:')
for row in cur.fetchall():
    print(f'  [{row[0]}]: {row[1]} questoes')

conn.close()


