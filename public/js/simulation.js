// ============================================================================
// MOTOR DA SIMULAÇÃO DE GARGALOS (SIMULATION.JS - REFATORADO)
// ============================================================================

class RefactoredSimulation {
  constructor() {
    this.corteTime = 4.0;
    this.montagemTime = 7.0;
    this.inspecaoTime = 5.0;
    this.isPaused = false;
    this.spawnIntervalId = null;
    this.activeContext = "lab"; // "lab" ou "lesson"
  }

  // Inicializa o simulador e vincula os controles da tela ativa
  init(context = "lab") {
    this.activeContext = context;
    this.isPaused = false;

    // Obter referências dos Sliders
    const pfx = this.activeContext === "lesson" ? "lesson-" : "lab-";
    
    const sliderCorte = document.getElementById(`${pfx}slider-corte`);
    const sliderMontagem = document.getElementById(`${pfx}slider-montagem`);
    const sliderInspecao = document.getElementById(`${pfx}slider-inspecao`);

    if (!sliderCorte || !sliderMontagem || !sliderInspecao) {
      console.warn(`[Simulation] Sliders para contexto [${this.activeContext}] não encontrados.`);
      return;
    }

    // Carrega tempos iniciais
    this.corteTime = parseFloat(sliderCorte.value);
    this.montagemTime = parseFloat(sliderMontagem.value);
    this.inspecaoTime = parseFloat(sliderInspecao.value);

    // Binds de Alterações de Tempo
    const setupSlider = (slider, key) => {
      // Evento input para resposta em tempo real
      slider.addEventListener("input", (e) => {
        this[key] = parseFloat(e.target.value);
        this.updateStats();
      });
    };

    setupSlider(sliderCorte, "corteTime");
    setupSlider(sliderMontagem, "montagemTime");
    setupSlider(sliderInspecao, "inspecaoTime");

    // Binds dos botões de Play/Pause
    const btnPlay = document.getElementById(this.activeContext === "lesson" ? "btn-sim-lesson-play" : "btn-sim-play");
    const btnPause = document.getElementById(this.activeContext === "lesson" ? "btn-sim-lesson-pause" : "btn-sim-pause");

    if (btnPlay && btnPause) {
      // Clones para remover listeners antigos
      const newPlay = btnPlay.cloneNode(true);
      const newPause = btnPause.cloneNode(true);
      btnPlay.parentNode.replaceChild(newPlay, btnPlay);
      btnPause.parentNode.replaceChild(newPause, btnPause);

      newPlay.addEventListener("click", () => {
        newPlay.classList.add("active");
        newPause.classList.remove("active");
        this.resume();
      });

      newPause.addEventListener("click", () => {
        newPause.classList.add("active");
        newPlay.classList.remove("active");
        this.pause();
      });
    }

    // Limpa caixas anteriores do viewport gráfico
    const viewport = document.getElementById(this.activeContext === "lesson" ? "lesson-graphics-viewport" : "lab-graphics-viewport");
    if (viewport) {
      viewport.querySelectorAll(".sim-moving-box").forEach(box => box.remove());
    }

    // Inicializa o Spawning de peças
    this.startSpawning();

    // Atualiza estatísticas e destaques iniciais
    this.updateStats();

    // SETUP SOCRATIC LAB ASSISTANT
    this.setupLabAssistant();
  }

