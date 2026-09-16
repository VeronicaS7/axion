import json
import uuid

json_path = r"C:\Users\Veronica\Desktop\Axion\questions_catalog.json"
tracker_path = r"C:\Users\Veronica\Desktop\Axion\public\js\tracker.js"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

COURSE_ID = "c5555555-5555-5555-5555-555555555555"

# Build the JS structure
sections = list(set([q['section'] for q in questions]))
module_ids = {}

js_code = """
// ==========================================
// OFFLINE WELDING DATA INJECTION (AUTO-GENERATED)
// ==========================================
if (window.CONFIG && window.CONFIG.isDemoMode) {
    console.log("[Axion] Injetando Banco de Questões de Soldagem no modo Demo...");

    STATIC_COURSES.push({
        id: "c5555555-5555-5555-5555-555555555555",
        title: "Inspetor de Soldagem e Qualidade",
        description: "Curso completo baseado no Banco de Questões de Soldagem e Ensaios Não Destrutivos.",
        difficulty: "advanced",
        estimated_hours: 40,
        is_published: true
    });
"""

for i, sec in enumerate(sections):
    mod_id = str(uuid.uuid4())
    module_ids[sec] = mod_id
    sec_title = sec.replace('"', '\\"').replace('\n', ' ')
    
    js_code += f"""
    STATIC_MODULES.push({{
        id: "{mod_id}",
        course_id: "{COURSE_ID}",
        title: "{sec_title}",
        description: "Questões e atividades sobre {sec_title}",
        position: {i+1},
        is_published: true
    }});
"""
    
    lesson_id = str(uuid.uuid4())
    js_code += f"""
    STATIC_LESSONS.push({{
        id: "{lesson_id}",
        module_id: "{mod_id}",
        title: "Prática - {sec_title[:30]}",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    }});
    
    if (!STATIC_LESSON_STEPS["{lesson_id}"]) {{
        STATIC_LESSON_STEPS["{lesson_id}"] = [];
    }}
"""
    
    sec_questions = [q for q in questions if q['section'] == sec]
    for q_idx, q in enumerate(sec_questions):
        step_id = str(uuid.uuid4())
        act_id = q['id']
        
        statement = q['statement'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        
        if q['images']:
            img_markdown = "\\n\\n".join([f'<img src=\\"/images/questions/{img}\\" style=\\"max-width:100%; border-radius: 8px; margin-top: 10px;\\" />' for img in q['images'][:2]])
            statement += f"\\n\\n{img_markdown}"
            
        options_json = []
        for o_idx, opt in enumerate(q['options']):
            opt_text = opt['text'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
            is_correct = "true" if opt['letter'] == q['answer'] else "false"
            feedback = f"Correto! A alternativa correta é a letra {q['answer']}." if opt['letter'] == q['answer'] else f"Incorreto. A alternativa correta era a letra {q['answer']}."
            options_json.append(f"""{{ id: "{opt['id']}", content: "{opt['letter']}) {opt_text}", is_correct: {is_correct}, feedback: "{feedback}", position: {o_idx+1} }}""")
            
        opts_str = "[\n            " + ",\n            ".join(options_json) + "\n        ]"
        
        js_code += f"""
    STATIC_LESSON_STEPS["{lesson_id}"].push({{
        id: "{step_id}",
        lesson_id: "{lesson_id}",
        step_type: "activity",
        title: "Questão {q['number']}",
        content: "Resolva a questão abaixo.",
        position: {q_idx+1},
        activity: {{
            id: "{act_id}",
            activity_type: "multiple_choice",
            statement: "{statement}",
            explanation: "A alternativa correta é a letra {q['answer']}.",
            options: {opts_str}
        }}
    }});
"""

js_code += """
}
"""

with open(tracker_path, 'a', encoding='utf-8') as f:
    f.write(js_code)

print("Data successfully injected into tracker.js")
