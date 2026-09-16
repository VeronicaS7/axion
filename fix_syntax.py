with open(r'C:\Users\Veronica\Desktop\Axion\backend_api.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the literal characters back to actual newlines
content = content.replace('\\n\\nif __name__ == "__main__":', '\\n\\nif __name__ == "__main__":')

with open(r'C:\Users\Veronica\Desktop\Axion\backend_api.py', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed syntax")
