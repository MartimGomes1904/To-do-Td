(function () {
  const vscode = acquireVsCodeApi();
  const saved = vscode.getState() || {};

  // ---------- Idiomas ----------
  // O idioma inicial vem da extensão (preferência guardada ou idioma do VS Code).
  let lang = 'en';

  const I18N = {
    en: {
      title: 'To-do',
      viewList: 'List',
      viewKanban: 'Kanban',
      statuses: { todo: 'To do', doing: 'In progress', done: 'Done' },
      priorities: { urgente: 'Urgent', alta: 'High', media: 'Medium', baixa: 'Low' },
      quickAdd: 'New task… use #label and !high (Enter to add)',
      add: 'Add',
      addTip: 'Add the task (empty box: open the full form)',
      search: 'Search…',
      allPriorities: 'All priorities',
      allLabels: 'All labels',
      dueFilter: { all: 'Any date', overdue: 'Overdue', today: 'Due today', week: 'Next 7 days', none: 'No date' },
      sortLabel: 'Sort',
      sorts: { manual: 'Manual order', priority: 'Priority', due: 'Due date', created: 'Newest first' },
      clearDone: (n) => `Clear completed (${n})`,
      clearDoneQ: (n) => `Remove ${n} completed task${n === 1 ? '' : 's'}?`,
      emptyAll: 'No tasks yet. Type one above and press Enter.',
      emptyFilter: 'No tasks match the filters.',
      colEmpty: 'Nothing here',
      colAdd: '+ Add task',
      colAddPlaceholder: 'Task title… (Enter)',
      showDone: 'Show completed',
      hideDone: 'Hide completed',
      stPending: (n) => `${n} to do`,
      stDoing: (n) => `${n} in progress`,
      stDone: (n) => `${n} done`,
      stOverdue: (n) => `${n} overdue`,
      progress: (p) => `${p}% done`,
      dueToday: 'Today',
      dueTomorrow: 'Tomorrow',
      dueOverdue: (d) => (d === 1 ? '1 day overdue' : `${d} days overdue`),
      toggleDone: 'Mark as done / not done',
      start: 'Mark as in progress',
      pause: 'Back to "To do"',
      expand: 'Show subtasks',
      edit: 'Edit',
      del: 'Delete',
      deleteQ: 'Delete?',
      yes: 'Yes',
      no: 'No',
      newTask: 'New task',
      editTask: 'Edit task',
      close: 'Close',
      fTitle: 'Title',
      fStatus: 'Status',
      fPriority: 'Priority',
      fDue: 'Due date',
      fLabels: 'Labels',
      fNotes: 'Notes',
      fSubtasks: 'Subtasks',
      dueToday2: 'Today',
      dueTomorrow2: 'Tomorrow',
      dueNextWeek: 'Next week',
      dueClear: 'No date',
      labelPlaceholder: 'Add label… (Enter)',
      removeLabel: 'Remove label',
      subtaskPlaceholder: 'Add subtask… (Enter)',
      removeSubtask: 'Remove subtask',
      created: 'Created',
      completed: 'Completed',
      titleRequired: 'Give the task a title.',
      discardMsg: 'You have unsaved changes. Discard?',
      discard: 'Discard',
      keepEditing: 'Keep editing',
      cancel: 'Cancel',
      save: 'Save',
      untitled: '(untitled)',
      langTitle: 'Language',
      errTitle: 'This .td file cannot be shown',
      errNotObject: 'The file must contain a JSON object ({ … }).',
      errInvalid: 'The file contains invalid JSON.',
      openAsText: 'Open as text',
      notes: 'Has notes',
    },
    pt: {
      title: 'Tarefas',
      viewList: 'Lista',
      viewKanban: 'Kanban',
      statuses: { todo: 'Por fazer', doing: 'Em curso', done: 'Feito' },
      priorities: { urgente: 'Urgente', alta: 'Alta', media: 'Média', baixa: 'Baixa' },
      quickAdd: 'Nova tarefa… usa #etiqueta e !alta (Enter para adicionar)',
      add: 'Adicionar',
      addTip: 'Adicionar a tarefa (caixa vazia: abre o formulário completo)',
      search: 'Pesquisar…',
      allPriorities: 'Todas as prioridades',
      allLabels: 'Todas as etiquetas',
      dueFilter: { all: 'Qualquer data', overdue: 'Atrasadas', today: 'Para hoje', week: 'Próximos 7 dias', none: 'Sem data' },
      sortLabel: 'Ordenar',
      sorts: { manual: 'Ordem manual', priority: 'Prioridade', due: 'Data limite', created: 'Mais recentes' },
      clearDone: (n) => `Limpar concluídas (${n})`,
      clearDoneQ: (n) => `Remover ${n} tarefa${n === 1 ? ' concluída' : 's concluídas'}?`,
      emptyAll: 'Ainda não há tarefas. Escreve uma em cima e carrega Enter.',
      emptyFilter: 'Nenhuma tarefa corresponde aos filtros.',
      colEmpty: 'Nada aqui',
      colAdd: '+ Adicionar tarefa',
      colAddPlaceholder: 'Título da tarefa… (Enter)',
      showDone: 'Mostrar concluídas',
      hideDone: 'Esconder concluídas',
      stPending: (n) => `${n} por fazer`,
      stDoing: (n) => `${n} em curso`,
      stDone: (n) => `${n} feitas`,
      stOverdue: (n) => `${n} atrasadas`,
      progress: (p) => `${p}% concluído`,
      dueToday: 'Hoje',
      dueTomorrow: 'Amanhã',
      dueOverdue: (d) => (d === 1 ? 'Atrasada 1 dia' : `Atrasada ${d} dias`),
      toggleDone: 'Marcar como feita / por fazer',
      start: 'Marcar como em curso',
      pause: 'Voltar a "Por fazer"',
      expand: 'Mostrar subtarefas',
      edit: 'Editar',
      del: 'Apagar',
      deleteQ: 'Apagar?',
      yes: 'Sim',
      no: 'Não',
      newTask: 'Nova tarefa',
      editTask: 'Editar tarefa',
      close: 'Fechar',
      fTitle: 'Título',
      fStatus: 'Estado',
      fPriority: 'Prioridade',
      fDue: 'Data limite',
      fLabels: 'Etiquetas',
      fNotes: 'Notas',
      fSubtasks: 'Subtarefas',
      dueToday2: 'Hoje',
      dueTomorrow2: 'Amanhã',
      dueNextWeek: 'Para a semana',
      dueClear: 'Sem data',
      labelPlaceholder: 'Adicionar etiqueta… (Enter)',
      removeLabel: 'Remover etiqueta',
      subtaskPlaceholder: 'Adicionar subtarefa… (Enter)',
      removeSubtask: 'Remover subtarefa',
      created: 'Criada',
      completed: 'Concluída',
      titleRequired: 'Dá um título à tarefa.',
      discardMsg: 'Tens alterações por guardar. Descartar?',
      discard: 'Descartar',
      keepEditing: 'Continuar a editar',
      cancel: 'Cancelar',
      save: 'Guardar',
      untitled: '(sem título)',
      langTitle: 'Idioma',
      errTitle: 'Não é possível mostrar este ficheiro .td',
      errNotObject: 'O ficheiro tem de conter um objeto JSON ({ … }).',
      errInvalid: 'O ficheiro contém JSON inválido.',
      openAsText: 'Abrir como texto',
      notes: 'Tem notas',
    },
  };

  const T = () => I18N[lang];
  const t = (key, ...args) => {
    const v = T()[key];
    return typeof v === 'function' ? v(...args) : v;
  };

  const GB_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">' +
    '<clipPath id="gb-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>' +
    '<clipPath id="gb-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>' +
    '<g clip-path="url(#gb-s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/>' +
    '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>' +
    '<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#gb-t)" stroke="#C8102E" stroke-width="4"/>' +
    '<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>' +
    '<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>';
  const PT_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">' +
    '<rect width="30" height="20" fill="#FF0000"/><rect width="12" height="20" fill="#006600"/>' +
    '<circle cx="12" cy="10" r="3.7" fill="#FFE000"/><circle cx="12" cy="10" r="3.7" fill="none" stroke="#FF0000" stroke-width="0.35"/>' +
    '<rect x="10.35" y="8.3" width="3.3" height="3.5" rx="0.9" fill="#FFF" stroke="#FF0000" stroke-width="0.5"/>' +
    '<rect x="11.35" y="9.3" width="1.3" height="1.5" fill="#039"/></svg>';

  const STATUS_IDS = ['todo', 'doing', 'done'];
  const PRIO_IDS = ['urgente', 'alta', 'media', 'baixa'];
  const PRIO_RANK = { urgente: 0, alta: 1, media: 2, baixa: 3 };
  const PRIO_ALIASES = {
    urgente: 'urgente', urgent: 'urgente',
    alta: 'alta', high: 'alta',
    media: 'media', 'média': 'media', medium: 'media',
    baixa: 'baixa', low: 'baixa',
  };

  // ---------- helpers ----------
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === undefined || v === null || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else if (k === 'text') node.textContent = v;
        else if (k === 'value') node.value = v;
        else if (v === true) node.setAttribute(k, '');
        else node.setAttribute(k, v);
      }
    }
    for (const c of children.flat()) {
      if (c === null || c === undefined || c === false) continue;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return node;
  }

  const now = () => new Date().toISOString();
  const arr = (x) => (Array.isArray(x) ? x : []);
  const locale = () => (lang === 'pt' ? 'pt-PT' : 'en-GB');
  const pad = (n) => String(n).padStart(2, '0');
  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

  function isoDate(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  const todayStr = () => isoDate(new Date());
  function addDays(iso, n) {
    const [y, m, d] = iso.split('-').map(Number);
    return isoDate(new Date(y, m - 1, d + n));
  }
  function dayDiff(a, b) {
    // número de dias de a até b
    const pa = a.split('-').map(Number);
    const pb = b.split('-').map(Number);
    return Math.round((Date.UTC(pb[0], pb[1] - 1, pb[2]) - Date.UTC(pa[0], pa[1] - 1, pa[2])) / 86400000);
  }
  function fmtDay(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const sameYear = y === new Date().getFullYear();
    return date.toLocaleDateString(locale(), { day: '2-digit', month: 'short', ...(sameYear ? {} : { year: 'numeric' }) });
  }
  function fmtWeekday(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(locale(), { weekday: 'short' });
  }
  function fmtDateTime(iso) {
    const d = new Date(iso);
    if (!iso || isNaN(d)) return '';
    return d.toLocaleString(locale(), { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  // Texto e estado de uma data limite: { text, cls }
  function dueInfo(task) {
    if (!task.due) return null;
    const diff = dayDiff(todayStr(), task.due);
    if (task.status === 'done') return { text: fmtDay(task.due), cls: 'due-done' };
    if (diff < 0) return { text: t('dueOverdue', -diff), cls: 'due-overdue' };
    if (diff === 0) return { text: t('dueToday'), cls: 'due-today' };
    if (diff === 1) return { text: t('dueTomorrow'), cls: 'due-soon' };
    if (diff < 7) return { text: fmtWeekday(task.due) + ', ' + fmtDay(task.due), cls: 'due-soon' };
    return { text: fmtDay(task.due), cls: '' };
  }
  const isOverdue = (task) => task.status !== 'done' && !!task.due && task.due < todayStr();

  function labelHue(name) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
    return h;
  }

  function chip(name, onremove) {
    return el(
      'span',
      { class: 'chip', style: '--h:' + labelHue(name) },
      name,
      onremove
        ? el('button', { class: 'chip-x', title: t('removeLabel'), text: '×', onclick: (e) => { e.stopPropagation(); onremove(); } })
        : null
    );
  }

  function uniqLabels(list) {
    const out = [];
    for (const raw of list) {
      const s = String(raw).trim();
      if (s && !out.some((o) => o.toLowerCase() === s.toLowerCase())) out.push(s);
    }
    return out;
  }

  // ---------- estado ----------
  let state = { version: 1, nextId: 1, tasks: [] };
  let view = saved.view === 'kanban' ? 'kanban' : 'list';
  let doneOpen = saved.doneOpen === true;
  const filters = { q: '', prio: '', label: '', due: 'all', sort: 'manual' };
  const expanded = new Set();
  let loadError = null;
  let modal = null; // { id|null, draft, original, dirtyAsk, error }
  let confirmId = null; // tarefa com "Apagar?" visível
  let confirmClear = false;

  let rootEl, statsEl, mainEl, quickEl, toolbarEl;

  const saveUi = () => vscode.setState({ view, doneOpen });

  function normalizeTask(raw) {
    const tk = raw && typeof raw === 'object' ? raw : {};
    const status = STATUS_IDS.includes(tk.status) ? tk.status : tk.done === true ? 'done' : 'todo';
    const subtasks = arr(tk.subtasks)
      .map((s) => (typeof s === 'string' ? { text: s, done: false } : { text: String((s && s.text) || ''), done: !!(s && s.done) }))
      .filter((s) => s.text.trim() !== '' || s.done);
    return {
      id: Number(tk.id) || 0,
      title: typeof tk.title === 'string' ? tk.title : '',
      notes: typeof tk.notes === 'string' ? tk.notes : '',
      status,
      priority: PRIO_IDS.includes(tk.priority) ? tk.priority : 'media',
      due: typeof tk.due === 'string' && DATE_RE.test(tk.due) ? tk.due : '',
      labels: uniqLabels(arr(tk.labels)),
      subtasks,
      createdAt: typeof tk.createdAt === 'string' ? tk.createdAt : now(),
      updatedAt: typeof tk.updatedAt === 'string' ? tk.updatedAt : now(),
      completedAt: status === 'done' ? (typeof tk.completedAt === 'string' && tk.completedAt ? tk.completedAt : now()) : '',
    };
  }

  const findTask = (id) => state.tasks.find((x) => x.id === id);

  function setStatus(task, status) {
    if (task.status === status) return;
    task.status = status;
    task.completedAt = status === 'done' ? now() : '';
    task.updatedAt = now();
  }

  function commit() {
    vscode.postMessage({ type: 'update', data: state });
  }

  function addTask(fields, status) {
    const ts = now();
    const task = normalizeTask({
      id: state.nextId,
      title: '',
      status: status || 'todo',
      priority: 'media',
      createdAt: ts,
      updatedAt: ts,
      ...fields,
    });
    task.id = state.nextId;
    state.nextId += 1;
    if (task.status === 'done' && !task.completedAt) task.completedAt = ts;
    state.tasks.push(task);
    commit();
    return task;
  }

  function updateTask(id, fields) {
    const task = findTask(id);
    if (!task) return;
    const { status, ...rest } = fields;
    Object.assign(task, rest);
    if (status) setStatus(task, status);
    task.updatedAt = now();
    commit();
  }

  function removeTask(id) {
    state.tasks = state.tasks.filter((x) => x.id !== id);
    expanded.delete(id);
    commit();
  }

  function clearCompleted() {
    state.tasks = state.tasks.filter((x) => x.status !== 'done');
    commit();
  }

  // Move uma tarefa para um estado e posição (antes de beforeId; ao fim do grupo se for null)
  function moveTask(id, status, beforeId) {
    const task = findTask(id);
    if (!task) return;
    if (beforeId === id) return;
    state.tasks = state.tasks.filter((x) => x.id !== id);
    setStatus(task, status);
    let index = -1;
    if (beforeId !== null && beforeId !== undefined) index = state.tasks.findIndex((x) => x.id === beforeId);
    if (index < 0) {
      // ao fim das tarefas do mesmo estado (ou ao fim da lista)
      let last = -1;
      state.tasks.forEach((x, i) => { if (x.status === status) last = i; });
      index = last < 0 ? state.tasks.length : last + 1;
    }
    state.tasks.splice(index, 0, task);
    task.updatedAt = now();
    commit();
  }

  // ---------- adição rápida ----------
  // "Comprar leite #casa !alta" -> título + etiqueta + prioridade
  function parseQuick(text) {
    const labels = [];
    let priority = 'media';
    const words = [];
    for (const w of text.trim().split(/\s+/)) {
      if (w.length > 1 && w[0] === '#') labels.push(w.slice(1));
      else if (w.length > 1 && w[0] === '!' && PRIO_ALIASES[w.slice(1).toLowerCase()]) priority = PRIO_ALIASES[w.slice(1).toLowerCase()];
      else words.push(w);
    }
    return { title: words.join(' '), labels: uniqLabels(labels), priority };
  }

  function quickAdd(input, status) {
    const raw = input.value;
    if (!raw.trim()) return false;
    const parsed = parseQuick(raw);
    if (!parsed.title) return false;
    addTask({ title: parsed.title, labels: parsed.labels, priority: parsed.priority }, status);
    input.value = '';
    renderAll();
    return true;
  }

  // ---------- filtros e ordenação ----------
  function matches(task) {
    const q = filters.q.trim().toLowerCase();
    if (q) {
      const hay = [task.title, task.notes, task.labels.join(' '), task.subtasks.map((s) => s.text).join(' ')].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.prio && task.priority !== filters.prio) return false;
    if (filters.label && !task.labels.some((l) => l.toLowerCase() === filters.label.toLowerCase())) return false;
    if (filters.due !== 'all') {
      if (filters.due === 'none') {
        if (task.due) return false;
      } else {
        if (!task.due) return false;
        const diff = dayDiff(todayStr(), task.due);
        if (filters.due === 'overdue' && !(task.status !== 'done' && diff < 0)) return false;
        if (filters.due === 'today' && diff !== 0) return false;
        if (filters.due === 'week' && !(diff >= 0 && diff < 7)) return false;
      }
    }
    return true;
  }

  function sortTasks(list) {
    if (filters.sort === 'manual') return list;
    const out = list.slice();
    const cmpDue = (a, b) => (a.due || '9999-99-99').localeCompare(b.due || '9999-99-99');
    if (filters.sort === 'priority') out.sort((a, b) => PRIO_RANK[a.priority] - PRIO_RANK[b.priority] || cmpDue(a, b));
    else if (filters.sort === 'due') out.sort((a, b) => cmpDue(a, b) || PRIO_RANK[a.priority] - PRIO_RANK[b.priority]);
    else if (filters.sort === 'created') out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return out;
  }

  const visibleByStatus = (status) => sortTasks(state.tasks.filter((x) => x.status === status && matches(x)));
  const allLabels = () => uniqLabels(state.tasks.flatMap((x) => x.labels)).sort((a, b) => a.localeCompare(b));

  // ---------- idioma ----------
  function applyLang(next, persist) {
    const l = next === 'pt' ? 'pt' : 'en';
    if (l === lang && !persist) return;
    lang = l;
    document.documentElement.lang = lang;
    if (persist) vscode.postMessage({ type: 'setLang', lang });
    if (mainEl) {
      buildShell();
      renderAll();
      if (modal) renderModal(true);
    }
  }

  function buildLangToggle() {
    const wrap = el('div', { class: 'lang-toggle', role: 'group', 'aria-label': t('langTitle') });
    for (const [code, svg, name] of [['en', GB_SVG, 'English'], ['pt', PT_SVG, 'Português']]) {
      const btn = el('button', {
        class: 'lang-btn' + (lang === code ? ' active' : ''),
        title: name,
        'aria-label': name,
        'aria-pressed': lang === code ? 'true' : 'false',
        'data-lang': code,
        onclick: () => { if (lang !== code) applyLang(code, true); },
      });
      const flag = el('span', { class: 'flag' });
      flag.innerHTML = svg;
      btn.appendChild(flag);
      wrap.appendChild(btn);
    }
    return wrap;
  }

  // ---------- estrutura da página ----------
  function setView(v) {
    view = v;
    saveUi();
    document.body.classList.toggle('kanban-mode', view === 'kanban');
    renderAll();
    for (const b of document.querySelectorAll('.seg')) b.classList.toggle('active', b.dataset.view === view);
  }

  function buildShell() {
    rootEl = document.getElementById('app');
    rootEl.textContent = '';

    statsEl = el('div', { class: 'stats' });
    const segmented = el(
      'div',
      { class: 'segmented' },
      el('button', { class: 'seg' + (view === 'list' ? ' active' : ''), 'data-view': 'list', text: t('viewList'), onclick: () => setView('list') }),
      el('button', { class: 'seg' + (view === 'kanban' ? ' active' : ''), 'data-view': 'kanban', text: t('viewKanban'), onclick: () => setView('kanban') })
    );

    const header = el(
      'div',
      { class: 'header' },
      el('div', { class: 'header-left' }, el('h1', { text: t('title') }), segmented),
      el('div', { class: 'header-right' }, statsEl, buildLangToggle())
    );

    // adição rápida
    const input = el('input', {
      type: 'text',
      class: 'quick-input',
      placeholder: t('quickAdd'),
      onkeydown: (e) => {
        if (e.key === 'Enter' && !e.isComposing) {
          e.preventDefault();
          if (quickAdd(input, 'todo')) input.focus();
        }
      },
    });
    quickEl = el(
      'div',
      { class: 'quick' },
      input,
      el('button', {
        class: 'btn-primary',
        text: t('add'),
        title: t('addTip'),
        onclick: () => {
          // caixa vazia (ou só etiquetas): abre o formulário completo em vez de não fazer nada
          if (!input.value.trim()) return openModal(null);
          if (quickAdd(input, 'todo')) return input.focus();
          const p = parseQuick(input.value);
          input.value = '';
          openModal(null, { labels: p.labels, priority: p.priority });
        },
      })
    );

    // barra de filtros
    const search = el('input', {
      type: 'search',
      class: 'search',
      placeholder: t('search'),
      value: filters.q,
      oninput: (e) => { filters.q = e.target.value; renderMain(); renderStats(); },
    });
    const prioSel = el(
      'select',
      { class: 'f-prio', onchange: (e) => { filters.prio = e.target.value; renderMain(); } },
      el('option', { value: '', text: t('allPriorities') }),
      PRIO_IDS.map((p) => el('option', { value: p, text: T().priorities[p], selected: filters.prio === p }))
    );
    const labelSel = el('select', { class: 'f-label', onchange: (e) => { filters.label = e.target.value; renderMain(); } });
    labelSel.dataset.role = 'labels';
    const dueSel = el(
      'select',
      { class: 'f-due', onchange: (e) => { filters.due = e.target.value; renderMain(); renderStats(); } },
      Object.keys(T().dueFilter).map((k) => el('option', { value: k, text: T().dueFilter[k], selected: filters.due === k }))
    );
    const sortSel = el(
      'select',
      { class: 'f-sort', title: t('sortLabel'), onchange: (e) => { filters.sort = e.target.value; renderMain(); } },
      Object.keys(T().sorts).map((k) => el('option', { value: k, text: T().sorts[k], selected: filters.sort === k }))
    );
    const clearWrap = el('span', { class: 'clear-wrap' });
    toolbarEl = el('div', { class: 'toolbar' }, search, prioSel, labelSel, dueSel, sortSel, clearWrap);

    mainEl = el('div', { class: 'main' });
    rootEl.append(header, quickEl, toolbarEl, mainEl);
    document.body.classList.toggle('kanban-mode', view === 'kanban');
  }

  function renderAll() {
    if (!mainEl) return;
    renderStats();
    renderLabelFilter();
    renderClear();
    renderMain();
  }

  function renderStats() {
    if (!statsEl) return;
    const count = (s) => state.tasks.filter((x) => x.status === s).length;
    const total = state.tasks.length;
    const done = count('done');
    const overdue = state.tasks.filter(isOverdue).length;
    statsEl.textContent = '';
    const stat = (cls, text, onclick, active) =>
      el('span', { class: 'stat' + (onclick ? ' clickable' : '') + (active ? ' active' : ''), onclick }, el('span', { class: 'dot ' + cls }), el('span', { class: 'stat-text', text }));
    statsEl.append(stat('s-todo', t('stPending', count('todo'))), stat('s-doing', t('stDoing', count('doing'))), stat('s-done', t('stDone', done)));
    if (overdue > 0) {
      statsEl.append(
        stat('s-overdue', t('stOverdue', overdue), () => {
          filters.due = filters.due === 'overdue' ? 'all' : 'overdue';
          const sel = document.querySelector('.f-due');
          if (sel) sel.value = filters.due;
          renderMain();
          renderStats();
        }, filters.due === 'overdue')
      );
    }
    if (total > 0) {
      const pct = Math.round((done / total) * 100);
      statsEl.append(
        el('span', { class: 'progress', title: t('progress', pct) }, el('span', { class: 'progress-bar', style: `width:${pct}%` }), el('span', { class: 'progress-text', text: pct + '%' }))
      );
    }
  }

  function renderLabelFilter() {
    const sel = document.querySelector('select[data-role="labels"]');
    if (!sel) return;
    const labels = allLabels();
    if (filters.label && !labels.some((l) => l.toLowerCase() === filters.label.toLowerCase())) filters.label = '';
    sel.textContent = '';
    sel.append(el('option', { value: '', text: t('allLabels') }), labels.map((l) => el('option', { value: l, text: l, selected: filters.label.toLowerCase() === l.toLowerCase() })));
    sel.value = filters.label;
    sel.classList.toggle('hidden', labels.length === 0);
  }

  function renderClear() {
    const wrap = document.querySelector('.clear-wrap');
    if (!wrap) return;
    wrap.textContent = '';
    const n = state.tasks.filter((x) => x.status === 'done').length;
    if (n === 0) { confirmClear = false; return; }
    if (confirmClear) {
      wrap.append(
        el('span', { class: 'confirm' },
          t('clearDoneQ', n),
          el('button', { class: 'btn-danger', text: t('yes'), onclick: () => { confirmClear = false; clearCompleted(); renderAll(); } }),
          el('button', { class: 'btn-secondary', text: t('no'), onclick: () => { confirmClear = false; renderClear(); } }))
      );
    } else {
      wrap.append(el('button', { class: 'btn-secondary', text: t('clearDone', n), onclick: () => { confirmClear = true; renderClear(); } }));
    }
  }

  function renderMain() {
    if (!mainEl) return;
    const y = window.scrollY;
    mainEl.textContent = '';
    if (state.tasks.length === 0) {
      mainEl.append(el('div', { class: 'empty', text: t('emptyAll') }));
      return;
    }
    if (view === 'kanban') renderKanban();
    else renderList();
    window.scrollTo(0, y);
  }

  // ---------- arrastar e largar ----------
  let dragId = null;
  let dropTarget = null; // { status, id, after }
  let downTarget = null;

  document.addEventListener('mousedown', (e) => { downTarget = e.target; }, true);

  function clearDropMarks() {
    for (const n of document.querySelectorAll('.drop-before, .drop-after, .drop-over')) {
      n.classList.remove('drop-before', 'drop-after', 'drop-over');
    }
  }

  function makeDraggable(node, task) {
    node.setAttribute('draggable', 'true');
    node.addEventListener('dragstart', (e) => {
      if (e.target !== node) return;
      dragId = task.id;
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', String(task.id)); } catch { /* ignora */ }
      setTimeout(() => node.classList.add('dragging'), 0);
    });
    node.addEventListener('dragend', () => {
      dragId = null;
      dropTarget = null;
      node.classList.remove('dragging');
      clearDropMarks();
    });
    node.addEventListener('dragover', (e) => {
      if (dragId === null) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = node.getBoundingClientRect();
      const after = e.clientY > rect.top + rect.height / 2;
      clearDropMarks();
      node.classList.add(after ? 'drop-after' : 'drop-before');
      dropTarget = { status: task.status, id: task.id, after };
    });
  }

  // Um grupo (secção da lista ou coluna do Kanban) aceita tarefas largadas
  function makeDropZone(zone, status) {
    zone.addEventListener('dragover', (e) => {
      if (dragId === null) return;
      e.preventDefault();
      if (e.target === zone || !zone.querySelector('.drop-before, .drop-after')) {
        clearDropMarks();
        zone.classList.add('drop-over');
        dropTarget = { status, id: null, after: false };
      }
    });
    zone.addEventListener('drop', (e) => {
      if (dragId === null || !dropTarget) return;
      e.preventDefault();
      const target = dropTarget;
      const id = dragId;
      dragId = null;
      dropTarget = null;
      clearDropMarks();
      let beforeId = null;
      if (target.id !== null) {
        if (filters.sort !== 'manual' && findTask(id) && findTask(id).status === target.status) return; // sem ordem manual
        if (target.after) {
          const list = visibleByStatus(target.status).filter((x) => x.id !== id);
          const i = list.findIndex((x) => x.id === target.id);
          beforeId = i >= 0 && i + 1 < list.length ? list[i + 1].id : null;
        } else {
          beforeId = target.id;
        }
      }
      moveTask(id, target.status, beforeId);
      renderAll();
    });
  }

  // arrasta junto às margens da janela: a página desloca-se sozinha
  document.addEventListener('dragover', (e) => {
    if (dragId === null) return;
    const edge = 70;
    if (e.clientY < edge) window.scrollBy(0, -18);
    else if (window.innerHeight - e.clientY < edge) window.scrollBy(0, 18);
  });

  // ---------- peças comuns de uma tarefa ----------
  function prioBadge(task) {
    return el('span', { class: 'prio p-' + task.priority, title: T().priorities[task.priority], text: '⚑ ' + T().priorities[task.priority] });
  }

  function dueBadge(task) {
    const info = dueInfo(task);
    return info ? el('span', { class: 'due ' + info.cls, text: '🗓 ' + info.text }) : null;
  }

  function subProgress(task, onclick) {
    const total = task.subtasks.length;
    if (!total) return null;
    const done = task.subtasks.filter((s) => s.done).length;
    return el(
      'button',
      { class: 'subprog' + (done === total ? ' all' : ''), title: t('expand'), onclick },
      el('span', { class: 'subbar' }, el('span', { style: `width:${Math.round((done / total) * 100)}%` })),
      `${done}/${total}`
    );
  }

  // Só abre o diálogo quando o clique começou e acabou dentro do cartão (e não num controlo).
  // Protege contra cliques "fantasma" depois de fechar uma lista de opções.
  function openOnClick(node, task) {
    node.addEventListener('click', (e) => {
      if (e.target.closest('button, input, select, label, a, textarea')) return;
      if (!downTarget || !node.contains(downTarget)) return;
      downTarget = null;
      openModal(task.id);
    });
    node.setAttribute('tabindex', '0');
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target === node) openModal(task.id);
    });
  }

  function deleteControl(task) {
    if (confirmId === task.id) {
      return el('span', { class: 'confirm' },
        t('deleteQ'),
        el('button', { class: 'btn-danger', text: t('yes'), onclick: () => { confirmId = null; removeTask(task.id); renderAll(); } }),
        el('button', { class: 'btn-secondary', text: t('no'), onclick: () => { confirmId = null; renderMain(); } }));
    }
    return el('button', { class: 'icon-btn', title: t('del'), 'aria-label': t('del'), text: '✕', onclick: () => { confirmId = task.id; renderMain(); } });
  }

  function toggleDone(task) {
    updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' });
    renderAll();
  }

  // ---------- vista de lista ----------
  function renderList() {
    const sections = [
      { status: 'doing', open: true },
      { status: 'todo', open: true },
      { status: 'done', open: doneOpen },
    ];
    const anyVisible = state.tasks.some(matches);
    if (!anyVisible) {
      mainEl.append(el('div', { class: 'empty small', text: t('emptyFilter') }));
      return;
    }
    for (const sec of sections) {
      const tasks = visibleByStatus(sec.status);
      // "Em curso" e "Feito" só aparecem quando têm tarefas; "Por fazer" aparece sempre
      if (tasks.length === 0 && sec.status !== 'todo') continue;
      const head = el(
        'div',
        { class: 'sec-head' },
        el('span', { class: 'dot s-' + sec.status }),
        el('span', { class: 'sec-title', text: T().statuses[sec.status] }),
        el('span', { class: 'col-count', text: String(tasks.length) }),
        sec.status === 'done'
          ? el('button', {
              class: 'link-btn',
              text: doneOpen ? t('hideDone') : t('showDone'),
              onclick: () => { doneOpen = !doneOpen; saveUi(); renderMain(); },
            })
          : null
      );
      const body = el('div', { class: 'sec-body' });
      if (sec.open) {
        for (const task of tasks) body.append(buildRow(task));
        if (tasks.length === 0) body.append(el('div', { class: 'sec-empty', text: t('colEmpty') }));
      }
      const section = el('section', { class: 'section' }, head, body);
      makeDropZone(section, sec.status);
      mainEl.append(section);
    }
  }

  function buildRow(task) {
    const isDone = task.status === 'done';
    const isOpen = expanded.has(task.id);
    const check = el('input', {
      type: 'checkbox',
      class: 'task-check',
      title: t('toggleDone'),
      'aria-label': t('toggleDone'),
      checked: isDone,
      onchange: () => toggleDone(task),
    });
    check.checked = isDone;

    const meta = el(
      'div',
      { class: 'meta' },
      task.priority !== 'media' ? prioBadge(task) : null,
      dueBadge(task),
      subProgress(task, (e) => {
        e.stopPropagation();
        if (expanded.has(task.id)) expanded.delete(task.id);
        else expanded.add(task.id);
        renderMain();
      }),
      task.notes.trim() ? el('span', { class: 'has-notes', title: t('notes'), text: '≡' }) : null,
      task.labels.length ? el('span', { class: 'chips' }, task.labels.map((l) => chip(l))) : null
    );

    const startBtn =
      isDone
        ? null
        : el('button', {
            class: 'icon-btn play' + (task.status === 'doing' ? ' on' : ''),
            title: task.status === 'doing' ? t('pause') : t('start'),
            'aria-label': task.status === 'doing' ? t('pause') : t('start'),
            text: task.status === 'doing' ? '❚❚' : '▶',
            onclick: () => { updateTask(task.id, { status: task.status === 'doing' ? 'todo' : 'doing' }); renderAll(); },
          });

    const row = el(
      'div',
      { class: 'task prio-' + task.priority + (isDone ? ' is-done' : '') + (isOverdue(task) ? ' is-overdue' : ''), 'data-id': task.id },
      el('div', { class: 'task-main' },
        check,
        el('div', { class: 'task-body' },
          el('div', { class: 'task-title', text: task.title || t('untitled') }),
          meta),
        el('div', { class: 'task-actions' },
          startBtn,
          el('button', { class: 'icon-btn', title: t('edit'), 'aria-label': t('edit'), text: '✎', onclick: () => openModal(task.id) }),
          deleteControl(task))),
      isOpen && task.subtasks.length ? buildInlineSubtasks(task) : null
    );
    openOnClick(row, task);
    makeDraggable(row, task);
    return row;
  }

  function buildInlineSubtasks(task) {
    return el(
      'ul',
      { class: 'inline-subs' },
      task.subtasks.map((s, i) =>
        el('li', { class: s.done ? 'is-done' : '' },
          el('label', {},
            el('input', {
              type: 'checkbox',
              checked: s.done,
              onchange: (e) => {
                const subtasks = task.subtasks.map((x, j) => (j === i ? { ...x, done: e.target.checked } : x));
                updateTask(task.id, { subtasks });
                renderMain();
              },
            }),
            el('span', { text: s.text }))))
    );
  }

  // ---------- vista Kanban ----------
  function renderKanban() {
    const board = el('div', { class: 'board' });
    for (const status of STATUS_IDS) {
      const tasks = visibleByStatus(status);
      const body = el('div', { class: 'col-body' });
      for (const task of tasks) body.append(buildCard(task));
      if (tasks.length === 0) body.append(el('div', { class: 'col-empty', text: t('colEmpty') }));

      const column = el(
        'section',
        { class: 'column col-' + status, 'data-status': status },
        el('div', { class: 'col-head' },
          el('span', { class: 'dot s-' + status }),
          el('span', { class: 'col-title', text: T().statuses[status] }),
          el('span', { class: 'col-count', text: String(tasks.length) })),
        body,
        buildColumnAdd(status)
      );
      makeDropZone(column, status);
      board.append(column);
    }
    mainEl.append(board);
  }

  function buildColumnAdd(status) {
    const holder = el('div', { class: 'col-add-wrap' });
    const showButton = () => {
      holder.textContent = '';
      holder.append(el('button', { class: 'col-add', text: t('colAdd'), onclick: showInput }));
    };
    const showInput = () => {
      holder.textContent = '';
      const input = el('input', {
        type: 'text',
        placeholder: t('colAddPlaceholder'),
        onkeydown: (e) => {
          if (e.key === 'Enter' && !e.isComposing) {
            e.preventDefault();
            quickAdd(input, status);
          } else if (e.key === 'Escape') {
            showButton();
          }
        },
        onblur: () => { if (!input.value.trim()) showButton(); },
      });
      holder.append(input);
      input.focus();
    };
    showButton();
    return holder;
  }

  function buildCard(task) {
    const isOpen = expanded.has(task.id);
    const card = el(
      'div',
      { class: 'card prio-' + task.priority + (task.status === 'done' ? ' is-done' : '') + (isOverdue(task) ? ' is-overdue' : ''), 'data-id': task.id },
      el('div', { class: 'card-title', text: task.title || t('untitled') }),
      el('div', { class: 'meta' },
        task.priority !== 'media' ? prioBadge(task) : null,
        dueBadge(task),
        subProgress(task, (e) => {
          e.stopPropagation();
          if (expanded.has(task.id)) expanded.delete(task.id);
          else expanded.add(task.id);
          renderMain();
        }),
        task.notes.trim() ? el('span', { class: 'has-notes', title: t('notes'), text: '≡' }) : null),
      task.labels.length ? el('div', { class: 'chips' }, task.labels.map((l) => chip(l))) : null,
      isOpen && task.subtasks.length ? buildInlineSubtasks(task) : null
    );
    openOnClick(card, task);
    makeDraggable(card, task);
    return card;
  }

  // ---------- diálogo de edição ----------
  function blankDraft() {
    return { title: '', notes: '', status: 'todo', priority: 'media', due: '', labels: [], subtasks: [] };
  }

  const draftOf = (task) => ({
    title: task.title,
    notes: task.notes,
    status: task.status,
    priority: task.priority,
    due: task.due,
    labels: task.labels.slice(),
    subtasks: task.subtasks.map((s) => ({ ...s })),
  });

  function openModal(id, preset) {
    const task = id === null ? null : findTask(id);
    if (id !== null && !task) return;
    const draft = task ? draftOf(task) : { ...blankDraft(), ...(preset || {}) };
    modal = { id, draft, original: JSON.stringify(draft), dirtyAsk: false, error: false };
    renderModal(false);
  }

  function closeModal() {
    modal = null;
    const o = document.querySelector('.overlay');
    if (o) o.remove();
  }

  const isDirty = () => !!modal && JSON.stringify(modal.draft) !== modal.original;

  function requestClose() {
    if (!modal) return;
    if (isDirty() && !modal.dirtyAsk) {
      modal.dirtyAsk = true;
      renderModal(true);
      return;
    }
    closeModal();
  }

  function saveModal() {
    if (!modal) return;
    const d = modal.draft;
    // uma subtarefa por acabar de escrever também conta
    const pendingSub = document.querySelector('.sub-add');
    if (pendingSub && pendingSub.value.trim()) {
      d.subtasks.push({ text: pendingSub.value.trim(), done: false });
      pendingSub.value = '';
    }
    const pendingLabel = document.querySelector('.label-add');
    if (pendingLabel && pendingLabel.value.trim()) {
      d.labels = uniqLabels([...d.labels, ...pendingLabel.value.split(',')]);
      pendingLabel.value = '';
    }
    if (!d.title.trim()) {
      modal.error = true;
      renderModal(true);
      const ti = document.querySelector('.modal input.m-title');
      if (ti) ti.focus();
      return;
    }
    const fields = {
      title: d.title.trim(),
      notes: d.notes,
      priority: d.priority,
      due: d.due,
      labels: uniqLabels(d.labels),
      subtasks: d.subtasks.filter((s) => s.text.trim()).map((s) => ({ text: s.text.trim(), done: !!s.done })),
    };
    if (modal.id === null) {
      addTask({ ...fields, status: d.status }, d.status);
    } else {
      updateTask(modal.id, { ...fields, status: d.status });
    }
    closeModal();
    renderAll();
  }

  function field(label, input, cls) {
    return el('div', { class: 'field ' + (cls || '') }, el('label', { text: label }), input);
  }

  function renderModal(keepScroll) {
    const prev = document.querySelector('.modal-body');
    const scroll = keepScroll && prev ? prev.scrollTop : 0;
    const old = document.querySelector('.overlay');
    if (old) old.remove();
    if (!modal) return;
    const d = modal.draft;
    const task = modal.id === null ? null : findTask(modal.id);

    const touch = () => {
      // só atualiza o que depende do rascunho (sem perder o foco ao escrever)
      modal.error = false;
    };

    const titleInput = el('input', {
      type: 'text',
      class: 'm-title' + (modal.error ? ' invalid' : ''),
      value: d.title,
      placeholder: t('fTitle'),
      oninput: (e) => { d.title = e.target.value; e.target.classList.remove('invalid'); touch(); const m = document.querySelector('.m-error'); if (m) m.remove(); },
    });

    const statusSel = el('select', { onchange: (e) => { d.status = e.target.value; } },
      STATUS_IDS.map((s) => el('option', { value: s, text: T().statuses[s], selected: d.status === s })));
    const prioSel = el('select', { onchange: (e) => { d.priority = e.target.value; } },
      PRIO_IDS.map((p) => el('option', { value: p, text: T().priorities[p], selected: d.priority === p })));

    const dueInput = el('input', { type: 'date', value: d.due, onchange: (e) => { d.due = DATE_RE.test(e.target.value) ? e.target.value : ''; renderModal(true); } });
    const quickDue = el('div', { class: 'quick-due' },
      [['dueToday2', todayStr()], ['dueTomorrow2', addDays(todayStr(), 1)], ['dueNextWeek', addDays(todayStr(), 7)], ['dueClear', '']].map(([k, v]) =>
        el('button', { class: 'btn-secondary small' + (d.due === v ? ' on' : ''), text: t(k), onclick: () => { d.due = v; renderModal(true); } })));

    // etiquetas
    const labelList = allLabels();
    const dl = el('datalist', { id: 'label-list' }, labelList.map((l) => el('option', { value: l })));
    const chipsBox = el('div', { class: 'chips' }, d.labels.map((l) => chip(l, () => { d.labels = d.labels.filter((x) => x !== l); renderModal(true); })));
    const labelInput = el('input', {
      type: 'text',
      class: 'label-add',
      list: 'label-list',
      placeholder: t('labelPlaceholder'),
      onkeydown: (e) => {
        if ((e.key === 'Enter' || e.key === ',') && !e.isComposing) {
          e.preventDefault();
          e.stopPropagation();
          const v = e.target.value.replace(/^#/, '');
          if (v.trim()) {
            d.labels = uniqLabels([...d.labels, ...v.split(',')]);
            renderModal(true);
            const again = document.querySelector('.label-add');
            if (again) again.focus();
          }
        }
      },
    });

    // subtarefas
    const subList = el('div', { class: 'subtasks' },
      d.subtasks.map((s, i) =>
        el('div', { class: 'subtask' + (s.done ? ' is-done' : '') },
          el('input', { type: 'checkbox', checked: s.done, onchange: (e) => { s.done = e.target.checked; e.target.closest('.subtask').classList.toggle('is-done', s.done); } }),
          el('input', { type: 'text', class: 'sub-text', value: s.text, oninput: (e) => { s.text = e.target.value; } }),
          el('button', { class: 'icon-btn', title: t('removeSubtask'), 'aria-label': t('removeSubtask'), text: '✕', onclick: () => { d.subtasks.splice(i, 1); renderModal(true); } }))));
    const subInput = el('input', {
      type: 'text',
      class: 'sub-add',
      placeholder: t('subtaskPlaceholder'),
      onkeydown: (e) => {
        if (e.key === 'Enter' && !e.isComposing) {
          e.preventDefault();
          e.stopPropagation();
          const v = e.target.value.trim();
          if (v) {
            d.subtasks.push({ text: v, done: false });
            renderModal(true);
            const again = document.querySelector('.sub-add');
            if (again) again.focus();
          }
        }
      },
    });

    const notes = el('textarea', { rows: '5', placeholder: t('fNotes'), oninput: (e) => { d.notes = e.target.value; } });
    notes.value = d.notes;

    const body = el('div', { class: 'modal-body' },
      field(t('fTitle'), titleInput, 'full'),
      modal.error ? el('div', { class: 'm-error', text: t('titleRequired') }) : null,
      el('div', { class: 'form-grid' },
        field(t('fStatus'), statusSel),
        field(t('fPriority'), prioSel),
        field(t('fDue'), el('div', { class: 'due-field' }, dueInput, quickDue), 'full')),
      field(t('fLabels'), el('div', {}, chipsBox, labelInput, dl), 'full'),
      field(t('fSubtasks'), el('div', {}, subList, subInput), 'full'),
      field(t('fNotes'), notes, 'full'),
      task
        ? el('div', { class: 'dates' },
            `${t('created')}: ${fmtDateTime(task.createdAt)}`,
            task.completedAt ? ` · ${t('completed')}: ${fmtDateTime(task.completedAt)}` : '')
        : null
    );

    const banner = modal.dirtyAsk
      ? el('div', { class: 'banner' },
          el('span', { text: t('discardMsg') }),
          el('button', { class: 'btn-danger', text: t('discard'), onclick: closeModal }),
          el('button', { class: 'btn-secondary', text: t('keepEditing'), onclick: () => { modal.dirtyAsk = false; renderModal(true); } }))
      : null;

    const actions = el('div', { class: 'modal-actions' },
      task
        ? (modal.confirmDelete
            ? el('span', { class: 'confirm left' },
                t('deleteQ'),
                el('button', { class: 'btn-danger', text: t('yes'), onclick: () => { const id = modal.id; closeModal(); removeTask(id); renderAll(); } }),
                el('button', { class: 'btn-secondary', text: t('no'), onclick: () => { modal.confirmDelete = false; renderModal(true); } }))
            : el('button', { class: 'btn-secondary left', text: t('del'), onclick: () => { modal.confirmDelete = true; renderModal(true); } }))
        : null,
      el('button', { class: 'btn-secondary', text: t('cancel'), onclick: requestClose }),
      el('button', { class: 'btn-primary', text: t('save'), onclick: saveModal }));

    const overlay = el(
      'div',
      {
        class: 'overlay',
        onmousedown: (e) => { if (e.target === overlay) overlay.dataset.down = '1'; else delete overlay.dataset.down; },
        onclick: (e) => { if (e.target === overlay && overlay.dataset.down === '1') requestClose(); },
      },
      el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true' },
        el('div', { class: 'modal-head' },
          el('h2', { text: task ? t('editTask') : t('newTask') }),
          el('button', { class: 'icon-btn', title: t('close'), 'aria-label': t('close'), text: '✕', onclick: requestClose })),
        banner,
        body,
        actions)
    );
    document.body.appendChild(overlay);
    const nb = overlay.querySelector('.modal-body');
    if (nb) nb.scrollTop = scroll;
    if (!keepScroll) titleInput.focus();
  }

  document.addEventListener('keydown', (e) => {
    if (!modal) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      requestClose();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveModal();
    } else if (e.key === 'Enter' && e.target && e.target.classList && e.target.classList.contains('m-title')) {
      e.preventDefault();
      saveModal();
    }
  });

  // ---------- erro ----------
  function renderError(code, detail) {
    const root = document.getElementById('app');
    root.textContent = '';
    const msg = code === 'td-not-object' ? t('errNotObject') : t('errInvalid');
    root.append(
      el('div', { class: 'error-box' },
        el('h2', { text: t('errTitle') }),
        el('p', { text: msg }),
        detail ? el('pre', { text: detail }) : null,
        el('button', { class: 'btn-primary', text: t('openAsText'), onclick: () => vscode.postMessage({ type: 'openText' }) }))
    );
  }

  // ---------- mensagens da extensão ----------
  window.addEventListener('message', (event) => {
    const msg = event.data;

    if (msg.type === 'lang') {
      applyLang(msg.lang, false);
      return;
    }
    if (msg.type !== 'load') return;

    const langChanged = !!msg.lang && msg.lang !== lang;
    if (msg.lang) {
      lang = msg.lang === 'pt' ? 'pt' : 'en';
      document.documentElement.lang = lang;
    }

    if (msg.error) {
      document.body.classList.remove('kanban-mode');
      loadError = { code: msg.error, detail: msg.detail };
      statsEl = mainEl = quickEl = toolbarEl = null;
      closeModal();
      renderError(msg.error, msg.detail);
      return;
    }

    const wasError = loadError !== null || !mainEl;
    loadError = null;
    state = {
      version: 1,
      nextId: msg.data.nextId,
      tasks: msg.data.tasks.map(normalizeTask),
    };

    if (wasError || langChanged) buildShell();
    renderAll();
    if (langChanged && modal) renderModal(true);
    if (modal && modal.id !== null && !findTask(modal.id)) closeModal();
  });

  // quando muda o dia, as datas limite (atrasadas/hoje) têm de ser recalculadas
  let lastDay = todayStr();
  setInterval(() => {
    if (todayStr() !== lastDay) {
      lastDay = todayStr();
      renderAll();
    }
  }, 60000);

  vscode.postMessage({ type: 'ready' });
})();
