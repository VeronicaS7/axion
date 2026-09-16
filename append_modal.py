html_modals = """
  <!-- Modals for Redesigned Player -->
  <div class="modal-overlay" id="hint-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title"><i data-lucide="lightbulb" style="color: var(--warning);"></i> Dica Pedagógica</h3>
        <button class="btn-close-modal" id="btn-close-hint"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body" id="hint-modal-text">
        Carregando dica...
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="teacher-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title"><i data-lucide="bot" style="color: var(--primary);"></i> Professor</h3>
        <button class="btn-close-modal" id="btn-close-teacher"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body" id="teacher-modal-text">
        Analisando sua resposta...
      </div>
    </div>
  </div>
</body>
"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('</body>', html_modals)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Modals appended.")
