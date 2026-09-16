import os
import re

def fix_files(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    # If Powershell changed encoding to ANSI/UTF-16
                    with open(path, 'r') as f:
                        content = f.read()
                
                # Regex to fix mismatched quotes: `http://${window...}:8000/path' -> `http://${window...}:8000/path`
                new_content = re.sub(
                    r"`http://\$\{window\.location\.hostname\}:8000([^'\"`\n]*?)['\"]", 
                    r"`http://${window.location.hostname}:8000\1`", 
                    content
                )
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {path}")

fix_files('public')
