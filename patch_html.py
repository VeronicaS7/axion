import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Tutor IA Socrático', 'Professor')
content = content.replace('Tutor IA', 'Professor')
content = content.replace('<!-- Estilos Globais -->', '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>\n  <!-- Estilos Globais -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched index.html")
