import requests, json

BASE = 'http://localhost:8000'

# 1. Health
r = requests.get(f'{BASE}/api/health')
print('Health:', r.status_code, r.json().get('status'), 'DB:', r.json().get('database', {}).get('connected'))

# 2. Courses
r = requests.get(f'{BASE}/api/courses')
courses = r.json()
print(f'Courses: {len(courses)} -> {courses[0]["title"]}')
cid = courses[0]['id']

# 3. Course detail
r = requests.get(f'{BASE}/api/courses/{cid}')
cdetail = r.json()
modules = cdetail.get('modules', [])
print(f'Modules in course: {len(modules)}')

# 4. Check a lesson from Terminologia
term_mod = next(m for m in modules if 'Terminologia' in m['title'])
term_lid = term_mod['lessons'][0]['id']
r = requests.get(f'{BASE}/api/lessons/{term_lid}')
lesson_data = r.json()
print('\nLesson Terminologia:')
print('  Title:', lesson_data.get('title'))
print('  Introduction length:', len(lesson_data.get('introduction', '')))
print('  Objectives length:', len(lesson_data.get('objectives', '')))
print('  Steps count:', len(lesson_data.get('steps', [])))
for s in lesson_data.get('steps', []):
    print(f'    [{s["step_type"]}] {s["title"]}')

# 5. Check a lesson with images (Instrumentos)
inst_mod = next(m for m in modules if 'Instrumentos' in m['title'])
inst_lid = inst_mod['lessons'][0]['id']
r = requests.get(f'{BASE}/api/lessons/{inst_lid}')
inst_data = r.json()
print('\nLesson Instrumentos:')
print('  Steps count:', len(inst_data.get('steps', [])))
acts = [s for s in inst_data.get('steps', []) if s['step_type'] == 'activity']
acts_with_img = [a for a in acts if a['activity'].get('image_path')]
print(f'  Activities: {len(acts)} | With Image: {len(acts_with_img)}')
if acts_with_img:
    sample_act = acts_with_img[0]['activity']
    print(f'  Sample with image: {sample_act["statement"][:60]} -> {sample_act["image_path"]}')

# 6. Check Metalurgia
met_mod = next(m for m in modules if 'Metalurgia' in m['title'])
met_lid = met_mod['lessons'][0]['id']
r = requests.get(f'{BASE}/api/lessons/{met_lid}')
met_data = r.json()
print('\nLesson Metalurgia da Soldagem:')
print('  Steps count:', len(met_data.get('steps', [])))
acts_met = [s for s in met_data.get('steps', []) if s['step_type'] == 'activity']
acts_met_img = [a for a in acts_met if a['activity'].get('image_path')]
print(f'  Activities: {len(acts_met)} | With Image: {len(acts_met_img)}')
if acts_met_img:
    print(f'  Sample Metalurgia image: {acts_met_img[0]["activity"]["statement"][:60]} -> {acts_met_img[0]["activity"]["image_path"]}')
