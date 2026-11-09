const vscode = require('vscode');

const VIEW_TYPE = 'todoTd.editor';
const LANG_KEY = 'todoTd.lang';
const VERSION_KEY = 'todoTd.lastVersion';
const PENDING = ['todo', 'doing'];

// ---------- Idiomas ----------
// Sem preferência guardada, usa o idioma do VS Code (pt* -> português, resto -> inglês).

const STATUS_LABELS = {
  en: { todo: 'To do', doing: 'In progress', done: 'Done' },
  pt: { todo: 'Por fazer', doing: 'Em curso', done: 'Feito' },
};

const STR = {
  en: {
    openFolderFirst: 'Open a folder in VS Code first.',
    newFilePrompt: 'Name of the new to-do file',
    newFileInvalid: 'The name cannot contain / \\ : * ? " < > |',
    openFile: 'Open to-do list',
    treePending: (n) => (n === 0 ? 'Nothing left to do' : n === 1 ? '1 task left' : `${n} tasks left`),
    treeTotal: (n) => `${n} in total`,
    treeOverdue: (n) => `⚠ Overdue: ${n}`,
    rnTitle: 'Release notes',
    rnShow: 'Show this page after each update',
  },
  pt: {
    openFolderFirst: 'Abre primeiro uma pasta no VS Code.',
    newFilePrompt: 'Nome do novo ficheiro de tarefas',
    newFileInvalid: 'O nome não pode conter / \\ : * ? " < > |',
    openFile: 'Abrir lista de tarefas',
    treePending: (n) => (n === 0 ? 'Nada por fazer' : n === 1 ? '1 tarefa por fazer' : `${n} tarefas por fazer`),
    treeTotal: (n) => `${n} no total`,
    treeOverdue: (n) => `⚠ Atrasadas: ${n}`,
    rnTitle: 'Notas de versão',
    rnShow: 'Mostrar esta página após cada atualização',
  },
};

let extContext = null;
const panels = new Set(); // webviews abertos, para propagar a mudança de idioma

function getLang() {
  const stored = extContext && extContext.globalState.get(LANG_KEY);
  if (stored === 'en' || stored === 'pt') return stored;
  return /^pt/i.test(vscode.env.language || '') ? 'pt' : 'en';
}

const S = () => STR[getLang()];

async function setLang(lang) {
  if (lang !== 'en' && lang !== 'pt') return;
  await extContext.globalState.update(LANG_KEY, lang);
  for (const w of panels) w.postMessage({ type: 'lang', lang });
  scheduleRefresh();
}

// ---------- Documento ----------

function emptyData() {
  return { version: 1, nextId: 1, tasks: [] };
}

// Lê o texto do ficheiro .td e devolve { data } ou { error }
function parseDocument(text) {
  if (!text || !text.trim()) return { data: emptyData() };
  try {
    const raw = JSON.parse(text);
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { error: 'td-not-object' };
    const tasks = Array.isArray(raw.tasks) ? raw.tasks : [];
    let maxId = 0;
    for (const t of tasks) {
      if (t && typeof t.id === 'number' && t.id > maxId) maxId = t.id;
    }
    const nextId = Math.max(Number(raw.nextId) || 1, maxId + 1);
    return { data: { version: 1, nextId, tasks: tasks.filter((t) => t && typeof t === 'object') } };
  } catch (e) {
    return { error: 'td-invalid-json', detail: e.message };
  }
}

function baseName(uri) {
  const p = uri.path;
  return p.slice(p.lastIndexOf('/') + 1);
}

function todayIso() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

class TodoEditorProvider {
  constructor(context) {
    this.context = context;
  }

  static register(context) {
    return vscode.window.registerCustomEditorProvider(VIEW_TYPE, new TodoEditorProvider(context), {
      webviewOptions: { retainContextWhenHidden: true },
      supportsMultipleEditorsPerDocument: false,
    });
  }

