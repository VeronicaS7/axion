// public/js/dashboard/calendar.js
class DashCalendar {
  constructor() {
    this.grid = document.getElementById('dash-cal-grid');
    this.accordionsContainer = document.querySelector('.cal-accordions');
    
    // Mock de tarefas completadas
    this.completedTasks = {
      "9": [{text: "Qualificação de procedimento com pré-aquecimento 150ºC", type: "manual"}],
      "17": [{text: "Revisão ASME Sec VIII", type: "manual"}, {text: "Ensaio Visual", type: "manual"}],
      "22": [{text: "Martensita", type: "manual"}]
    };

    this.init();
  }

  init() {
    if (!this.grid) return;
    this.render();

    // Exportar função global para outros scripts
    if (!window.AxionWorkspace) window.AxionWorkspace = {};
    window.AxionWorkspace.aiAddEvent = (dia, texto, options) => {
      if(!this.completedTasks[dia]) this.completedTasks[dia] = [];
      this.completedTasks[dia].push({text: texto, type: options?.tipo || 'manual'});
      this.render();
      this.updatePanel(dia);
    };
  }

  render() {
    this.grid.innerHTML = '';
    const today = Math.floor(new Date().getDate());
    
    // Grid deve ter template-columns: repeat(7, 1fr) (via CSS)
    this.grid.style.display = 'grid';
    this.grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    this.grid.style.gap = '5px';
    
    for (let i = 1; i <= 31; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.style.padding = "5px";
      dayDiv.style.border = "1px solid rgba(255,255,255,0.05)";
      dayDiv.style.borderRadius = "4px";
      dayDiv.style.minHeight = "45px";
      dayDiv.style.fontSize = "11px";
      dayDiv.style.background = "rgba(0,0,0,0.1)";
      dayDiv.style.cursor = "pointer";
      dayDiv.style.transition = "0.2s";
      dayDiv.style.display = "flex";
      dayDiv.style.flexDirection = "column";
      dayDiv.style.alignItems = "center";
      
      const num = document.createElement('span');
      num.innerText = i;
      dayDiv.appendChild(num);

      // Se é hoje
      if (i === today) {
        dayDiv.style.background = "rgba(255,255,255,0.2)";
        num.style.fontWeight = "bold";
      }

      // Densidade de eventos
      if (this.completedTasks[i]) {
        const dotContainer = document.createElement('div');
        dotContainer.style.display = 'flex';
        dotContainer.style.gap = '2px';
        dotContainer.style.marginTop = 'auto';

        const maxDots = Math.min(this.completedTasks[i].length, 3);
        for(let d=0; d<maxDots; d++){
           const dot = document.createElement('div');
           dot.className = 'cal-dot';
           // Cor diferente para eventos do sistema (auto)
           if (this.completedTasks[i][d].type === 'auto') {
             dot.style.background = 'var(--axion-violet)'; 
           }
           dotContainer.appendChild(dot);
        }
        dayDiv.appendChild(dotContainer);
      }

      // Hover
      dayDiv.addEventListener('mouseenter', () => {
        dayDiv.style.background = "rgba(255,255,255,0.15)";
      });
      dayDiv.addEventListener('mouseleave', () => {
        dayDiv.style.background = i === today ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
      });

      // Click
      dayDiv.addEventListener('click', () => {
        this.updatePanel(i);
        
        // Sugestão de IA (mock)
        const unassignedTasks = 2; // mock
        const suggest = confirm(`Dia ${i}: Você tem ${unassignedTasks} tarefas sem data. Deseja movê-las para este dia? \n(Cancelar para adicionar evento manual)`);
        
        if (suggest) {
          window.AxionWorkspace.aiAddEvent(i, "Tarefas realocadas da To-Do List", {tipo: 'auto'});
        } else {
           const type = prompt("Tipo (Estudo, Lembrete, Prova):", "Lembrete");
           if (type) {
             const task = prompt(`Descrição para o ${type}:`);
             if (task) {
               window.AxionWorkspace.aiAddEvent(i, `[${type}] ${task}`, {tipo: 'manual'});
             }
           }
        }
      });

      this.grid.appendChild(dayDiv);
    }
  }

  updatePanel(day) {
    if(!this.accordionsContainer) return;
    
    const pastDetails = this.accordionsContainer.querySelector('details.dash-accordion:nth-child(1) .acc-content');
    if (pastDetails) {
      if (this.completedTasks[day]) {
        pastDetails.innerHTML = this.completedTasks[day].map(t => {
           const icon = t.type === 'auto' ? '⚡' : '✅';
           return `<p style="font-size:12px; margin-bottom:5px;">${icon} ${t.text}</p>`;
        }).join('');
      } else {
        pastDetails.innerHTML = `<p style="font-size:12px; color:var(--text-secondary);">Nenhuma atividade registrada no dia ${day}.</p>`;
      }
    }
  }
}

window.DashCalendar = DashCalendar;
