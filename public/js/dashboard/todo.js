// public/js/dashboard/todo.js
class TodoList {
  constructor() {
    this.container = document.getElementById('todo-container');
    this.mockData = [
      {
        id: "cat-1", category: "Metalurgia e Materiais", color: "#9d4edd",
        tasks: [
          { id: "t-1", text: "Estudar formação de Martensita", done: true, priority: "alta", subtasks: [] },
          { id: "t-2", text: "Praticar Ensaio por Líquido Penetrante", done: false, priority: "media", subtasks: [
            { id: "s-1", text: "Revisar normas ASTM", done: false }
          ]}
        ]
      },
      {
        id: "cat-2", category: "Normas de Qualidade", color: "#f5a623",
        tasks: [
          { id: "t-3", text: "Revisar Indicações ASME Sec. VIII Div.1 Apêndice 8", done: false, priority: "alta", subtasks: [] }
        ]
      }
    ];

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();

    // Close menu context on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.todo-context-menu') && !e.target.closest('.btn-todo-menu')) {
        const activeMenu = document.querySelector('.todo-context-menu');
        if (activeMenu) activeMenu.remove();
      }
    });
  }

  render() {
    this.container.innerHTML = '';
    
    this.mockData.forEach((cat, catIdx) => {
      const catDiv = document.createElement('div');
      catDiv.className = 'todo-category';
      catDiv.setAttribute('data-id', cat.id);
      
      const title = document.createElement('div');
      title.className = 'todo-cat-title';
      title.innerHTML = `
        <i data-lucide="grip-vertical" style="width:14px;height:14px; cursor:grab; opacity:0.5;" class="cat-drag-handle"></i> 
        <span class="editable-title" ondblclick="this.contentEditable=true;this.focus();" onblur="this.contentEditable=false;" style="flex:1;">${cat.category}</span> 
        <span class="tag" style="background: ${cat.color}40; color: ${cat.color}">Tags</span>
      `;
      catDiv.appendChild(title);

      const taskList = document.createElement('div');
      taskList.className = 'task-list';
      taskList.setAttribute('data-cat-idx', catIdx);

      cat.tasks.forEach((task, taskIdx) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `todo-item ${task.done ? 'checked' : ''}`;
        taskDiv.style.position = 'relative';
        taskDiv.setAttribute('data-task-id', task.id);
        
        let flagColor = task.priority === 'alta' ? 'var(--error)' : (task.priority === 'media' ? '#f5a623' : 'var(--text-muted)');
        
        taskDiv.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
            <label style="flex:1;">
              <input type="checkbox" data-cat="${catIdx}" data-task="${taskIdx}" ${task.done ? 'checked' : ''}>
              <div style="display:flex; flex-direction:column; flex:1;">
                <span class="editable-task" ondblclick="this.contentEditable=true;this.focus();" onblur="this.contentEditable=false;">${task.text}</span>
              </div>
            </label>
            <div style="display:flex; gap:6px; align-items:center;">
              <i data-lucide="flag" class="btn-flag-cycle" data-cat="${catIdx}" data-task="${taskIdx}" style="width:14px;height:14px; color:${flagColor}; cursor:pointer;" title="Ciclar Prioridade"></i>
              <i data-lucide="more-horizontal" class="btn-todo-menu" data-cat="${catIdx}" data-task="${taskIdx}" style="width:14px;height:14px; color:var(--text-muted); cursor:pointer;"></i>
              <i data-lucide="grip-vertical" style="width:14px;height:14px; cursor:grab; opacity:0.5;" class="task-drag-handle"></i> 
            </div>
          </div>
        `;
        
        // Subtasks
        if (task.subtasks && task.subtasks.length > 0) {
          const subList = document.createElement('div');
          subList.style.paddingLeft = '20px';
          subList.style.marginTop = '4px';
          subList.style.borderLeft = '1px solid rgba(255,255,255,0.1)';
          
          task.subtasks.forEach((sub, subIdx) => {
             const subDiv = document.createElement('div');
             subDiv.style.display = 'flex';
             subDiv.style.alignItems = 'center';
             subDiv.style.gap = '5px';
             subDiv.style.fontSize = '11px';
             subDiv.innerHTML = `
                <input type="checkbox" data-sub-cat="${catIdx}" data-sub-task="${taskIdx}" data-sub="${subIdx}" ${sub.done ? 'checked' : ''}>
                <span ondblclick="this.contentEditable=true;this.focus();" onblur="this.contentEditable=false;" style="${sub.done ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${sub.text}</span>
             `;
             subList.appendChild(subDiv);
          });
          taskDiv.appendChild(subList);
        }

        taskList.appendChild(taskDiv);
      });
      catDiv.appendChild(taskList);
      
      const addBtn = document.createElement('div');
      addBtn.className = 'add-task-btn';
      addBtn.innerText = '+ Nova Tarefa';
      addBtn.addEventListener('click', () => {
        this.mockData[catIdx].tasks.push({
          id: 't-' + Date.now(), text: "Nova tarefa...", done: false, priority: "baixa", subtasks: []
        });
        this.render();
      });
      catDiv.appendChild(addBtn);

      this.container.appendChild(catDiv);
    });

    const addCatBtn = document.createElement('button');
    addCatBtn.className = 'btn-dash';
    addCatBtn.innerText = '+ Nova Lista';
    addCatBtn.style.marginTop = '15px';
    addCatBtn.style.width = '100%';
    addCatBtn.addEventListener('click', () => {
      this.mockData.push({ id: 'cat-' + Date.now(), category: "Nova Lista", color: "#6B7280", tasks: [] });
      this.render();
    });
    this.container.appendChild(addCatBtn);

    if (window.lucide) {
      window.lucide.createIcons({ root: this.container });
    }

    this.attachEvents();
    this.initSortable();
  }

  attachEvents() {
    // Checkboxes (tasks)
    this.container.querySelectorAll('input[type="checkbox"][data-task]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const cIdx = e.target.getAttribute('data-cat');
        const tIdx = e.target.getAttribute('data-task');
        this.mockData[cIdx].tasks[tIdx].done = e.target.checked;
        this.render();
      });
    });

    // Checkboxes (subtasks)
    this.container.querySelectorAll('input[type="checkbox"][data-sub]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const cIdx = e.target.getAttribute('data-sub-cat');
        const tIdx = e.target.getAttribute('data-sub-task');
        const sIdx = e.target.getAttribute('data-sub');
        this.mockData[cIdx].tasks[tIdx].subtasks[sIdx].done = e.target.checked;
        this.render();
      });
    });

    // Cycle Priority
    this.container.querySelectorAll('.btn-flag-cycle').forEach(f => {
      f.addEventListener('click', (e) => {
        const cIdx = e.target.getAttribute('data-cat');
        const tIdx = e.target.getAttribute('data-task');
        const priorities = ["baixa", "media", "alta"];
        let p = this.mockData[cIdx].tasks[tIdx].priority;
        let nextP = priorities[(priorities.indexOf(p) + 1) % 3];
        this.mockData[cIdx].tasks[tIdx].priority = nextP;
        this.render();
      });
    });

    // Menus
    const menus = this.container.querySelectorAll('.btn-todo-menu');
    menus.forEach(m => {
      m.addEventListener('click', (e) => {
        e.stopPropagation();
        const existing = document.querySelector('.todo-context-menu');
        if (existing) existing.remove();

        const cIdx = e.target.getAttribute('data-cat');
        const tIdx = e.target.getAttribute('data-task');

        const menuDiv = document.createElement('div');
        menuDiv.className = 'todo-context-menu';
        menuDiv.innerHTML = `
          <button class="add-sub-btn">Adicionar Subtarefa</button>
          <button class="delete-btn" style="color:var(--error);">Excluir Tarefa</button>
        `;
        
        const rect = e.target.getBoundingClientRect();
        menuDiv.style.top = `${e.clientY + 10}px`;
        menuDiv.style.left = `${e.clientX - 50}px`;
        
        document.body.appendChild(menuDiv);

        menuDiv.querySelector('.add-sub-btn').addEventListener('click', () => {
          if (!this.mockData[cIdx].tasks[tIdx].subtasks) this.mockData[cIdx].tasks[tIdx].subtasks = [];
          this.mockData[cIdx].tasks[tIdx].subtasks.push({ id: 's-'+Date.now(), text: "Subtarefa", done: false });
          menuDiv.remove();
          this.render();
        });

        menuDiv.querySelector('.delete-btn').addEventListener('click', () => {
          if(confirm('Tem certeza que deseja excluir?')) {
            this.mockData[cIdx].tasks.splice(tIdx, 1);
            menuDiv.remove();
            this.render();
          }
        });
      });
    });
  }

  initSortable() {
    if (window.Sortable) {
      // Sortable para as listas de tarefas
      const lists = this.container.querySelectorAll('.task-list');
      lists.forEach(el => {
        new window.Sortable(el, {
          group: 'shared', // permite arrastar entre listas
          handle: '.task-drag-handle',
          animation: 150,
          onEnd: (evt) => {
            // Em uma app real, sincronizaríamos o this.mockData
            // Aqui estamos deixando o DOM cuidar disso via DragAndDrop puro, 
            // mas num cenário real a reordenação atualizaria o array
          }
        });
      });

      // Sortable para categorias
      new window.Sortable(this.container, {
        handle: '.cat-drag-handle',
        animation: 150
      });
    }
  }
}

window.TodoList = TodoList;