  async resolveCustomTextEditor(document, webviewPanel) {
    const webview = webviewPanel.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, 'media')],
    };
    webview.html = this.getHtml(webview);
    panels.add(webview);

    let lastWritten = null;

    const sendDocument = () => {
      webview.postMessage({ type: 'load', lang: getLang(), today: todayIso(), ...parseDocument(document.getText()) });
    };

    const changeSub = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() !== document.uri.toString()) return;
      // Ignora as alterações que nós próprios acabámos de escrever
      if (lastWritten !== null && document.getText() === lastWritten) return;
      sendDocument();
    });

    // Quando o separador volta a ficar visível, atualiza também o "hoje" (datas limite)
    const viewSub = webviewPanel.onDidChangeViewState((e) => {
      if (e.webviewPanel.visible) sendDocument();
    });

    webviewPanel.onDidDispose(() => {
      changeSub.dispose();
      viewSub.dispose();
      panels.delete(webview);
    });

    webview.onDidReceiveMessage(async (msg) => {
      switch (msg.type) {
        case 'ready':
          sendDocument();
          break;
        case 'setLang':
          await setLang(msg.lang);
          break;
        case 'update': {
          const text = JSON.stringify(msg.data, null, 2) + '\n';
          if (text === document.getText()) return;
          lastWritten = text;
          const edit = new vscode.WorkspaceEdit();
          edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), text);
          await vscode.workspace.applyEdit(edit);
          break;
        }
        case 'openText':
          await vscode.commands.executeCommand('vscode.openWith', document.uri, 'default');
          break;
      }
    });
  }

  getHtml(webview) {
    const mediaUri = (file) => webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', file));
    const nonce = getNonce();
    const csp = [
      "default-src 'none'",
      `style-src ${webview.cspSource}`,
      `img-src ${webview.cspSource}`,
      `script-src 'nonce-${nonce}'`,
    ].join('; ');

    return /* html */ `<!DOCTYPE html>
<html lang="${getLang()}">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="${csp}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${mediaUri('editor.css')}">
  <title>To-do</title>
</head>
<body>
  <div id="app"></div>
  <script nonce="${nonce}" src="${mediaUri('editor.js')}"></script>
</body>
</html>`;
  }
}

function getNonce() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < 32; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

// ---------- Painel lateral ----------

let refreshTimer = null;
let treeView = null;
const treeChanged = new vscode.EventEmitter();
let lastFiles = []; // [{ uri, pending, total, byStatus, overdue }]

const setContext = (key, value) => vscode.commands.executeCommand('setContext', key, value);

async function collectFiles() {
  const uris = await vscode.workspace.findFiles('**/*.td', '**/node_modules/**', 50);
  const out = [];
  for (const uri of uris) {
    const open = vscode.workspace.textDocuments.find((d) => d.uri.toString() === uri.toString());
    let text;
    if (open) {
      text = open.getText();
    } else {
      try {
        text = Buffer.from(await vscode.workspace.fs.readFile(uri)).toString('utf8');
      } catch {
        continue;
      }
    }
    const parsed = parseDocument(text);
    if (parsed.error) continue;
    out.push({ uri, tasks: parsed.data.tasks });
  }
  return out;
}

// Lê todos os .td do workspace e atualiza a lista do painel lateral, o número no ícone
// e os contextos usados pelo ecrã de boas-vindas.
async function refresh() {
  const files = await collectFiles();
  const lang = getLang();
  const s = S();
  const today = todayIso();

  let pending = 0;
  lastFiles = [];
  for (const f of files) {
    const byStatus = {};
    let filePending = 0;
    let overdue = 0;
    for (const t of f.tasks) {
      const status = STATUS_LABELS.en[t.status] ? t.status : 'todo';
      if (!PENDING.includes(status)) continue;
      filePending += 1;
      byStatus[status] = (byStatus[status] || 0) + 1;
      if (typeof t.due === 'string' && t.due && t.due < today) overdue += 1;
    }
    pending += filePending;
    lastFiles.push({ uri: f.uri, pending: filePending, total: f.tasks.length, byStatus, overdue });
  }
  lastFiles.sort((a, b) => vscode.workspace.asRelativePath(a.uri).localeCompare(vscode.workspace.asRelativePath(b.uri)));

  await setContext('todoTd.lang', lang);
  await setContext('todoTd.noFiles', files.length === 0);
  treeChanged.fire();
  if (treeView) {
    treeView.badge = pending > 0 ? { value: pending, tooltip: s.treePending(pending) } : undefined;
  }
}

function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    refresh().catch(() => {});
  }, 400);
}

// Lista do painel lateral: um item por ficheiro .td; ao passar o rato mostra as tarefas por fazer.
class TodoFilesProvider {
  constructor(context) {
    this.context = context;
    this.onDidChangeTreeData = treeChanged.event;
  }

