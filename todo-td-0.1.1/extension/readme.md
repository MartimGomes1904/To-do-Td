# Gomes Task Board

**English** below · **Português** mais abaixo

---

## English

A VS Code extension that opens `.td` files in a visual editor for your to-do lists: a list or a Kanban board, priorities, due dates, labels, notes and subtasks.

### Getting started

1. Create a file with the `.td` extension (for example `tasks.td`), or run **To-do: New .td file** (Ctrl+Shift+P), or use the **+** button in the To-do side panel.
2. Type a task in the box at the top and press Enter. Words starting with `#` become labels and `!high`, `!urgent` or `!low` set the priority (for example `Buy milk #home !high`).
3. Click a task to edit it.

Everything is saved in the `.td` file itself (JSON), so Ctrl+Z, Save and Git work like with any other file. To see the raw JSON: **To-do: Open as text (JSON)**.

### Features

- **List and Kanban:** switch at the top. The list groups tasks as *In progress*, *To do* and *Done* (completed tasks can be hidden). The Kanban board has three columns side by side, with no horizontal scroll bar.
- **Drag and drop:** drag a task to reorder it, or to another group or column to change its status.
- **Priority and due date:** four priority levels, and due dates with *Today / Tomorrow / Next week* shortcuts. Overdue tasks are highlighted.
- **Subtasks:** a checklist per task with a progress bar. Tick them straight from the list.
- **Labels, notes, search and filters:** filter by priority, label or date; sort by priority, due date or creation.
- **Clear completed:** removes all finished tasks in one click (with confirmation).
- **Side bar:** a checklist icon in the Activity Bar lists every `.td` file in the workspace. Hover one to see how many tasks are left, click to open it. With no `.td` file yet, a small panel offers a button to create one (the name is asked in VS Code's top input box).
- **Release notes:** a page opens after each update. Turn it off with the `todoTd.showReleaseNotes` setting (or its checkbox); reopen it with "To-do: Show release notes".
- **English / Português:** the flags at the top right of the editor switch the language. By default the editor uses the language of VS Code. Your choice is remembered.

---

## Português

Uma extensão para o VS Code que abre ficheiros `.td` num editor visual para as tuas listas de tarefas: lista ou quadro Kanban, prioridades, datas limite, etiquetas, notas e subtarefas.

### Como começar

1. Cria um ficheiro com a extensão `.td` (por exemplo `tarefas.td`), ou executa **To-do: Novo ficheiro .td** (Ctrl+Shift+P), ou usa o botão **+** do painel lateral To-do.
2. Escreve uma tarefa na caixa de cima e carrega Enter. As palavras que começam por `#` tornam-se etiquetas e `!alta`, `!urgente` ou `!baixa` definem a prioridade (por exemplo `Comprar leite #casa !alta`).
3. Clica numa tarefa para a editar.

Tudo fica guardado no próprio ficheiro `.td` (JSON), por isso Ctrl+Z, Guardar e Git funcionam como em qualquer outro ficheiro. Para ver o JSON em bruto: **To-do: Abrir como texto (JSON)**.

### Funcionalidades

- **Lista e Kanban:** alterna em cima. A lista agrupa as tarefas em *Em curso*, *Por fazer* e *Feito* (as concluídas podem ficar escondidas). O quadro Kanban tem três colunas lado a lado, sem barra de scroll horizontal.
- **Arrastar e largar:** arrasta uma tarefa para a reordenar, ou para outro grupo ou coluna para mudar o estado.
- **Prioridade e data limite:** quatro níveis de prioridade, e datas limite com atalhos *Hoje / Amanhã / Para a semana*. As tarefas atrasadas ficam destacadas.
- **Subtarefas:** uma lista de verificação por tarefa, com barra de progresso. Marcas diretamente na lista.
- **Etiquetas, notas, pesquisa e filtros:** filtra por prioridade, etiqueta ou data; ordena por prioridade, data limite ou criação.
- **Limpar concluídas:** remove todas as tarefas terminadas de uma vez (com confirmação).
- **Barra lateral:** um ícone de lista na Barra de Atividade mostra todos os ficheiros `.td` do workspace. Passa o rato por cima para ver quantas tarefas faltam e clica para abrir. Sem nenhum `.td`, aparece um pequeno painel com um botão para criar um (o nome é pedido na caixa de texto do VS Code, no topo).
- **Notas de versão:** abre uma página após cada atualização. Desliga-a na definição `todoTd.showReleaseNotes` (ou na caixa da própria página); reabre-a com "To-do: Mostrar notas de versão".
- **English / Português:** as bandeiras no canto superior direito do editor mudam o idioma. Por omissão, o editor usa o idioma do VS Code. A tua escolha fica guardada.
