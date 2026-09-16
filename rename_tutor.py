import os
files = ['index.html', 'public/app.js', 'public/js/modals.js']
for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        content = content.replace('Tutor IA Socrático', 'Professor')
        content = content.replace('Tutor Socrático', 'Professor')
        content = content.replace('Tutor', 'Professor')
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
