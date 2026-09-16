// public/js/dashboard/editor.js
class RichEditor {
  constructor() {
    this.editor = document.getElementById('rich-editor');
    this.buttons = document.querySelectorAll('.tool-btn');
    this.sidebar = document.querySelector('.editor-sidebar');
    
    // Árvore Recursiva
    this.notebooks = [
      {
        id: "root-1", type: "pasta", nome: "Semestre 1", filhos: [
          {id: "f1-1", type: "pasta", nome: "Mecânica dos Fluidos", filhos: [
            {id: "n1-1", type: "nota", nome: "Vetores - Dia 1"},
            {id: "n1-2", type: "nota", nome: "Soma Ponderada"}
          ]},
          {id: "f1-2", type: "pasta", nome: "Termodinâmica", filhos: [
             {id: "n1-3", type: "nota", nome: "Leis da Termo"}
          ]}
        ]
      }
    ];

    this.activeNoteId = "n1-1";

    this.init();
  }

  init() {
    if (!this.editor || !this.sidebar) return;

    this.renderTree();

    this.buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          document.execCommand(cmd, false, null);
          this.editor.focus();
        }
      });
    });
  }

  createFolderNode(node) {
    const details = document.createElement('details');
    details.className = 'tree-folder';
    details.open = true; // Por padrão abrimos para visualizar

    const summary = document.createElement('summary');
    summary.innerHTML = `
      <i data-lucide="folder" style="width:14px;height:14px; color:var(--text-muted);"></i> 
      <span class="tree-label" ondblclick="this.contentEditable=true;this.focus();" onblur="this.contentEditable=false;" style="flex:1;">${node.nome}</span>
      <i class="add-btn" data-lucide="plus" style="width:12px;height:12px; color:var(--text-muted);" title="Nova Nota/Pasta"></i>
    `;
    
    // Add event para o botão de +
    setTimeout(() => {
      const addBtn = summary.querySelector('.add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const tipo = prompt("Digite 'nota' para Nova Anotação ou 'pasta' para Nova Pasta:", "nota");
          if (tipo === 'nota' || tipo === 'pasta') {
            node.filhos.push({
              id: Date.now().toString(),
              type: tipo,
              nome: tipo === 'nota' ? "Nova Anotação" : "Nova Pasta",
              filhos: tipo === 'pasta' ? [] : undefined
            });
            this.renderTree();
          }
        });
      }
    }, 0);

    details.appendChild(summary);

    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'tree-children';
    
    node.filhos.forEach(filho => {
      if (filho.type === 'pasta') {
        childrenContainer.appendChild(this.createFolderNode(filho));
      } else {
        childrenContainer.appendChild(this.createNoteNode(filho));
      }
    });

    details.appendChild(childrenContainer);
    return details;
  }

  createNoteNode(node) {
    const li = document.createElement('div');
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "5px";
    li.style.padding = "4px 0";
    li.style.cursor = "pointer";
    li.style.fontSize = "12px";
    li.style.color = this.activeNoteId === node.id ? "var(--text-primary)" : "var(--text-secondary)";
    if (this.activeNoteId === node.id) li.style.fontWeight = "bold";

    li.innerHTML = `
      <i data-lucide="file-text" style="width:12px;height:12px; opacity:0.5; color: ${this.activeNoteId === node.id ? 'var(--axion-cyan)' : 'inherit'};"></i> 
      <span class="tree-label" ondblclick="this.contentEditable=true;this.focus();" onblur="this.contentEditable=false;" style="flex:1;">${node.nome}</span>
    `;

    li.addEventListener('click', (e) => {
       if (e.target.classList.contains('tree-label') && e.target.isContentEditable) return;
       this.activeNoteId = node.id;
       const editorHeader = document.querySelector('.editor-header h2');
       if(editorHeader) editorHeader.innerText = node.nome;
       this.renderTree();
    });

    return li;
  }

  renderTree() {
    this.sidebar.innerHTML = '';
    
    const title = document.createElement('h4');
    title.innerText = 'Meus Cadernos';
    title.style.marginBottom = '15px';
    title.style.fontSize = '12px';
    title.style.color = 'var(--text-muted)';
    this.sidebar.appendChild(title);

    const treeContainer = document.createElement('div');
    
    this.notebooks.forEach(rootNode => {
      if (rootNode.type === 'pasta') {
        treeContainer.appendChild(this.createFolderNode(rootNode));
      } else {
        treeContainer.appendChild(this.createNoteNode(rootNode));
      }
    });

    this.sidebar.appendChild(treeContainer);

    const addFolderBtn = document.createElement('button');
    addFolderBtn.className = 'btn-dash';
    addFolderBtn.style.width = '100%';
    addFolderBtn.style.marginTop = '20px';
    addFolderBtn.innerText = '+ Nova Pasta Raiz';
    addFolderBtn.addEventListener('click', () => {
      this.notebooks.push({ id: Date.now().toString(), type: "pasta", nome: "Nova Pasta Raiz", filhos: [] });
      this.renderTree();
    });
    this.sidebar.appendChild(addFolderBtn);

    if (window.lucide) {
      window.lucide.createIcons({ root: this.sidebar });
    }
  }
}

window.RichEditor = RichEditor;
