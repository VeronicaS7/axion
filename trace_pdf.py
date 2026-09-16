import fitz
import re

pdf_path = r"C:\Users\Veronica\Desktop\Axion\arquivos\668910950-Caderno-de-exerci-cios-N1.pdf"
doc = fitz.open(pdf_path)
page = doc.load_page(0)
lines = page.get_text("text").split('\n')

q_start_pattern = re.compile(r'^(\d+)\s*.\s*(.+)', re.DOTALL)
option_pattern = re.compile(r'^\s*\(([a-z])\)\s*(.+)', re.IGNORECASE)
answer_pattern = re.compile(r'^RESPOSTA:\s*([A-Z])', re.IGNORECASE)

print("Tracing page 0:")
for line in lines:
    line = line.strip()
    if not line: continue
    
    if q_start_pattern.match(line):
        print(f"QUESTION START: {line}")
    elif option_pattern.match(line):
        print(f"OPTION: {line}")
    elif answer_pattern.match(line):
        print(f"ANSWER: {line}")
    else:
        print(f"TEXT: {line}")
