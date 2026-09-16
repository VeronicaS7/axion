import re

with open(r'C:\Users\Veronica\Desktop\Axion\public\app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace parseMarkdown
new_parse_markdown = """parseMarkdown(text) {
    if (!text) return "";
    if (typeof marked !== "undefined") {
      return marked.parse(text);
    }
    // Fallback if marked is somehow missing
    let html = text;
    html = html.replace(/\\n/g, "<br>");
    html = html.replace(/\\*\\*(.*?)\\*\\*/g, "<strong>$1</strong>");
    html = html.replace(/\\*(.*?)\\*/g, "<em>$1</em>");
    html = html.replace(/### (.*?)($|<br>)/g, "<h3>$1</h3>");
    html = html.replace(/## (.*?)($|<br>)/g, "<h2>$1</h2>");
    html = html.replace(/# (.*?)($|<br>)/g, "<h1>$1</h1>");
    return html;
  }"""
content = re.sub(r'parseMarkdown\s*\([^)]*\)\s*\{[^}]*\}', new_parse_markdown, content, count=1)


# 2. Replace renderActivity
new_render_activity = """function renderActivity(activity) {
  if (!activity) {
    return `<div class="activity-card empty"><p>Esta atividade ainda não foi carregada.</p></div>`;
  }
  const options = activity.options || activity.activity_options || [];
  const imageHtml = activity.image_path ? `
    <div class="exercise-image-container" style="text-align: center;">
      <img src="${activity.image_path}" alt="Figura da Questão" />
    </div>
  ` : '';
  
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  return `
    <div class="activity-card">
      <div class="exercise-statement">${activity.statement}</div>
      ${imageHtml}
      <div class="exercise-options-container">
        ${options.map((option, index) => `
          <div class="alt-card" id="btn-opt-${option.id}" data-activity-id="${activity.id}" data-option-id="${option.id}">
            <span class="alt-letter">${letters[index] || ''}</span>
            <span class="alt-text">${option.text || option.content || option.value}</span>
          </div>
        `).join("")}
      </div>
      <div id="activity-feedback-${activity.id}" class="activity-feedback" style="margin-top: 20px;"></div>
    </div>
  `;
}"""
content = re.sub(r'function renderActivity\([^)]*\)\s*\{[\s\S]*?(?=\nfunction |\nclass |\Z)', new_render_activity + '\n', content, count=1)


# 3. Replace bindActivityOptionEvents
new_bind_events = """function bindActivityOptionEvents() {
  document.querySelectorAll('.alt-card').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";
    btn.addEventListener('click', (e) => {
      // Allow re-answering or clicking? The user requirement says "NUNCA bloquear a progressão"
      // If we disable clicking after one try, they just click continue. We will disable other options.
      if (btn.parentElement.dataset.answered === "true") return;
      btn.parentElement.dataset.answered = "true";
      
      document.querySelectorAll('.alt-card').forEach(b => b.style.pointerEvents = 'none');
      
      const activityId = e.currentTarget.getAttribute('data-activity-id');
      const optionId = e.currentTarget.getAttribute('data-option-id');
      checkActivityAnswer(activityId, optionId);
    });
  });
}"""
content = re.sub(r'function bindActivityOptionEvents\([^)]*\)\s*\{[\s\S]*?(?=\nfunction |\nclass |\Z)', new_bind_events + '\n', content, count=1)


# 4. Replace checkActivityAnswer
new_check_answer = """function checkActivityAnswer(activityId, optionId) {
  const activity = window.currentActivities?.[activityId];
  if (!activity) return;
  const options = activity.options || activity.activity_options || [];
  const option = options.find(item => item.id === optionId);
  const feedbackBox = document.getElementById(`activity-feedback-${activityId}`);
  if (!feedbackBox || !option) return;

  const selectedBtn = document.getElementById(`btn-opt-${optionId}`);
  if (selectedBtn) {
    selectedBtn.classList.add("selected");
    if (option.is_correct) {
      selectedBtn.classList.add("correct");
    } else {
      selectedBtn.classList.add("incorrect");
    }
  }

  // Show Primary Action Button regardless of correctness
  const btnPrimary = document.getElementById("btn-lesson-primary-action");
  if (btnPrimary) {
    btnPrimary.style.display = "inline-flex";
    const textSpan = document.getElementById("btn-lesson-primary-action-text");
    if (textSpan) textSpan.textContent = "Continuar";
    const iconSpan = document.getElementById("btn-lesson-primary-action-icon");
    if (iconSpan) iconSpan.setAttribute("data-lucide", "arrow-right");
  }
  
  // Also show Hint & Professor buttons (if they exist)
  const btnHint = document.getElementById("btn-lesson-hint");
  if (btnHint) {
      btnHint.style.display = "inline-flex";
      // Ensure we bind the question ID to hint and professor
      btnHint.dataset.questionId = activity.id;
  }
  const btnTutor = document.getElementById("btn-open-lesson-tutor");
  if (btnTutor) {
      btnTutor.dataset.questionId = activity.id;
      btnTutor.dataset.optionId = optionId;
      btnTutor.style.display = "inline-flex";
  }

  if (option.is_correct) {
    feedbackBox.innerHTML = `
      <div class="feedback-sheet correct">
        <strong style="color: var(--success); font-size: 1.1rem;"><i data-lucide="check-circle"></i> Correto!</strong>
        <div class="feedback-explanation-box">${option.feedback || activity.explanation || "Muito bem, você acertou!"}</div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  } else {
    feedbackBox.innerHTML = `
      <div class="feedback-sheet incorrect">
        <strong style="color: var(--error); font-size: 1.1rem;"><i data-lucide="x-circle"></i> Não é essa.</strong>
        <div class="feedback-explanation-box">
          <p>Vamos revisar o conceito relacionado antes de seguir.</p>
          <p style="margin-top: 8px; font-size: 0.9em; color: var(--text-secondary);">Utilize a Dica ou o Professor acima se precisar de ajuda para entender.</p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
  
  if (window.updateLearningState) updateLearningState(activity, option);
}"""
content = re.sub(r'function checkActivityAnswer\([^)]*\)\s*\{[\s\S]*?(?=\nfunction |\nclass |\Z)', new_check_answer + '\n', content, count=1)


with open(r'C:\Users\Veronica\Desktop\Axion\public\app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced functions in app.js")
