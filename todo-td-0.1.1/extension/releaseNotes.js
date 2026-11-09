'use strict';

// Notas de versão, da mais recente para a mais antiga. Ao publicar uma versão nova,
// acrescenta uma entrada no topo (e atualiza "version" no package.json).
module.exports = [
  {
    version: '0.1.1',
    date: '2026-11-08',
    en: { title: 'Add button fix', sections: [
      { heading: 'Bug fixes', items: ['The Add button now opens the full task form when the box is empty, instead of doing nothing.'] },
    ] },
    pt: { title: 'Correção do botão Adicionar', sections: [
      { heading: 'Correções', items: ['O botão Adicionar abre agora o formulário completo quando a caixa está vazia, em vez de não fazer nada.'] },
    ] },
  },
  {
    version: '0.1.0',
    date: '2026-11-08',
    en: {
      title: 'First release',
      sections: [
        { heading: 'What\'s new', items: [
          'Visual editor for .td files with a list view and a Kanban view (To do, In progress, Done).',
          'Quick add: type a title and press Enter. Words starting with # become labels.',
          'Priority, due date with overdue highlighting, labels, notes and subtasks with progress.',
          'Drag tasks to reorder them or to change their status.',
          'Search and filters, and a button to clear completed tasks.',
          'Activity Bar panel listing every .td file, with unresolved counts on hover.',
          'English / Portuguese interface (defaults to the VS Code language).',
          'This release notes page, shown after each update (can be turned off).',
        ] },
      ],
    },
    pt: {
      title: 'Primeira versão',
      sections: [
        { heading: 'Novidades', items: [
          'Editor visual para ficheiros .td com vista de lista e vista Kanban (Por fazer, Em curso, Feito).',
          'Adição rápida: escreve o título e carrega Enter. Palavras que começam por # tornam-se etiquetas.',
          'Prioridade, data limite com destaque de atrasadas, etiquetas, notas e subtarefas com progresso.',
          'Arrastar tarefas para as reordenar ou mudar o estado.',
          'Pesquisa e filtros, e um botão para limpar as tarefas concluídas.',
          'Painel na Barra de Atividade com todos os ficheiros .td, e contagem de pendentes ao passar o rato.',
          'Interface em inglês / português (por omissão, o idioma do VS Code).',
          'Esta página de notas de versão, mostrada após cada atualização (pode ser desligada).',
        ] },
      ],
    },
  },
];
