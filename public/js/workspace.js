// public/js/workspace.js

class WorkspaceManager {
  constructor() {
    this.timerInterval = null;
    this.timerSeconds = 0;
    this.todayTotalSeconds = 0;
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.selectedDate = new Date().toISOString().split('T')[0];
  }

  getUserId() {
    return (window.Auth && window.Auth.getCurrentUser()) ? window.Auth.getCurrentUser().id : "guest";
  }

  getStorageKey(key) {
    return `axion_ws_${this.getUserId()}_${key}`;
  }

  // --- PERSISTENCE ---
  loadData(key, defaultVal) {
    const raw = localStorage.getItem(this.getStorageKey(key));
    return raw ? JSON.parse(raw) : defaultVal;
  }
  saveData(key, data) {
    localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
  }

  // --- INIT ---
  init() {
    console.log("[Workspace] Initializing...");
    
    // Bind Tabs
    document.querySelectorAll(".ws-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".ws-tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".ws-tab-pane").forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const paneId = e.currentTarget.getAttribute("data-tab");
        const pane = document.getElementById(paneId);
        if (pane) pane.classList.add("active");
      });
    });

    this.initJournal();
    this.initTasks();
    this.initCalendar();
    this.initTimer();
    this.initBackgroundCustomizer();
  }

  // --- JOURNAL ---
  initJournal() {
    this.renderJournal();
    const addBtn = document.getElementById("ws-journal-add");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const titleEl = document.getElementById("ws-journal-title");
        const textEl = document.getElementById("ws-journal-text");
        if (titleEl && textEl && titleEl.value.trim() && textEl.value.trim()) {
          this.aiAddJournal(titleEl.value.trim(), textEl.value.trim(), "user");
          titleEl.value = "";
          textEl.value = "";
        }
      });
    }

    // AI Summary Button
    const listContainer = document.getElementById("ws-journal-list");
    if (listContainer) {
      let aiBtn = document.getElementById("btn-ai-journal-summary");
      if (!aiBtn) {
        aiBtn = document.createElement("button");
        aiBtn.id = "btn-ai-journal-summary";
        aiBtn.className = "btn-primary";
        aiBtn.style.cssText = "margin-bottom: 16px; width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px;";
        aiBtn.innerHTML = `<i data-lucide="sparkles"></i> Resumir com IA (Flashcards)`;
        listContainer.parentNode.insertBefore(aiBtn, listContainer);

        const summaryContainer = document.createElement("div");
        summaryContainer.id = "journal-ai-summary-result";
        summaryContainer.style.cssText = "margin-bottom: 16px; display: none; padding: 16px; background: var(--bg-surface-elevated); border: 1px solid var(--accent-cyan); border-radius: var(--radius-md); font-size: 13px; color: var(--text-primary);";
        listContainer.parentNode.insertBefore(summaryContainer, listContainer);

        aiBtn.addEventListener("click", async () => {
          const journals = this.loadData("journal", []);
          if (journals.length === 0) {
            summaryContainer.style.display = "block";
            summaryContainer.innerHTML = "<p style='color: var(--warning);'>Adicione anotações primeiro para gerar um resumo.</p>";
            return;
          }

          aiBtn.innerHTML = `<i data-lucide="loader"></i> Gerando Resumo...`;
          aiBtn.disabled = true;
          summaryContainer.style.display = "block";
          summaryContainer.innerHTML = "<p>Analisando anotações com NLP...</p>";

          try {
            const notesText = journals.map(j => `${j.title}: ${j.text}`);
            const response = await fetch(`http://${window.location.hostname}:8000/ai-summary/journal`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ notes: notesText })
            });

            if (response.ok) {
              const data = await response.json();
              
              // Convert markdown list to HTML
              const formattedSummary = data.summary
                .split('\n')
                .filter(line => line.trim())
                .map(line => {
                  if (line.startsWith('-') || line.startsWith('*')) {
                    return `<li style="margin-bottom: 8px;">${line.substring(1).trim()}</li>`;
                  }
                  return `<p style="margin-bottom: 8px;"><strong>${line}</strong></p>`;
                })
                .join('');

              summaryContainer.innerHTML = `
                <h4 style="color: var(--accent-cyan); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                  <i data-lucide="brain"></i> Flashcards / Resumo
                </h4>
                <ul style="padding-left: 20px;">${formattedSummary}</ul>
              `;
              if (window.lucide) window.lucide.createIcons();
            } else {
              summaryContainer.innerHTML = "<p style='color: var(--error);'>Erro ao gerar resumo.</p>";
            }
          } catch (e) {
            summaryContainer.innerHTML = "<p style='color: var(--error);'>Servidor indisponível.</p>";
          } finally {
            aiBtn.innerHTML = `<i data-lucide="sparkles"></i> Resumir com IA (Flashcards)`;
            aiBtn.disabled = false;
            if (window.lucide) window.lucide.createIcons();
          }
        });
      }
    }
  }
  
  aiAddJournal(title, text, source="ia") {
    const journals = this.loadData("journal", []);
    journals.push({
      id: Date.now().toString(),
      title,
      text,
      date: new Date().toISOString(),
      source
    });
    this.saveData("journal", journals);
    this.renderJournal();
  }

  deleteJournal(id) {
    let journals = this.loadData("journal", []);
    journals = journals.filter(j => j.id !== id);
    this.saveData("journal", journals);
    this.renderJournal();
  }

  renderJournal() {
    const list = document.getElementById("ws-journal-list");
    if (!list) return;
    const journals = this.loadData("journal", []).sort((a,b) => new Date(b.date) - new Date(a.date));
    list.innerHTML = journals.length ? "" : "<p style='color: var(--text-muted); font-size: 13px;'>Nenhuma anotação no diário ainda.</p>";
    
    journals.forEach(j => {
      const d = new Date(j.date).toLocaleString('pt-BR');
      const tag = j.source === "ia" ? `<span class="ws-tag-ia" style="font-size:10px; background:var(--bg-secondary); padding:2px 6px; border-radius:4px; margin-left:8px; color:var(--axion-cyan);">via Tutor IA</span>` : "";
      
      const el = document.createElement("div");
      el.style.cssText = "padding: 12px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 8px;";
      el.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <h4 style="font-size: 14px; margin: 0 0 4px 0;">${j.title}${tag}</h4>
            <p style="font-size: 11px; color: var(--text-muted); margin: 0 0 8px 0;">${d}</p>
          </div>
          <button class="btn-delete-journal" data-id="${j.id}" style="background:transparent; border:none; color:var(--error); cursor:pointer;"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); margin: 0;">${j.text}</p>
      `;
      list.appendChild(el);
    });
    if(window.lucide) window.lucide.createIcons();
    
    document.querySelectorAll(".btn-delete-journal").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.deleteJournal(e.currentTarget.getAttribute("data-id"));
      });
    });
  }

  // --- TASKS ---
  initTasks() {
    this.currentTaskFilter = 'all';
    this.renderTasks();

    const addBtn = document.getElementById("ws-task-add");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const textEl = document.getElementById("ws-task-text");
        const dateEl = document.getElementById("ws-task-date");
        const prioEl = document.getElementById("ws-task-priority");
        if (textEl && textEl.value.trim()) {
          this.aiAddTask(textEl.value.trim(), dateEl.value || null, prioEl.value, "user");
          textEl.value = "";
          dateEl.value = "";
          prioEl.value = "media";
        }
      });
    }

    const filters = document.getElementById("ws-task-filters");
    if (filters) {
      filters.addEventListener("change", (e) => {
        this.currentTaskFilter = e.target.value;
        this.renderTasks();
      });
    }
  }

  aiAddTask(text, dueDateStr, priority="media", source="ia") {
    const tasks = this.loadData("tasks", []);
    tasks.push({
      id: Date.now().toString(),
      text,
      dueDate: dueDateStr,
      priority,
      completed: false,
      source
    });
    this.saveData("tasks", tasks);
    this.renderTasks();
  }

  deleteTask(id) {
    let tasks = this.loadData("tasks", []);
    tasks = tasks.filter(t => t.id !== id);
    this.saveData("tasks", tasks);
    this.renderTasks();
  }

  toggleTask(id, completed) {
    let tasks = this.loadData("tasks", []);
    const t = tasks.find(t => t.id === id);
    if(t) t.completed = completed;
    this.saveData("tasks", tasks);
    this.renderTasks();
  }

  renderTasks() {
    const list = document.getElementById("ws-task-list");
    if (!list) return;
    let tasks = this.loadData("tasks", []);
    
    if (this.currentTaskFilter === "pending") tasks = tasks.filter(t => !t.completed);
    else if (this.currentTaskFilter === "completed") tasks = tasks.filter(t => t.completed);

    list.innerHTML = tasks.length ? "" : "<p style='color: var(--text-muted); font-size: 13px;'>Nenhuma tarefa encontrada.</p>";
    
    tasks.forEach(t => {
      const tag = t.source === "ia" ? `<span class="ws-tag-ia" style="font-size:10px; background:var(--bg-secondary); padding:2px 6px; border-radius:4px; margin-left:8px; color:var(--axion-cyan);">via Tutor IA</span>` : "";
      const prioColor = t.priority === 'alta' ? 'var(--error)' : (t.priority === 'baixa' ? 'var(--success)' : 'var(--warning)');
      const dateText = t.dueDate ? `<span style="font-size:11px; margin-left: 8px; color: var(--text-muted);"><i data-lucide="calendar" style="width:10px; height:10px;"></i> ${t.dueDate}</span>` : "";
      
      const el = document.createElement("div");
      el.style.cssText = `padding: 10px 12px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; border-left: 3px solid ${prioColor};`;
      el.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" class="task-checkbox" data-id="${t.id}" ${t.completed ? 'checked' : ''} style="cursor: pointer;">
          <div>
            <span style="font-size: 13px; color: ${t.completed ? 'var(--text-muted)' : 'var(--text-primary)'}; text-decoration: ${t.completed ? 'line-through' : 'none'};">${t.text}</span>
            ${tag}
            ${dateText}
          </div>
        </div>
        <button class="btn-delete-task" data-id="${t.id}" style="background:transparent; border:none; color:var(--error); cursor:pointer;"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>
      `;
      list.appendChild(el);
    });
    if(window.lucide) window.lucide.createIcons();

    document.querySelectorAll(".task-checkbox").forEach(chk => {
      chk.addEventListener("change", (e) => {
        this.toggleTask(e.currentTarget.getAttribute("data-id"), e.currentTarget.checked);
      });
    });
    document.querySelectorAll(".btn-delete-task").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.deleteTask(e.currentTarget.getAttribute("data-id"));
      });
    });
  }

  // --- CALENDAR ---
  initCalendar() {
    this.renderCalendarGrid();
    this.renderSelectedDayEvents();

    const prev = document.getElementById("ws-cal-prev");
    const next = document.getElementById("ws-cal-next");
    if(prev) prev.addEventListener("click", () => { this.currentMonth--; if(this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; } this.renderCalendarGrid(); });
    if(next) next.addEventListener("click", () => { this.currentMonth++; if(this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; } this.renderCalendarGrid(); });

    const addBtn = document.getElementById("ws-cal-event-add");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const titleEl = document.getElementById("ws-cal-event-title");
        if (titleEl && titleEl.value.trim()) {
          this.aiAddEvent(this.selectedDate, titleEl.value.trim(), "Adicionado manualmente", "user");
          titleEl.value = "";
        }
      });
    }

    const exportBtn = document.getElementById("ws-cal-export");
    if(exportBtn) exportBtn.addEventListener("click", () => this.exportICS());
  }

  renderCalendarGrid() {
    const grid = document.getElementById("ws-cal-grid");
    const label = document.getElementById("ws-cal-month-label");
    if(!grid || !label) return;

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    label.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

    grid.innerHTML = "";
    
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(this.currentYear, this.currentMonth, 1).getDay();

    const events = this.loadData("events", []);

    for (let i = 0; i < firstDayIndex; i++) {
      grid.appendChild(document.createElement("div"));
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${this.currentYear}-${String(this.currentMonth+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
      const dayEl = document.createElement("div");
      dayEl.className = "ws-cal-day" + (dateStr === this.selectedDate ? " selected" : "");
      dayEl.style.cssText = `padding: 4px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); cursor: pointer; min-height: 40px; text-align: center; position: relative; background: ${dateStr === this.selectedDate ? 'var(--bg-secondary)' : 'var(--bg-primary)'}; transition: 0.2s;`;
      
      const dayNum = document.createElement("span");
      dayNum.textContent = i;
      dayNum.style.fontSize = "12px";
      dayEl.appendChild(dayNum);

      const dayEvents = events.filter(e => e.date === dateStr);
      if (dayEvents.length > 0) {
        const dot = document.createElement("div");
        dot.style.cssText = "width:6px; height:6px; background:var(--axion-cyan); border-radius:50%; margin: 2px auto 0;";
        dayEl.appendChild(dot);
      }

      dayEl.addEventListener("click", () => {
        this.selectedDate = dateStr;
        this.renderCalendarGrid();
        this.renderSelectedDayEvents();
      });

      grid.appendChild(dayEl);
    }
  }

  renderSelectedDayEvents() {
    const list = document.getElementById("ws-cal-day-events");
    if (!list) return;
    
    let events = this.loadData("events", []).filter(e => e.date === this.selectedDate);
    list.innerHTML = events.length ? "" : "<p style='color: var(--text-muted); font-size: 12px; margin-top: 10px;'>Sem lembretes para este dia.</p>";

    events.forEach(e => {
      const tag = e.source === "ia" ? `<span class="ws-tag-ia" style="font-size:10px; background:rgba(0,255,255,0.1); padding:2px 4px; border-radius:4px; margin-left:6px; color:var(--axion-cyan);">IA</span>` : "";
      const el = document.createElement("div");
      el.style.cssText = "padding: 8px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-top: 6px; display: flex; justify-content: space-between; align-items: center;";
      el.innerHTML = `
        <div style="font-size: 13px;">${e.title}${tag}</div>
        <button class="btn-delete-event" data-id="${e.id}" style="background:transparent; border:none; color:var(--error); cursor:pointer;"><i data-lucide="trash-2" style="width:12px; height:12px;"></i></button>
      `;
      list.appendChild(el);
    });
    if(window.lucide) window.lucide.createIcons();

    document.querySelectorAll(".btn-delete-event").forEach(btn => {
      btn.addEventListener("click", (ev) => {
        this.aiRemoveEvent(ev.currentTarget.getAttribute("data-id"));
      });
    });
  }

  aiAddEvent(dateStr, title, note="", source="ia") {
    const events = this.loadData("events", []);
    events.push({
      id: Date.now().toString(),
      date: dateStr,
      title,
      note,
      source
    });
    this.saveData("events", events);
    
    this.renderCalendarGrid();
    if(this.selectedDate === dateStr) this.renderSelectedDayEvents();
  }

  aiRemoveEvent(id) {
    let events = this.loadData("events", []);
    events = events.filter(e => e.id !== id);
    this.saveData("events", events);
    this.renderCalendarGrid();
    this.renderSelectedDayEvents();
  }
  
  aiListEvents(dateStr) {
    let events = this.loadData("events", []);
    if(dateStr) events = events.filter(e => e.date === dateStr);
    return events;
  }

  exportICS() {
    const events = this.loadData("events", []);
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Axion Academy//Workspace//PT\n";
    events.forEach(e => {
      const dateParts = e.date.split('-');
      if(dateParts.length !== 3) return;
      const dateString = `${dateParts[0]}${dateParts[1]}${dateParts[2]}`;
      icsContent += `BEGIN:VEVENT\nDTSTART;VALUE=DATE:${dateString}\nDTEND;VALUE=DATE:${dateString}\nSUMMARY:${e.title}\nDESCRIPTION:${e.note || ""}\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "axion_lembretes.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- TIMER ---
  initTimer() {
    this.todayTotalSeconds = this.loadData("timerTotal_" + new Date().toISOString().split('T')[0], 0);
    this.updateTimerDisplay();
    this.updateTimerTotalDisplay();

    const toggle = document.getElementById("ws-timer-toggle");
    const reset = document.getElementById("ws-timer-reset");
    
    if(toggle) toggle.addEventListener("click", () => {
      if(this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        toggle.innerHTML = `<i data-lucide="play"></i> Iniciar`;
      } else {
        this.timerInterval = setInterval(() => {
          this.timerSeconds++;
          this.todayTotalSeconds++;
          this.updateTimerDisplay();
          this.saveData("timerTotal_" + new Date().toISOString().split('T')[0], this.todayTotalSeconds);
          if(this.timerSeconds % 60 === 0) this.updateTimerTotalDisplay();
        }, 1000);
        toggle.innerHTML = `<i data-lucide="pause"></i> Pausar`;
      }
      if(window.lucide) window.lucide.createIcons();
    });

    if(reset) reset.addEventListener("click", () => {
      if(this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        toggle.innerHTML = `<i data-lucide="play"></i> Iniciar`;
        if(window.lucide) window.lucide.createIcons();
      }
      this.timerSeconds = 0;
      this.updateTimerDisplay();
    });
  }

  updateTimerDisplay() {
    const disp = document.getElementById("ws-timer-display");
    if(!disp) return;
    const h = String(Math.floor(this.timerSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((this.timerSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(this.timerSeconds % 60).padStart(2, '0');
    disp.textContent = `${h}:${m}:${s}`;
  }

  updateTimerTotalDisplay() {
    const total = document.getElementById("ws-timer-today-total");
    if(total) {
      const m = Math.floor(this.todayTotalSeconds / 60);
      total.textContent = `${m} min hoje`;
    }
  }

  // --- BACKGROUND CUSTOMIZER ---
  initBackgroundCustomizer() {
    const bgVal = this.loadData("bgCustom", "");
    const target = document.getElementById("profile-bg-target");
    if(target && bgVal) target.style.background = bgVal;

    const btn = document.getElementById("btn-ws-customize-bg");
    if(!btn) return;
    
    const picker = document.createElement("div");
    picker.className = "ws-bg-picker";
    picker.style.cssText = "display:none; position:absolute; right:20px; top:120px; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:10px; z-index:100; display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;";
    
    const colors = [
      "linear-gradient(135deg, #FF6B6B, #FF8E53)",
      "linear-gradient(135deg, #4facfe, #00f2fe)",
      "linear-gradient(135deg, #43e97b, #38f9d7)",
      "linear-gradient(135deg, #fa709a, #fee140)",
      "linear-gradient(135deg, #30cfd0, #330867)",
      "#121212"
    ];

    colors.forEach(c => {
      const s = document.createElement("div");
      s.className = "ws-bg-swatch";
      s.style.cssText = `width:30px; height:30px; border-radius:50%; background:${c}; cursor:pointer; border:2px solid transparent;`;
      s.addEventListener("click", () => {
        if(target) target.style.background = c;
        this.saveData("bgCustom", c);
        picker.style.display = "none";
      });
      picker.appendChild(s);
    });

    btn.parentNode.appendChild(picker);
    picker.style.display = "none";

    btn.addEventListener("click", (e) => {
      picker.style.display = picker.style.display === "none" ? "grid" : "none";
      e.stopPropagation();
    });
    document.addEventListener("click", (e) => {
      if(!picker.contains(e.target) && e.target !== btn) {
        picker.style.display = "none";
      }
    });
  }

  // --- NLP INTERPRETER ---
  tryHandleCommand(rawText) {
    const text = rawText.toLowerCase();

    let m = text.match(/lembrete\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?|\w+):\s+(.*)/i);
    if(m) {
      let dateStr = this.parseDatePt(m[1]);
      if(!dateStr) dateStr = this.selectedDate;
      this.aiAddEvent(dateStr, m[2].trim(), "", "ia");
      return `Lembrete adicionado para ${dateStr.split('-').reverse().join('/')}: "${m[2].trim()}". Posso ajudar com mais algo?`;
    }

    m = text.match(/tarefa:\s+(.*?)(?:\s+at[eé]\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?))?$/i);
    if(m) {
      let dateStr = m[2] ? this.parseDatePt(m[2]) : "";
      this.aiAddTask(m[1].trim(), dateStr, "media", "ia");
      const dataMsg = dateStr ? ` (prazo: ${dateStr.split('-').reverse().join('/')})` : "";
      return `Tarefa adicionada: "${m[1].trim()}"${dataMsg}. Acompanhe na aba Tarefas!`;
    }

    m = text.match(/anota no di[aá]rio:\s+(.*)/i);
    if(m) {
      this.aiAddJournal("Nota via Chat", m[1].trim(), "ia");
      return `Anotação salva no diário. Que mais quer explorar?`;
    }

    return null;
  }

  parseDatePt(str) {
    const today = new Date();
    if(str.includes("hoje")) return today.toISOString().split('T')[0];
    if(str.includes("amanhã") || str.includes("amanha")) {
      today.setDate(today.getDate() + 1);
      return today.toISOString().split('T')[0];
    }
    const parts = str.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
    if(parts) {
      const d = parts[1].padStart(2, '0');
      const m = parts[2].padStart(2, '0');
      let y = parts[3] ? (parts[3].length === 2 ? `20${parts[3]}` : parts[3]) : String(today.getFullYear());
      return `${y}-${m}-${d}`;
    }
    return null;
  }
}

window.AxionWorkspace = new WorkspaceManager();
