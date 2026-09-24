export type ProjectId = 'uninews' | 'task-management' | 'plenitude' | 'excel-automation';
export interface Project {
  id: ProjectId;
  title: string;
  shortTitle: string;
  category: string;
  year: string | null;
  description: string;
  image: string;
  technologies: string[];
  url: string;
  github: string;
  color: string;
  focus: string[];
  intention: string;
}

// As prévias são composições conceituais. Troque `image` pela captura real
// e preencha os links e o ano somente quando forem confirmados.
export const projects: Project[] = [
  {
    id: 'uninews', title: 'Uninews', shortTitle: 'Uninews', category: 'WEB DEVELOPMENT · EDUCATION',
    year: null, description: 'Informação que conecta uma comunidade. Um portal de notícias pensado para o ambiente escolar.',
    image: '', technologies: [], url: '', github: '', color: '#ccff62',
    focus: ['Conteúdo editorial', 'Comunidade escolar', 'Experiência de leitura'],
    intention: 'Dar espaço às histórias da escola e tornar a informação fácil de encontrar, ler e compartilhar.',
  },
  {
    id: 'task-management', title: 'Task Management System', shortTitle: 'Task\nManagement', category: 'WEB APP · ORGANIZATION',
    year: null, description: 'Clareza para o próximo passo. Um sistema web para organizar tarefas e acompanhar o trabalho.',
    image: '', technologies: [], url: '', github: '', color: '#e6a884',
    focus: ['Organização de tarefas', 'Acompanhamento de trabalho', 'Aplicação web'],
    intention: 'Reunir tarefas e prioridades em uma visão simples, aproximando o planejamento da execução.',
  },
  {
    id: 'plenitude', title: 'Plenitude', shortTitle: 'Plenitude', category: 'PLATAFORMA WEB · COMUNIDADE',
    year: null, description: 'Cuidado que conecta pessoas e etapas da vida. Uma plataforma para conhecer os cursos, fazer inscrições e acompanhar o Plenitude da AD Belém SJC.',
    image: '/projects/plenitude-home-final.png', technologies: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'Prisma', 'SQLite'], url: 'https://familia.adbelem.sjc.br/', github: '', color: '#f2cb4c',
    focus: ['Cursos e inscrições', 'Informativos', 'Formaturas'],
    intention: 'Reunir em uma experiência acolhedora os cursos de Matrimônio, Paternidade e Noivado, aproximando famílias das informações, inscrições e memórias do programa.',
  },
  {
    id: 'excel-automation', title: 'Excel Automation', shortTitle: 'Excel\nAutomation', category: 'AUTOMATION · PRODUCTIVITY',
    year: null, description: 'Menos repetição. Mais tempo para pensar. Automação de processos e planilhas do dia a dia.',
    image: '', technologies: [], url: '', github: '', color: '#a9c8b3',
    focus: ['Rotinas em planilhas', 'Organização de dados', 'Produtividade'],
    intention: 'Transformar tarefas repetitivas em rotinas organizadas para que o trabalho possa se concentrar nas decisões.',
  },
];

export const projectTotal = String(projects.length).padStart(2, '0');
