with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<!-- Modals for Redesigned Player -->', '<script src="public/js/modals.js"></script>\n  <!-- Modals for Redesigned Player -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("index.html patched with modals.js")
