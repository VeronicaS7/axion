import fitz
import re
import os
import uuid
import json

pdf_path = r"C:\Users\Veronica\Desktop\Axion\arquivos\668910950-Caderno-de-exerci-cios-N1.pdf"
img_out_dir = r"C:\Users\Veronica\Desktop\Axion\public\images\questions"
sql_out_path = r"C:\Users\Veronica\Desktop\Axion\questions_seed.sql"
json_out_path = r"C:\Users\Veronica\Desktop\Axion\questions_catalog.json"

os.makedirs(img_out_dir, exist_ok=True)

# Course and Module IDs to use in SQL
COURSE_ID = "c5555555-5555-5555-5555-555555555555" # Engenharia de Soldagem

doc = fitz.open(pdf_path)

sections = []
current_section = "Geral"

questions = []
current_question = None

# Regex patterns
section_pattern = re.compile(r'^[A-Z\s]{5,}$')
q_start_pattern = re.compile(r'^(\d+)\s*.\s*(.+)', re.DOTALL)
option_pattern = re.compile(r'^\s*\(([a-z])\)\s*(.+)', re.IGNORECASE)
answer_pattern = re.compile(r'^RESPOSTA:\s*([A-Z])', re.IGNORECASE)

print(f"Processing PDF: {pdf_path} (Pages: {len(doc)})")

for page_num in range(len(doc)):
    page = doc.load_page(page_num)
    text = page.get_text("text")
    lines = text.split('\n')
    
    # Extract images from this page
    images_on_page = []
    image_list = page.get_images(full=True)
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_name = f"page{page_num+1}_img{img_index+1}.{image_ext}"
        image_path = os.path.join(img_out_dir, image_name)
        with open(image_path, "wb") as f:
            f.write(image_bytes)
        images_on_page.append(image_name)

    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        VALID_SECTIONS = {
            "INTRODUO": "Introdução",
            "INTRODUÇÃO": "Introdução",
            "TERMINOLOGIA": "Terminologia",
            "SIMBOLOGIA": "Simbologia",
            "CONSUMVEIS DE SOLDAGEM": "Consumíveis de Soldagem",
            "CONSUMÍVEIS DE SOLDAGEM": "Consumíveis de Soldagem",
            "PROCESSOS DE SOLDAGEM": "Processos de Soldagem",
            "METALURGIA": "Metalurgia da Soldagem",
            "METAIS DE BASE": "Metais de Base",
            "ENSAIOS MECNICOS": "Ensaios Mecânicos",
            "ENSAIOS MECÂNICOS": "Ensaios Mecânicos",
            "ENSAIOS NO DESTRUTIVOS": "Ensaios Não Destrutivos",
            "ENSAIOS NÃO DESTRUTIVOS": "Ensaios Não Destrutivos",
            "QUALIFICAES": "Qualificações",
            "QUALIFICAÇÕES": "Qualificações",
            "CONTROLE DE DEFORMAES": "Controle de Deformações",
            "CONTROLE DE DEFORMAÇÕES": "Controle de Deformações",
            "DOCUMENTOS TCNICOS": "Documentos Técnicos",
            "DOCUMENTOS TÉCNICOS": "Documentos Técnicos",
            "PROTEO DA SOLDAGEM": "Proteção da Soldagem",
            "PROTEÇÃO DA SOLDAGEM": "Proteção da Soldagem"
        }
        
        if line.isupper() and len(line) > 5 and not line.isdigit():
            if line in VALID_SECTIONS:
                current_section = VALID_SECTIONS[line]
                continue
            
        q_match = q_start_pattern.match(line)
        if q_match:
            if current_question:
                questions.append(current_question)
                
            current_question = {
                "id": str(uuid.uuid4()),
                "section": current_section,
                "number": q_match.group(1),
                "statement": q_match.group(2) + " ",
                "options": [],
                "answer": None,
                "images": images_on_page
            }
            continue
            
        if current_question:
            opt_match = option_pattern.match(line)
            if opt_match:
                opt_letter = opt_match.group(1).upper()
                opt_text = opt_match.group(2)
                current_question["options"].append({
                    "id": str(uuid.uuid4()),
                    "letter": opt_letter,
                    "text": opt_text
                })
                continue
                
            ans_match = answer_pattern.match(line)
            if ans_match:
                current_question["answer"] = ans_match.group(1).upper()
                questions.append(current_question)
                current_question = None
                continue
                
            if len(current_question["options"]) > 0:
                current_question["options"][-1]["text"] += " " + line
            else:
                current_question["statement"] += line + " "

