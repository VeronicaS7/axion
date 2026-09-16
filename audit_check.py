import requests, psycopg2, os

BASE = 'http://127.0.0.1:8000'

conn = psycopg2.connect('postgresql://postgres:postgres@localhost:5432/solda_inspecao')
cur = conn.cursor()
cur.execute('SELECT id, status FROM questions')
status_map = dict(cur.fetchall())
conn.close()

# 18. Check if API returns only published questions
r = requests.get(f'{BASE}/api/courses')
courses = r.json()
cid = courses[0]['id']

r = requests.get(f'{BASE}/api/courses/{cid}')
cdetail = r.json()
modules = cdetail['modules']

total_returned = 0
invalid_status_returned = 0

for m in modules:
    mid = m['id']
    rq = requests.get(f'{BASE}/api/questions/{mid}?limit=100')
    if rq.status_code == 200:
        qs = rq.json()
        total_returned += len(qs)
        for q in qs:
            st = status_map.get(q['id'])
            if st != 'published':
                invalid_status_returned += 1

print('=== 18. API RETORNA APENAS QUESTOES PUBLICADAS? ===')
print(f'Total questoes retornadas via API nos modulos: {total_returned}')
print(f'Questoes com status diferente de published retornadas: {invalid_status_returned}')

# 19. Check navigation flow Curso -> Modulo -> Assunto -> Aula -> Questao -> Imagem
print('\n=== 19. NAVEGACAO COMPLETA CURSO -> MODULO -> ASSUNTO -> AULA -> QUESTAO -> IMAGEM ===')
target_mod = next(m for m in modules if 'Instrumentos' in m['title'])
print(f'1. Curso: {cdetail["title"]}')
print(f'2. Modulo: {target_mod["title"]}')
print(f'3. Assunto: {target_mod["title"]}')

target_lesson = target_mod['lessons'][0]
rl = requests.get(f'{BASE}/api/lessons/{target_lesson["id"]}')
lesson_data = rl.json()
print(f'4. Aula: {lesson_data["title"]}')
print(f'   Total de passos (steps): {len(lesson_data.get("steps", []))}')

act_steps = [s for s in lesson_data.get('steps', []) if s['step_type'] == 'activity']
act_with_img = [s for s in act_steps if s['activity'].get('image_path')]

if act_with_img:
    sample_act = act_with_img[0]['activity']
    print(f'5. Questao com Imagem encontrada:')
    print(f'   ID: {sample_act["id"]}')
    print(f'   Enunciado: {sample_act["statement"][:65]}...')
    print(f'   6. Imagem: {sample_act["image_path"]}')
    
    img_disk_path = os.path.join('public', sample_act['image_path'].lstrip('/'))
    print(f'   Arquivo de imagem existe em disco ({img_disk_path}): {os.path.exists(img_disk_path)}')