  getTreeItem(f) {
    const s = S();
    const labels = STATUS_LABELS[getLang()];
    const rel = vscode.workspace.asRelativePath(f.uri);
    const name = baseName(f.uri);
    const dir = rel.includes('/') ? rel.slice(0, rel.lastIndexOf('/')) : '';

    const item = new vscode.TreeItem(name, vscode.TreeItemCollapsibleState.None);
    item.id = f.uri.toString();
    item.description = dir;
    item.iconPath = vscode.Uri.joinPath(this.context.extensionUri, 'icons', 'td.svg');
    item.contextValue = 'todoFile';
    item.command = { command: 'todoTd.openFile', title: s.openFile, arguments: [f.uri] };

    const md = new vscode.MarkdownString();
    md.appendMarkdown('**');
    md.appendText(name);
    md.appendMarkdown('**\n\n');
    md.appendText(`${s.treePending(f.pending)} · ${s.treeTotal(f.total)}`);
    const lines = PENDING.filter((k) => f.byStatus[k]).map((k) => `- ${labels[k]}: ${f.byStatus[k]}`);
    if (lines.length) md.appendMarkdown('\n\n' + lines.join('\n'));
    if (f.overdue) md.appendMarkdown(`\n\n${s.treeOverdue(f.overdue)}`);
    item.tooltip = md;
    return item;
  }

  getChildren(element) {
    return element ? [] : lastFiles;
  }
}

async function openFile(uri) {
  if (uri) await vscode.commands.executeCommand('vscode.openWith', uri, VIEW_TYPE);
}

// ---------- Notas de versão ----------