if current_question:
    questions.append(current_question)

valid_questions = []
for q in questions:
    if len(q["options"]) >= 2 and q["answer"]:
        valid_questions.append(q)

print(f"Extracted {len(valid_questions)} valid questions.")

with open(json_out_path, 'w', encoding='utf-8') as f:
    json.dump(valid_questions, f, ensure_ascii=False, indent=2)

with open(sql_out_path, 'w', encoding='utf-8') as f:
    f.write("-- Seed para Engenharia e Inspeção de Soldagem\n\n")
    f.write(f"INSERT INTO public.courses (id, engineering_area_id, title, description, difficulty, estimated_hours, is_published) VALUES\n")
    f.write(f"('{COURSE_ID}', 'e1111111-1111-1111-1111-111111111111', 'Engenharia e Inspeção de Soldagem', 'Curso completo baseado no Banco de Questões de Soldagem e Ensaios Não Destrutivos.', 'advanced', 40.0, true)\n")
    f.write("ON CONFLICT (id) DO NOTHING;\n\n")
    
    sections = list(set([q['section'] for q in valid_questions]))
    module_ids = {}
    
    for i, sec in enumerate(sections):
        mod_id = str(uuid.uuid4())
        module_ids[sec] = mod_id
        sec_title = sec.replace("'", "''")
        f.write(f"INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES\n")
        f.write(f"('{mod_id}', '{COURSE_ID}', '{sec_title}', 'Questões e atividades sobre {sec_title}', {i+1}, true)\n")
        f.write("ON CONFLICT DO NOTHING;\n\n")
        
        lesson_id = str(uuid.uuid4())
        f.write(f"INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES\n")
        f.write(f"('{lesson_id}', '{mod_id}', 'Prática - {sec_title[:30]}', 'Exercícios do banco.', 60, 1, 'interactive', true)\n")
        f.write("ON CONFLICT DO NOTHING;\n\n")
        
        sec_questions = [q for q in valid_questions if q['section'] == sec]
        for q_idx, q in enumerate(sec_questions):
            step_id = str(uuid.uuid4())
            f.write(f"INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES\n")
            f.write(f"('{step_id}', '{lesson_id}', 'activity', 'Questão {q['number']}', 'Resolva a questão', {q_idx+1})\n")
            f.write("ON CONFLICT DO NOTHING;\n\n")
            
            statement = q['statement'].replace("'", "''")
            if q['images']:
                img_markdown = "\\n\\n".join([f'<img src="/images/questions/{img}" width="100%" />' for img in q['images'][:2]])
                statement += f"\\n\\n{img_markdown}"
                
            f.write(f"INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES\n")
            f.write(f"('{q['id']}', '{lesson_id}', '{step_id}', 'multiple_choice', '{statement}', 'A alternativa correta é a letra {q['answer']}', 10, 1)\n")
            f.write("ON CONFLICT DO NOTHING;\n\n")
            
            for o_idx, opt in enumerate(q['options']):
                opt_text = opt['text'].replace("'", "''")
                is_correct = "true" if opt['letter'] == q['answer'] else "false"
                f.write(f"INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES\n")
                f.write(f"('{opt['id']}', '{q['id']}', '{opt['letter']}) {opt_text}', {is_correct}, {o_idx+1})\n")
                f.write("ON CONFLICT DO NOTHING;\n\n")

print(f"SQL file saved to {sql_out_path}")
