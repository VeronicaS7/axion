import psycopg2
import unicodedata
import re

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()

conn = psycopg2.connect('postgresql://postgres:postgre@localhost:5432/axion_recovery')
cur = conn.cursor()

# Get the 'Geral' subject ID
cur.execute("SELECT id FROM subjects WHERE name = 'Geral'")
row = cur.fetchone()
if not row:
    print("Geral not found.")
    exit()
geral_id = row[0]

# Get all questions in Geral
cur.execute("SELECT id, statement FROM questions WHERE subject_id = %s", (geral_id,))
qs = cur.fetchall()

# Rules
rules = [
    (['aws', 'eletrodo', 'revestimento', 'rutilico', 'basico', 'arame', 'fluxo', 'secagem', 'estufa', 'f-number', 'consumivel'], 'consumiveis-de-soldagem'),
    (['trinca', 'porosidade', 'mordedura', 'falta de fusao', 'falta de penetracao', 'descontinuidade', 'inclusao', 'escoria', 'respingo', 'defeito'], 'descontinuidades-e-defeitos-de-soldagem'),
    (['desenho', 'escala', 'corte', 'vista', 'perspectiva', 'cotagem', 'hachura'], 'desenho-tecnico-aplicado'),
    (['ensaio visual', 'visual', 'ev', 'iluminacao', 'gabarito', 'lupa', 'boroscopio'], 'ensaio-visual-e-dimensional'),
    (['liquido penetrante', 'particula magnetica', 'ultrassom', 'radiografia', 'estanqueidade', 'ensaio nao destrutivo', 'end', 'lp', 'pm', 'us', 'rx', 'gama', 'revelador', 'penetrante'], 'ensaios-nao-destrutivos'),
    (['inspecao', 'qualidade', 'inspetor', 'snqc', 'fbts', 'asnt', 'is', 'documentacao', 'certificado', 'certificacao'], 'inspecao-e-qualidade'),
    (['calibrador', 'paquimetro', 'micrometro', 'trena', 'escala', 'termometro', 'medicao', 'instrumento', 'afericao', 'calibracao'], 'instrumentos-de-medicao'),
    (['aco', 'carbono', 'inoxidavel', 'liga', 'estrutura', 'martensita', 'austenita', 'ferrita', 'cementita', 'zta', 'zona termicamente afetada', 'temperatura', 'resfriamento', 'pre-aquecimento', 'pos-aquecimento', 'ttat', 'tratamento termico', 'dureza', 'carbono equivalente'], 'metalurgia-da-soldagem'),
    (['norma', 'asme', 'api', 'aws', 'abnt', 'iso', 'codigo', 'especificacao', 'procedimento'], 'normas-e-documentos-tecnicos'),
    (['tig', 'mig', 'mag', 'eletrodo revestido', 'arco submerso', 'plasma', 'oxigas', 'smaw', 'gtaw', 'gmaw', 'fcaw', 'saw', 'soldagem', 'processo', 'arco eletrico', 'polaridade', 'corrente', 'tensao'], 'processos-de-soldagem'),
    (['eps', 'rqps', 'qualificacao', 'procedimento', 'variavel essencial', 'suporte', 'ensaio mec', 'tracao', 'dobramento', 'impacto', 'charpy', 'macro', 'micro'], 'qualificacao-de-procedimentos-epsrqps'),
    (['soldador', 'operador', 'qualificacao de soldador', 'rqs', 'posicao de soldagem', 'teste', 'habilidade'], 'qualificacao-de-soldadores'),
    (['simbologia', 'simbolo', 'cauda', 'linha de referencia', 'seta', 'solda de filete', 'solda de entalhe'], 'simbologia-de-soldagem'),
    (['tensao', 'deformacao', 'contracao', 'empenamento', 'distorcao', 'alivio de tensoes', 'sequencia de soldagem'], 'tensoes-e-deformacoes'),
    (['junta', 'filete', 'topo', 'canto', 'aresta', 'angulo', 'chanfro', 'v', 'x', 'u', 'j', 'raiz', 'face', 'margem', 'perna', 'garganta', 'penetracao'], 'tipos-de-junta-e-solda'),
    (['terminologia', 'termo', 'definicao', 'glossario', 'nomenclatura'], 'terminologia-de-soldagem')
]

# Fetch slugs to id
cur.execute("SELECT slug, id FROM subjects")
slug_map = dict(cur.fetchall())

updated = 0
for qid, statement in qs:
    clean_stmt = strip_accents(statement)
    new_subject_id = None
    for keywords, slug in rules:
        if any(k in clean_stmt for k in keywords):
            new_subject_id = slug_map.get(slug)
            break
    
    if new_subject_id:
        cur.execute("UPDATE questions SET subject_id = %s WHERE id = %s", (new_subject_id, qid))
        updated += 1
    else:
        # Fallback to 'ensaios-nao-destrutivos' if it mentions anything like that
        if 'ensaio' in clean_stmt:
            cur.execute("UPDATE questions SET subject_id = %s WHERE id = %s", (slug_map['ensaios-nao-destrutivos'], qid))
            updated += 1

conn.commit()
print(f"Reclassified {updated} out of {len(qs)} questions from Geral.")

cur.execute("SELECT count(*) FROM questions WHERE subject_id = %s", (geral_id,))
print("Remaining in Geral:", cur.fetchone()[0])
conn.close()
