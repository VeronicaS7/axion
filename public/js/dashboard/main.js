// public/js/dashboard/main.js
class DashboardManager {
  constructor() {
    this.bgBtn = document.getElementById('btn-change-dash-bg');
    this.bgPopover = document.getElementById('bg-popover');
    this.bgUploadInput = document.getElementById('bg-upload-input');
    this.bgLinkInput = document.getElementById('bg-link-input');
    this.bgLinkBtn = document.getElementById('btn-apply-bg-link');
    this.bgRepositionToggle = document.getElementById('bg-reposition-toggle');
    this.dashBanner = document.getElementById('dash-cover-banner');
    
    this.tutorPopup = document.getElementById('dash-tutor-popup');
    
    this.isDraggingBg = false;
    this.startY = 0;
    this.bgPosY = 50;

    this.init();
  }

  init() {
    // Inicializar os módulos
    if (window.AnalogTimer) new AnalogTimer();
    if (window.TodoList) new TodoList();
    if (window.RichEditor) new RichEditor();
    if (window.DashCalendar) new DashCalendar();

    this.loadSavedBg();
    this.initCoverControls();
    this.initDock();

    // Ações do IA popup
    if (this.tutorPopup) {
      const actions = this.tutorPopup.querySelectorAll('.btn-ia-action');
      actions.forEach(btn => {
        btn.addEventListener('click', () => {
          this.tutorPopup.style.display = 'none';
        });
      });
    }

    // Lógica para fechar modais
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.closest('.dash-modal').classList.remove('active');
      });
    });
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  loadSavedBg() {
    const savedBg = localStorage.getItem('axion_dash_bg');
    const savedPosY = localStorage.getItem('axion_dash_bg_pos');
    
    if (savedBg && this.dashBanner) {
      this.dashBanner.style.backgroundImage = `url('${savedBg}')`;
    }
    if (savedPosY && this.dashBanner) {
      this.bgPosY = parseFloat(savedPosY);
      this.dashBanner.style.backgroundPosition = `center ${this.bgPosY}%`;
    }
  }

  initCoverControls() {
    if (!this.bgBtn || !this.bgPopover) return;

    // Toggle Popover
    this.bgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.bgPopover.classList.toggle('active');
    });

    // Close Popover when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dash-cover-controls')) {
        this.bgPopover.classList.remove('active');
      }
    });

    // Tabs
    const tabs = this.bgPopover.querySelectorAll('.bg-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        this.bgPopover.querySelectorAll('.bg-tab-content').forEach(c => c.style.display = 'none');
        document.getElementById(`bg-tab-${tab.getAttribute('data-tab')}`).style.display = 'block';
      });
    });

    // File Upload (Canvas Compression)
    if (this.bgUploadInput) {
      this.bgUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1920;
            const MAX_HEIGHT = 1080;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
            this.setBgImage(compressedBase64);
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    // Link Apply
    if (this.bgLinkBtn && this.bgLinkInput) {
      this.bgLinkBtn.addEventListener('click', () => {
        const url = this.bgLinkInput.value.trim();
        if (url) this.setBgImage(url);
      });
    }

    // Reposition (Drag Y)
    if (this.bgRepositionToggle && this.dashBanner) {
      this.bgRepositionToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.dashBanner.classList.add('draggable');
        } else {
          this.dashBanner.classList.remove('draggable');
          localStorage.setItem('axion_dash_bg_pos', this.bgPosY);
        }
      });

      this.dashBanner.addEventListener('mousedown', (e) => {
        if (!this.dashBanner.classList.contains('draggable')) return;
        this.isDraggingBg = true;
        this.startY = e.clientY;
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDraggingBg) return;
        const diffY = e.clientY - this.startY;
        this.startY = e.clientY;
        
        this.bgPosY -= (diffY * 0.2); // Sensitivity
        if (this.bgPosY < 0) this.bgPosY = 0;
        if (this.bgPosY > 100) this.bgPosY = 100;
        
        this.dashBanner.style.backgroundPosition = `center ${this.bgPosY}%`;
      });

      window.addEventListener('mouseup', () => {
        this.isDraggingBg = false;
      });
    }
  }

  setBgImage(url) {
    if (this.dashBanner) {
      this.dashBanner.style.backgroundImage = `url('${url}')`;
      localStorage.setItem('axion_dash_bg', url);
    }
  }

  initDock() {
    const btnNote = document.getElementById('dock-btn-note');
    const btnStudy = document.getElementById('dock-btn-study');
    const btnFocus = document.getElementById('dock-btn-focus');
    const btnSearch = document.getElementById('dock-btn-search');

    if (btnNote) {
      btnNote.addEventListener('click', () => {
        // Toggle Focus Mode for Editor
        const grid = document.querySelector('.dashboard-grid');
        const editorLayout = document.querySelector('.widget-editor-layout');
        const sidebar = document.querySelector('.editor-sidebar');
        
        if (!grid.classList.contains('editor-focus-mode')) {
          grid.style.gridTemplateColumns = '1fr';
          document.querySelector('.dash-col:nth-child(1)').style.display = 'none';
          document.querySelector('.dash-col:nth-child(3)').style.display = 'none';
          if(sidebar) sidebar.style.display = 'none';
          if(editorLayout) editorLayout.style.height = '80vh';
          grid.classList.add('editor-focus-mode');
        } else {
          grid.style.gridTemplateColumns = '1fr 2fr 1fr';
          document.querySelector('.dash-col:nth-child(1)').style.display = 'block';
          document.querySelector('.dash-col:nth-child(3)').style.display = 'block';
          if(sidebar) sidebar.style.display = 'block';
          if(editorLayout) editorLayout.style.height = '500px';
          grid.classList.remove('editor-focus-mode');
        }
      });
    }

    if (btnStudy) {
      btnStudy.addEventListener('click', () => {
        // Referência Rápida Fake (Abre no Modal Global por agora)
        const modal = document.getElementById('modal-global-search');
        if(modal) {
          modal.querySelector('h3').innerText = 'Referência Rápida (Glossário)';
          modal.classList.add('active');
        }
      });
    }

    if (btnFocus) {
      btnFocus.addEventListener('click', () => {
        // Pedir Dica IA
        const editorContent = document.getElementById('rich-editor')?.innerHTML || 'Texto vazio';
        alert(`Tutor IA analisa:\n\n${editorContent.substring(0, 50)}...\n\n(Dica gerada com sucesso!)`);
      });
    }

    if (btnSearch) {
      btnSearch.addEventListener('click', () => {
        // Roteamento fake explorar
        if (window.router) window.router.navigate('/trilhas');
        else alert('Navegando para /trilhas');
      });
    }

    // Atalho Ctrl+K - Global Search
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchModal = document.getElementById('modal-global-search');
        if (searchModal) {
          searchModal.querySelector('h3').innerText = 'Pesquisa Global';
          searchModal.classList.add('active');
        }
      }
      if (e.key === 'Escape') {
        // Sai de focus mode se ativo
        const grid = document.querySelector('.dashboard-grid');
        if (grid && grid.classList.contains('editor-focus-mode')) {
          btnNote.click();
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (document.getElementById('dashboard-container')) {
      new DashboardManager();
    }
  }, 500); 
});

window.DashboardManager = DashboardManager;