const NOTES = require('./releaseNotes');
let notesPanel = null;

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function notesHtml(nonce, webview) {
  const cspSource = webview.cspSource;
  const flag = (code) =>
    webview.asWebviewUri(vscode.Uri.joinPath(extContext.extensionUri, 'icons', `flag-${code}.png`));
  const lang = getLang();
  const s = S();
  const enabled = vscode.workspace.getConfiguration('todoTd').get('showReleaseNotes', true);
  const releases = NOTES.map((r) => {
    const t = r[lang];
    const secs = t.sections
      .map((sec) => `<h3>${esc(sec.heading)}</h3><ul>${sec.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`)
      .join('');
    return `<section><h2><span class="v">v${esc(r.version)}</span> <span class="d">- (${esc(r.date)})</span></h2><h4>${esc(t.title)}</h4>${secs}</section>`;
  }).join('');
  const other = lang === 'pt' ? 'en' : 'pt';
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${cspSource}; style-src ${cspSource} 'nonce-${nonce}'; script-src 'nonce-${nonce}';">
<style nonce="${nonce}">
body{font-family:var(--vscode-font-family);color:var(--vscode-foreground);padding:8px 28px 40px;max-width:860px;line-height:1.55}
h1{font-weight:600;border-bottom:1px solid var(--vscode-panel-border);padding-bottom:8px;display:flex;align-items:center;gap:12px}
h1 .sp{flex:1}
h2{border-bottom:1px solid var(--vscode-panel-border);padding-bottom:6px;margin-top:32px;font-weight:600}
h2 .v{color:var(--vscode-textLink-foreground)} h2 .d{opacity:.85}
h3{margin:18px 0 4px;font-size:1.05em} h4{margin:4px 0 0;font-weight:500;opacity:.85}
ul{margin:4px 0;padding-left:22px} li{margin:3px 0}
.lang{display:inline-flex;align-items:center;gap:8px;background:transparent;border:1px solid var(--vscode-panel-border);color:var(--vscode-foreground);border-radius:6px;padding:2px 10px;cursor:pointer;font-size:.8em}
.lang img{width:20px;height:auto;border-radius:2px}
.lang:hover{background:var(--vscode-toolbar-hoverBackground)}
.opt{margin-top:36px;padding-top:14px;border-top:1px solid var(--vscode-panel-border);display:flex;align-items:center;gap:8px}
</style></head><body>
<h1>${esc(s.rnTitle)}<span class="sp"></span><button class="lang" id="lang"><img src="${flag(lang === 'pt' ? 'gb' : 'pt')}" alt=""> ${lang === 'pt' ? 'English' : 'Português'}</button></h1>
${releases}
<label class="opt"><input type="checkbox" id="show" ${enabled ? 'checked' : ''}> ${esc(s.rnShow)}</label>
<script nonce="${nonce}">
const vscode = acquireVsCodeApi();
document.getElementById('show').addEventListener('change', (e) => vscode.postMessage({ type: 'show', value: e.target.checked }));
document.getElementById('lang').addEventListener('click', () => vscode.postMessage({ type: 'lang', lang: '${other}' }));
</script></body></html>`;
}

function showReleaseNotes() {
  const render = () => {
    notesPanel.title = S().rnTitle;
    notesPanel.webview.html = notesHtml(getNonce(), notesPanel.webview);
  };
  if (notesPanel) {
    render();
    notesPanel.reveal();
    return;
  }
  notesPanel = vscode.window.createWebviewPanel('todoTd.notes', S().rnTitle, vscode.ViewColumn.Active, {
    enableScripts: true,
    localResourceRoots: [vscode.Uri.joinPath(extContext.extensionUri, 'icons')],
  });
  notesPanel.iconPath = vscode.Uri.joinPath(extContext.extensionUri, 'icons', 'icon.png');
  notesPanel.onDidDispose(() => {
    notesPanel = null;
  });
  notesPanel.webview.onDidReceiveMessage(async (m) => {
    if (m.type === 'show') {
      await vscode.workspace
        .getConfiguration('todoTd')
        .update('showReleaseNotes', !!m.value, vscode.ConfigurationTarget.Global);
    } else if (m.type === 'lang') {
      await setLang(m.lang);
      render();
    }
  });
  render();
}

// Mostra as notas quando a versão instalada mudou desde a última vez (e a opção está ligada).
function maybeShowReleaseNotes(context) {
  const current = context.extension && context.extension.packageJSON.version;
  if (!current) return;
  const previous = context.globalState.get(VERSION_KEY);
  if (previous === current) return;
  context.globalState.update(VERSION_KEY, current);
  if (vscode.workspace.getConfiguration('todoTd').get('showReleaseNotes', true)) showReleaseNotes();
}

// ---------- Comandos ----------

async function newFile() {
  const folder = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0];
  if (!folder) {
    vscode.window.showWarningMessage(S().openFolderFirst);
    return;
  }
  let name = await vscode.window.showInputBox({
    prompt: S().newFilePrompt,
    value: 'tarefas.td',
    valueSelection: [0, 7], // seleciona só "tarefas" e mantém a extensão
    validateInput: (v) => (/[\\\/:*?"<>|]/.test(v) ? S().newFileInvalid : undefined),
  });
  name = name && name.trim();
  if (!name) return;
  if (!name.endsWith('.td')) name += '.td';
  const uri = vscode.Uri.joinPath(folder.uri, name);
  try {
    await vscode.workspace.fs.stat(uri);
  } catch {
    const content = Buffer.from(JSON.stringify(emptyData(), null, 2) + '\n', 'utf8');
    await vscode.workspace.fs.writeFile(uri, content);
  }
  await vscode.commands.executeCommand('vscode.openWith', uri, VIEW_TYPE);
}

async function openAsText() {
  const tab = vscode.window.tabGroups.activeTabGroup.activeTab;
  const input = tab && tab.input;
  if (input && input.uri) {
    await vscode.commands.executeCommand('vscode.openWith', input.uri, 'default');
  }
}

function activate(context) {
  extContext = context;

  treeView = vscode.window.createTreeView('todoTd.files', {
    treeDataProvider: new TodoFilesProvider(context),
  });
  setContext('todoTd.lang', getLang());

  const watcher = vscode.workspace.createFileSystemWatcher('**/*.td');

  context.subscriptions.push(
    treeView,
    treeChanged,
    watcher,
    watcher.onDidCreate(scheduleRefresh),
    watcher.onDidChange(scheduleRefresh),
    watcher.onDidDelete(scheduleRefresh),
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.path.toLowerCase().endsWith('.td')) scheduleRefresh();
    }),
    vscode.workspace.onDidChangeWorkspaceFolders(scheduleRefresh),
    TodoEditorProvider.register(context),
    vscode.commands.registerCommand('todoTd.newFile', newFile),
    vscode.commands.registerCommand('todoTd.openAsText', openAsText),
    vscode.commands.registerCommand('todoTd.openFile', openFile),
    vscode.commands.registerCommand('todoTd.showReleaseNotes', showReleaseNotes)
  );

  maybeShowReleaseNotes(context);

  // primeira leitura imediata, para o painel lateral não aparecer vazio
  refresh().catch(() => {});
}

function deactivate() {
  clearTimeout(refreshTimer);
}

module.exports = { activate, deactivate };