  setupLabAssistant() {
    // Add "Estou travado" button and minichat in the sidebar if they don't exist
    let sidebar = document.querySelector('.lab-sidebar');
    if (!sidebar) return;

    let assistantContainer = document.getElementById('lab-assistant-container');
    if (!assistantContainer) {
      assistantContainer = document.createElement('div');
      assistantContainer.id = 'lab-assistant-container';
      assistantContainer.style.cssText = 'margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 16px;';
      
      assistantContainer.innerHTML = `
        <h3 style="font-size: 14px; margin-bottom: 8px; color: var(--text-primary);">Assistente de Laboratório</h3>
        <div id="lab-assistant-chat" style="max-height: 200px; overflow-y: auto; font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; padding: 8px; background: var(--bg-surface); border-radius: var(--radius-sm);"></div>
        <button id="btn-lab-stuck" style="width: 100%; padding: 10px; border-radius: var(--radius-md); background: var(--accent-cyan); color: var(--bg-dark); font-weight: 600; border: none; cursor: pointer;">Estou travado!</button>
      `;
      sidebar.appendChild(assistantContainer);

      document.getElementById('btn-lab-stuck').addEventListener('click', async () => {
        const chatDiv = document.getElementById('lab-assistant-chat');
        chatDiv.innerHTML += `<div style="margin-bottom: 8px;"><strong>Você:</strong> Estou travado.</div>`;
        chatDiv.innerHTML += `<div id="lab-loading" style="margin-bottom: 8px; font-style: italic;">Pensando...</div>`;
        chatDiv.scrollTop = chatDiv.scrollHeight;

        try {
          const payload = {
            logs: "Simulação de gargalos em andamento.",
            current_variables: {
              corte: this.corteTime,
              montagem: this.montagemTime,
              inspecao: this.inspecaoTime
            }
          };

          const response = await fetch(`http://${window.location.hostname}:8000/chat/lab-assistant`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          document.getElementById('lab-loading').remove();

          if (response.ok) {
            const data = await response.json();
            chatDiv.innerHTML += `<div style="margin-bottom: 8px; color: var(--text-primary);"><strong>IA:</strong> ${data.response}</div>`;
          } else {
            chatDiv.innerHTML += `<div style="margin-bottom: 8px; color: var(--error);"><strong>Erro:</strong> Não foi possível obter dica.</div>`;
          }
        } catch (e) {
          document.getElementById('lab-loading').remove();
          chatDiv.innerHTML += `<div style="margin-bottom: 8px; color: var(--error);"><strong>Erro:</strong> Servidor indisponível.</div>`;
        }
        chatDiv.scrollTop = chatDiv.scrollHeight;
      });
    }
  }

  // Inicia o timer que gera novas caixas na esteira
  startSpawning() {
    if (this.spawnIntervalId) clearInterval(this.spawnIntervalId);

    // Spawna uma caixa a cada 1.8 segundos
    this.spawnIntervalId = setInterval(() => {
      if (!this.isPaused) {
        this.spawnBox();
      }
    }, 1800);
  }

  // Cria um elemento físico de caixa e comanda suas animações sequenciais
  spawnBox() {
    const viewportId = this.activeContext === "lesson" ? "lesson-graphics-viewport" : "lab-graphics-viewport";
    const viewport = document.getElementById(viewportId);
    if (!viewport) return;

    const box = document.createElement("div");
    box.className = "sim-moving-box";
    viewport.appendChild(box);

    // Ajusta coordenadas baseadas nas posições dos nós da esteira
    const startX = 40; // Posição Corte
    const midX1 = 200; // Antes de Montagem
    const midX2 = 360; // Antes de Inspeção
    const endX = 520;  // Saída final

    box.style.left = `${startX}px`;

    // Fase 1: Deslocamento de Corte até Montagem
    setTimeout(() => {
      if (this.isPaused) box.classList.add("paused");
      box.style.transition = `left ${this.corteTime * 250}ms linear`;
      box.style.left = `${midX1}px`;
    }, 50);

    // Fase 2: Ao atingir Montagem, processa e desliza até Inspeção
    setTimeout(() => {
      if (!box.parentNode) return; // Se já foi removido
      
      // Simula tempo de parada na Montagem
      box.style.left = `${midX1}px`;
      
      setTimeout(() => {
        if (!box.parentNode) return;
        box.style.transition = `left ${this.montagemTime * 250}ms linear`;
        box.style.left = `${midX2}px`;
      }, this.montagemTime * 100);

    }, this.corteTime * 250 + 100);

    // Fase 3: Ao atingir Inspeção, processa e sai de tela
    setTimeout(() => {
      if (!box.parentNode) return;

      setTimeout(() => {
        if (!box.parentNode) return;
        box.style.transition = `left ${this.inspecaoTime * 250}ms linear`;
        box.style.left = `${endX}px`;
        
        // Remove do DOM no final do percurso
        setTimeout(() => box.remove(), this.inspecaoTime * 250 + 50);
      }, this.inspecaoTime * 100);

    }, (this.corteTime + this.montagemTime) * 250 + 250);
  }

  // Pausa a movimentação e geração de novas caixas
  pause() {
    this.isPaused = true;
    const viewportId = this.activeContext === "lesson" ? "lesson-graphics-viewport" : "lab-graphics-viewport";
    const viewport = document.getElementById(viewportId);
    if (viewport) {
      viewport.querySelectorAll(".sim-moving-box").forEach(box => {
        box.classList.add("paused");
        // Trava a caixa na coordenada atual
        const currentLeft = window.getComputedStyle(box).left;
        box.style.left = currentLeft;
        box.style.transition = "none";
      });
    }
  }

  // Retoma a movimentação e geração de novas caixas
  resume() {
    this.isPaused = false;
    const viewportId = this.activeContext === "lesson" ? "lesson-graphics-viewport" : "lab-graphics-viewport";
    const viewport = document.getElementById(viewportId);
    if (viewport) {
      viewport.querySelectorAll(".sim-moving-box").forEach(box => {
        box.classList.remove("paused");
        
        // Destrói caixas no meio para re-sincronizar sem pulos visuais bruscos
        box.remove();
      });
    }
  }

  // Atualiza as métricas de capacidade, gargalo e destaques visuais do nó
  updateStats() {
    const pfx = this.activeContext === "lesson" ? "lesson-" : "lab-";

    // 1. Atualizar labels numéricos nos sliders
    document.getElementById(`${pfx}val-corte`).textContent = `${this.corteTime.toFixed(1)} min`;
    document.getElementById(`${pfx}val-montagem`).textContent = `${this.montagemTime.toFixed(1)} min`;
    document.getElementById(`${pfx}val-inspecao`).textContent = `${this.inspecaoTime.toFixed(1)} min`;

    // 2. Atualizar tempos nos nós gráficos
    document.getElementById(`${pfx}node-corte-label`).textContent = `${this.corteTime.toFixed(1)} min`;
    document.getElementById(`${pfx}node-montagem-label`).textContent = `${this.montagemTime.toFixed(1)} min`;
    document.getElementById(`${pfx}node-inspecao-label`).textContent = `${this.inspecaoTime.toFixed(1)} min`;

    // 3. Determinar o Gargalo (maior tempo unitário)
    let bottleneckName = "Montagem";
    let maxTime = this.montagemTime;
    let bottleneckKey = "montagem";

    if (this.corteTime > maxTime) {
      maxTime = this.corteTime;
      bottleneckName = "Corte";
      bottleneckKey = "corte";
    }

    if (this.inspecaoTime > maxTime) {
      maxTime = this.inspecaoTime;
      bottleneckName = "Inspeção";
      bottleneckKey = "inspecao";
    }

    // 4. Calcular Capacidade (60 / gargalo)
    const capacity = 60 / maxTime;

    // 5. Atualizar painel de status
    document.getElementById(`${pfx}bottleneck-name`).textContent = bottleneckName;
    document.getElementById(`${pfx}capacity-value`).textContent = `${capacity.toFixed(2)} peças/hora`;

    // 6. Atualizar classes e tags de gargalo
    const nodeCorte = document.getElementById(`${pfx}node-corte`);
    const nodeMontagem = document.getElementById(`${pfx}node-montagem`);
    const nodeInspecao = document.getElementById(`${pfx}node-inspecao`);

    const nodes = { corte: nodeCorte, montagem: nodeMontagem, inspecao: nodeInspecao };

    Object.keys(nodes).forEach(key => {
      const node = nodes[key];
      if (!node) return;
      
      node.classList.remove("bottleneck");
      const existingTag = node.querySelector(".bottleneck-tag");
      if (existingTag) existingTag.remove();
    });

    const activeNode = nodes[bottleneckKey];
    if (activeNode) {
      activeNode.classList.add("bottleneck");
      const tag = document.createElement("div");
      tag.className = "bottleneck-tag";
      tag.textContent = "GARGALO ⚠️";
      activeNode.appendChild(tag);
    }

    // 7. Atualizar filas físicas de acumulo visual
    this.updateQueueGraphics(pfx);
  }

  // Gera bolinhas piscantes nas filas simulando bloqueios físicos de fluxo
  updateQueueGraphics(pfx) {
    const queueCorte = document.getElementById(`${pfx}queue-corte`);
    const queueMontagem = document.getElementById(`${pfx}queue-montagem`);
    const queueInspecao = document.getElementById(`${pfx}queue-inspecao`);

    // Fila Corte (Matéria-prima: sempre 1 item ativo)
    this._renderQueueDots(queueCorte, 1);

    // Fila Montagem: acumula se Corte (anterior) for mais rápido que Montagem
    if (this.corteTime < this.montagemTime) {
      const diff = this.montagemTime - this.corteTime;
      const count = diff > 3 ? 4 : 3;
      this._renderQueueDots(queueMontagem, count);
    } else {
      this._renderQueueDots(queueMontagem, 1);
    }

    // Fila Inspeção: acumula se Montagem (anterior) for mais rápida que Inspeção
    if (this.montagemTime < this.inspecaoTime) {
      const diff = this.inspecaoTime - this.montagemTime;
      const count = diff > 3 ? 4 : 3;
      this._renderQueueDots(queueInspecao, count);
    } else {
      this._renderQueueDots(queueInspecao, 0);
    }
  }

  _renderQueueDots(container, count) {
    if (!container) return;
    container.innerHTML = "";

    if (count === 0) {
      container.style.display = "none";
      return;
    } else {
      container.style.display = "flex";
    }

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.className = "queue-dot";
      dot.style.animationDelay = `${i * 0.3}s`;
      container.appendChild(dot);
    }
  }

  // Destrutor da simulação ao fechar a tela
  destroy() {
    if (this.spawnIntervalId) clearInterval(this.spawnIntervalId);
  }
}

window.BottleneckSimulation = new RefactoredSimulation();
