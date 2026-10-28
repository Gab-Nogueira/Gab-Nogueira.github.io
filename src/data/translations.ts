import type { Locale } from '@/src/lib/preferences';

const pt = {
  preferences: { label: 'Preferências de aparência e idioma', theme: 'Tema', language: 'Idioma', system: 'Sistema', light: 'Branco', dark: 'Preto' },
  nav: ['Projetos', 'Sobre', 'Especialidades', 'Contato'],
  home: 'Gabriel Nogueira, início', navigation: 'Navegação principal', menu: 'Menu', close: 'Fechar', openMenu: 'Abrir menu', closeMenu: 'Fechar menu', menuTitle: 'Navegar pelo portfólio', menuHelp: 'Escolha uma seção. Pressione Escape para fechar.', menuCaption: 'Boas ideias começam com uma conexão.',
  pageTitle: 'Gabriel Nogueira — Desenvolvedor criativo', pageDescription: 'Desenvolvimento criativo, automação e tecnologia. Portfólio de Gabriel Nogueira, em São José dos Campos, Brasil.', skip: 'Pular para o conteúdo', noScript: 'Ative o JavaScript para explorar as animações. Contato:',
  hero: { word: 'DESENVOLVEDOR', role: 'CRIATIVO', introduction: 'Desenvolvimento independente. Pensamento criativo.', traits: ['Visual', 'Código', 'Experiência'], explore: 'Role para explorar', about: 'Conhecer Gabriel', available: 'Aberto a colaborações', stamp: 'VAMOS CRIAR JUNTOS · VAMOS CRIAR JUNTOS · ', location: 'São José dos Campos, Brasil' },
  loader: { label: 'Abertura do portfólio', loading: 'Carregando a experiência', hello: 'Olá. Bem-vindo ao meu universo.', skip: 'Pular intro', patience: 'Um pouco de paciência. Muita intenção.', stages: ['Preparando o espaço', 'Conectando as ideias', 'Pronto para explorar'] },
  about: { label: 'A pessoa por trás do trabalho', title: 'Sobre mim', who: 'Quem sou eu?', heading: ['Eu construo ', 'mundos digitais', ' onde design encontra ', 'código.'], monogram: 'Monograma de Gabriel Nogueira', caption: 'Código. Criação. Repetição.', curious: 'Curioso por natureza.', precise: 'Preciso por intenção. ↗', hello: 'Prazer, Gabriel.', paragraphs: ['Entre meus estudos em engenharia e a liberdade de criar, desenvolvo experiências digitais e automações que tornam o dia a dia mais simples.', 'Sou técnico em Informática e estudante de Engenharia Aeronáutica e Espaço. Conecto o que aprendo aos projetos que desenvolvo.'], based: 'Localização', country: 'Brasil', focus: 'Foco', focusText: 'Desenvolvimento e automação', background: 'Formação e estudos', education: ['Técnico em Informática', 'Eng. Aeronáutica e Espaço — cursando'] },
  expertise: { label: 'O que trago para a mesa', heading: ['Minhas', 'especialidades'], description: 'Um repertório técnico diverso. Um objetivo: fazer as ideias funcionarem.', tools: 'Tecnologias e ferramentas', interactionHint: 'Passe o mouse ou toque nos ícones.', selectionHint: 'Explore as tecnologias e suas aplicações.', pause: 'Pausar movimento dos ícones', play: 'Animar os ícones', items: [
    { title: 'Desenvolvimento criativo', description: 'Design em movimento. Código com intenção.', detail: 'Interfaces responsivas e interações com HTML, CSS, JavaScript e Bootstrap. Versionamento com Git.' },
    { title: 'Automação e sistemas', description: 'Rotinas mais simples. Possibilidades maiores.', detail: 'Python, Flask, integração de APIs, OCR e automação de processos.' },
    { title: 'Aplicações web modernas', description: 'Da primeira ideia à próxima interação.', detail: 'Aplicações com React, TypeScript, Vite e Node.js. APIs com Express e persistência organizada com Prisma.' },
    { title: 'Dados e produtividade', description: 'Informação organizada para fazer mais.', detail: 'Excel, VBA, análise de dados e produtividade.' },
  ] },
  work: { label: 'Seleção de projetos', word: 'PROJETOS', explore: 'Role para explorar meus', total: 'projetos', edition: 'Edição 2026', tagline: 'Ideias que ganham forma.', end: 'Fim da seleção', nextIdea: 'Sua ideia pode ser a próxima. ↗', view: 'VER ↗', discover: 'Conhecer', overview: 'Visão do projeto', concept: 'Conceito visual · composição ilustrativa', exploreProject: 'Explorar projeto', selected: 'Projeto selecionado', all: 'Todos os projetos', interface: 'Interface do projeto', disciplines: ['Interfaces', 'Web interativa', 'Desenvolvimento criativo', 'Automação'] },
  case: { intention: 'A intenção', heading: ['Ideias que', 'ganham forma.'], note: 'A imagem acima é uma composição visual ilustrativa, não uma captura do projeto.', visit: 'Visitar projeto', code: 'Código no GitHub', next: 'Próximo projeto' },
  contact: { label: 'Tem algo em mente?', heading: ['Vamos criar', 'algo', 'significativo.'], invitation: 'Uma ideia, um desafio ou uma boa conversa. Vamos começar por aí.', hello: 'Diga olá', based: 'Localização', elsewhere: 'Outros lugares', formLabel: 'Preparar contato por e-mail', formHeading: 'Vamos fazer acontecer.', fields: ['Seu nome', 'Seu e-mail', 'Assunto', 'Sua mensagem'], placeholders: ['Como posso chamar você?', 'voce@exemplo.com', 'O que vamos construir?', 'Conte um pouco sobre a sua ideia…'], submit: 'Preparar e-mail', note: 'Abre seu aplicativo de e-mail com a mensagem preenchida. O envio é confirmado por você.', prepared: 'Mensagem preparada. Conclua o envio no seu aplicativo de e-mail. Se ele não abrir, copie a mensagem abaixo.', copied: 'Mensagem copiada. Cole no seu e-mail e envie para', manual: 'Selecione e copie a mensagem no campo abaixo.', copy: 'Copiar mensagem', copyLabel: 'Mensagem pronta para copiar', error: 'Revise os campos e tente novamente.', signoff: 'VAMOS CONVERSAR', footer: 'Design com intenção. Feito com código.', top: 'Voltar ao início' },
  notFound: { text: 'Esse caminho ainda não leva a um projeto.', back: 'Voltar ao início' },
  catalog: {
  "index": "Encontre um projeto",
  "indexHint": "Uma visão do meu trabalho. Escolha um projeto para conhecer os detalhes.",
  "role": "Minha atuação",
  "context": "Contexto",
  "features": "O que faz parte",
  "stack": "Tecnologias",
  "experience": "Experiência que vira projeto",
  "trajectory": "Da formação à prática",
  "language": "Idiomas",
  "languageValue": "Português · Inglês básico",
  "tools": "Também no meu repertório",
  "career": [
    {
      "title": "CYOLA",
      "subtitle": "Auxiliar administrativo · Desenvolvimento e automação",
      "text": "Aplicação de tecnologia na rotina fiscal e financeira, com integração de dados, documentos e processos."
    },
    {
      "title": "Univap",
      "subtitle": "Formação técnica e estudos em Engenharia",
      "text": "Técnico em Informática pelo Colégio Univap. Engenharia Aeronáutica e Espaço na Univap, com conclusão prevista em 2030. Participação em olimpíadas e maratonas de programação."
    },
    {
      "title": "Comunidade",
      "subtitle": "Voluntariado em tecnologia e audiovisual",
      "text": "Plataforma de inscrições para atividades comunitárias e operação de câmera em eventos."
    }
  ]
},
  projects: {
  "cyola": {
    "title": "Portal CYOLA",
    "shortTitle": "Portal\nCYOLA",
    "category": "Sistema interno · Gestão e automação",
    "description": "Da rotina administrativa ao sistema integrado. Um portal que aproxima gestão fiscal, financeira, planilhas e documentos.",
    "focus": [
      "Integração com Omie",
      "Documentos e pagamentos",
      "Automação de rotinas"
    ],
    "intention": "Organizar informações e tarefas que antes exigiam várias ferramentas, reunindo consultas, documentos, relatórios e acompanhamento em uma plataforma de trabalho.",
    "context": "Projeto profissional · uso interno",
    "role": "Desenvolvimento e automação na rotina administrativa da CYOLA.",
    "features": [
      "Integração de informações fiscais e financeiras com Omie, planilhas e documentos.",
      "Rotinas para pagamentos, boletos e taxas, com relatórios e acompanhamento.",
      "Agendamento de automações e organização do trabalho das equipes."
    ]
  },
  "nexius-barber": {
    "title": "Nexius Barber",
    "shortTitle": "Nexius\nBarber",
    "category": "Aplicação full stack · Agendamento",
    "description": "Do primeiro horário à agenda do dia. Uma demonstração de plataforma para clientes, profissionais e gestão de barbearia.",
    "focus": [
      "Agendamento online",
      "Agenda e gestão",
      "Perfis de acesso"
    ],
    "intention": "Conectar apresentação, escolha de serviços e organização da agenda em uma experiência responsiva, com regras de disponibilidade verificadas no servidor.",
    "context": "Demonstração funcional · reservas fictícias",
    "role": "Desenvolvimento full stack da demonstração.",
    "features": [
      "Fluxo de agendamento com serviço, profissional, data e confirmação.",
      "Áreas de cliente, profissional e gestão, com permissões por perfil.",
      "Disponibilidade, conflitos, remarcação e cancelamento tratados no servidor."
    ]
  },
  "plenitude": {
    "title": "Plenitude",
    "shortTitle": "Plenitude",
    "category": "Plataforma web · Comunidade",
    "description": "Cuidado que conecta pessoas e etapas da vida. Uma plataforma para conhecer os cursos, fazer inscrições e acompanhar o Plenitude da AD Belém SJC.",
    "focus": [
      "Cursos e inscrições",
      "Informativos",
      "Formaturas"
    ],
    "intention": "Reunir em uma experiência acolhedora os cursos de Matrimônio, Paternidade e Noivado, aproximando famílias das informações, inscrições e memórias do programa.",
    "context": "Projeto comunitário · plataforma publicada",
    "role": "Desenvolvimento da plataforma web para o programa Plenitude.",
    "features": [
      "Apresentação dos cursos de Matrimônio, Paternidade e Noivado.",
      "Fluxo de inscrições e informações para os participantes.",
      "Informativos, formaturas e memórias do programa."
    ]
  },
  "uninews": {
    "title": "Uninews",
    "shortTitle": "Uninews",
    "category": "Desenvolvimento web · Educação",
    "description": "Notícias feitas para a comunidade escolar. Um portal com publicação de conteúdo, busca, comentários e curtidas, desenvolvido como TCC de Informática.",
    "focus": [
      "Conteúdo editorial",
      "Comunidade escolar",
      "Experiência de leitura"
    ],
    "intention": "Dar espaço às histórias da escola e tornar a informação fácil de encontrar, ler e compartilhar.",
    "context": "Projeto acadêmico · TCC de Informática",
    "role": "Desenvolvimento do portal escolar com interface em JavaScript, API em Node.js/Express e persistência em MongoDB.",
    "features": [
      "Publicação, edição e busca de notícias em um feed escolar.",
      "Comentários e curtidas associados aos usuários e às notícias.",
      "Acesso de alunos e professores, login com JWT e importação de usuários por CSV."
    ]
  },
  "task-management": {
    "title": "Gestão de tarefas",
    "shortTitle": "Gestão de\ntarefas",
    "category": "Aplicação web · Organização",
    "description": "Clareza para o próximo passo. Um sistema web para organizar tarefas e acompanhar o trabalho.",
    "focus": [
      "Organização de tarefas",
      "Acompanhamento de trabalho",
      "Aplicação web"
    ],
    "intention": "Reunir tarefas e prioridades em uma visão simples, aproximando o planejamento da execução.",
    "context": "Projeto de aplicação web",
    "role": "Desenvolvimento de uma aplicação de organização de tarefas.",
    "features": [
      "Organização de tarefas em uma aplicação web.",
      "Acompanhamento das atividades e prioridades.",
      "Visão do trabalho para apoiar o planejamento."
    ]
  },
  "excel-automation": {
    "title": "Automação em Excel",
    "shortTitle": "Automação\nem Excel",
    "category": "Automação · Produtividade",
    "description": "Menos repetição. Mais tempo para pensar. Automação de processos e planilhas do dia a dia.",
    "focus": [
      "Rotinas em planilhas",
      "Organização de dados",
      "Produtividade"
    ],
    "intention": "Transformar tarefas repetitivas em rotinas organizadas para que o trabalho possa se concentrar nas decisões.",
    "context": "Automações de produtividade",
    "role": "Criação de rotinas para simplificar o trabalho com planilhas.",
    "features": [
      "Organização de informações em planilhas.",
      "Automação de etapas repetitivas com Excel e VBA.",
      "Apoio à conferência e preparação de dados."
    ]
  },
  "quebra-tudo": {
    "title": "Quebra Tudo",
    "shortTitle": "Quebra\nTudo",
    "category": "Experimento local · Automação e OCR",
    "description": "Uma bancada de estudos em Python para consultas web, reconhecimento de texto e validação de resultados no navegador.",
    "focus": [
      "Automação de navegador",
      "OCR local",
      "Validação de resultados"
    ],
    "intention": "Explorar reconhecimento local e automação web, distinguindo o texto reconhecido de uma operação efetivamente aceita pelo site de origem.",
    "context": "Protótipo experimental · execução local",
    "role": "Desenvolvimento do protótipo e dos fluxos de validação.",
    "features": [
      "Automação de navegador com Python e Playwright.",
      "Experimentos de reconhecimento de texto e transcrição de áudio local.",
      "Registro de resultados e confirmação do retorno da página consultada."
    ]
  },
  "portfolio": {
    "title": "Portfólio pessoal",
    "shortTitle": "Portfólio\npessoal",
    "category": "Desenvolvimento criativo · Identidade digital",
    "description": "O lugar onde reúno meu trabalho. Uma experiência editorial que combina tipografia, movimento e projetos reais.",
    "focus": [
      "Interação e movimento",
      "Três idiomas",
      "Acessibilidade"
    ],
    "intention": "Apresentar projetos, repertório e trajetória com uma identidade consistente, navegação clara e atenção a diferentes telas e preferências de movimento.",
    "context": "Projeto pessoal · código público",
    "role": "Desenvolvimento da interface, conteúdo e interações.",
    "features": [
      "Português, inglês e espanhol, com temas claro e escuro.",
      "Animações com GSAP e Lenis, com suporte a movimento reduzido.",
      "Páginas de projeto e publicação estática pelo GitHub Pages."
    ]
  }
},
  previews: {
    news: { tagline: 'Vozes da escola. Novas perspectivas.', menu: 'Menu', sections: ['Escola', 'Cultura', 'Tecnologia', 'Comunidade'], kicker: 'Ideias que merecem espaço', title: ['O próximo', 'capítulo', 'é nosso.'], read: 'Descobrir histórias', people: ['Feito de', 'pessoas.'], bottom: 'Um olhar para o que acontece aqui.', journal: 'Jornal Uninews' },
    plenitude: { brand: 'AD Belém SJC', menu: 'Menu', eyebrow: 'Programa Plenitude', heading: ['Jornadas para', 'viver em família.'], description: 'Cuidado, formação e comunhão em cada etapa.', cta: 'Conhecer os cursos', courses: ['Matrimônio', 'Paternidade', 'Noivado'], audience: ['Para casais', 'Para pais e responsáveis', 'Para noivos'], edition: 'Família em plenitude' },
    excel: { kicker: 'Automatize o cotidiano.', heading: ['Abra espaço', 'para mais.'], routine: 'Rotina de trabalho', formula: '= MENOS_REPETIÇÃO + MAIS_POSSIBILIDADES', rows: [['Processo', 'Origem', 'Status'], ['Organizar dados', 'Planilha', 'Concluído'], ['Validar informações', 'Planilha', 'Concluído'], ['Gerar relatório', 'Automação', 'Concluído'], ['Próxima rotina', 'Você decide', 'Pronto']], processes: 'Processos', example: 'Exemplo ilustrativo', less: 'Repita menos.', more: 'Crie mais.' },
    tasks: { breadcrumb: 'Visão geral / Meu quadro', kicker: 'Uma coisa de cada vez.', heading: ['Clareza para', 'seguir em frente.'], add: 'Nova tarefa', columns: ['A fazer', 'Em andamento', 'Concluído'], cards: [['Organizar as ideias', 'Definir prioridades'], ['Criar algo novo', 'Explorar possibilidades'], ['Dar o primeiro passo']], tags: ['Planejamento', 'Desenvolvimento', 'Projeto'] },
  },
};

// Every locale must provide the complete structure; no silent mixed-language fallback.
export type Translation = typeof pt;
const en: Translation = {
  preferences: { label: 'Appearance and language preferences', theme: 'Theme', language: 'Language', system: 'System', light: 'White', dark: 'Black' },
  nav: ['Work', 'About', 'Expertise', 'Contact'],
  home: 'Gabriel Nogueira, home', navigation: 'Main navigation', menu: 'Menu', close: 'Close', openMenu: 'Open menu', closeMenu: 'Close menu', menuTitle: 'Explore the portfolio', menuHelp: 'Choose a section. Press Escape to close.', menuCaption: 'Good ideas start with a connection.',
  pageTitle: 'Gabriel Nogueira — Creative Developer', pageDescription: 'Creative development, automation and technology. Portfolio of Gabriel Nogueira, based in São José dos Campos, Brazil.', skip: 'Skip to content', noScript: 'Enable JavaScript to explore the animations. Contact:',
  hero: { word: 'CREATIVE', role: 'DEVELOPER', introduction: 'Independent development. Creative thinking.', traits: ['Visuals', 'Code', 'Experience'], explore: 'Scroll to explore', about: 'Meet Gabriel', available: 'Open for collaborations', stamp: 'LET’S CREATE TOGETHER · LET’S CREATE TOGETHER · ', location: 'São José dos Campos, Brazil' },
  loader: { label: 'Portfolio introduction', loading: 'Loading the experience', hello: 'Hello. Welcome to my world.', skip: 'Skip intro', patience: 'A little patience. A lot of intention.', stages: ['Preparing the space', 'Connecting the ideas', 'Ready to explore'] },
  about: { label: 'The person behind the work', title: 'About me', who: 'Who am I?', heading: ['I build ', 'digital worlds', ' where design meets ', 'code.'], monogram: 'Gabriel Nogueira monogram', caption: 'Code. Create. Repeat.', curious: 'Curious by nature.', precise: 'Precise by design. ↗', hello: 'Hello, I’m Gabriel.', paragraphs: ['Between my engineering studies and the freedom to create, I develop digital experiences and automations that make everyday life simpler.', 'I have a technical qualification in IT and I am studying Aeronautical and Space Engineering. I connect what I learn with the projects I build.'], based: 'Based in', country: 'Brazil', focus: 'Focus', focusText: 'Development and automation', background: 'Education and studies', education: ['Technical education in IT', 'Aeronautical & Space Engineering — in progress'] },
  expertise: { label: 'What I bring to the table', heading: ['My', 'expertise'], description: 'A diverse technical toolkit. One goal: making ideas work.', tools: 'Technologies and tools', interactionHint: 'Hover over or tap the icons.', selectionHint: 'Explore the technologies and their uses.', pause: 'Pause icon motion', play: 'Animate the icons', items: [
    { title: 'Creative Development', description: 'Design in motion. Code with intention.', detail: 'Responsive interfaces and interactions with HTML, CSS, JavaScript and Bootstrap. Version control with Git.' },
    { title: 'Automation & Systems', description: 'Simpler routines. Greater possibilities.', detail: 'Python, Flask, API integration, OCR and process automation.' },
    { title: 'Modern Web Apps', description: 'From the first idea to the next interaction.', detail: 'Applications with React, TypeScript, Vite and Node.js. Express APIs with persistence organized through Prisma.' },
    { title: 'Data & Productivity', description: 'Organized information to do more.', detail: 'Excel, VBA, data analysis and productivity.' },
  ] },
  work: { label: 'Selected work', word: 'WORK', explore: 'Scroll to explore my', total: 'projects', edition: '2026 edition', tagline: 'Ideas made tangible.', end: 'End of selected work', nextIdea: 'Your idea could be next. ↗', view: 'VIEW ↗', discover: 'Explore', overview: 'Project overview', concept: 'Visual concept · illustrative composition', exploreProject: 'Explore project', selected: 'Selected project', all: 'All projects', interface: 'Project interface', disciplines: ['UI / UX', 'Interactive web', 'Creative development', 'Automation'] },
  case: { intention: 'The intention', heading: ['Ideas taking', 'shape.'], note: 'The image above is an illustrative visual composition, not a project screenshot.', visit: 'Visit project', code: 'Code on GitHub', next: 'Next project' },
  contact: { label: 'Have something in mind?', heading: ['Let’s create', 'something', 'meaningful.'], invitation: 'An idea, a challenge or a good conversation. Let’s start there.', hello: 'Say hello', based: 'Based in', elsewhere: 'Elsewhere', formLabel: 'Prepare an email', formHeading: 'Let’s make it happen.', fields: ['Your name', 'Your email', 'Subject', 'Your message'], placeholders: ['What should I call you?', 'you@example.com', 'What are we building?', 'Tell me a little about your idea…'], submit: 'Prepare email', note: 'Opens your email app with the message filled in. You confirm the actual sending.', prepared: 'Message prepared. Finish sending it in your email app. If it does not open, copy the message below.', copied: 'Message copied. Paste it into your email and send it to', manual: 'Select and copy the message in the field below.', copy: 'Copy message', copyLabel: 'Message ready to copy', error: 'Check the fields and try again.', signoff: 'LET’S TALK', footer: 'Designed with intention. Built with code.', top: 'Back to top' },
  notFound: { text: 'This path does not lead to a project yet.', back: 'Back to home' },
  catalog: {
  "index": "Find a project",
  "indexHint": "An overview of my work. Choose a project to explore the details.",
  "role": "My contribution",
  "context": "Context",
  "features": "What it includes",
  "stack": "Technologies",
  "experience": "Experience turned into projects",
  "trajectory": "From learning to practice",
  "language": "Languages",
  "languageValue": "Portuguese · Basic English",
  "tools": "Also in my toolkit",
  "career": [
    {
      "title": "CYOLA",
      "subtitle": "Administrative assistant · Development and automation",
      "text": "Applying technology to fiscal and financial routines through data, document and process integration."
    },
    {
      "title": "Univap",
      "subtitle": "Technical education and Engineering studies",
      "text": "Technical qualification in IT from Colégio Univap. Studying Aeronautical and Space Engineering at Univap, with expected graduation in 2030. Participation in programming competitions."
    },
    {
      "title": "Community",
      "subtitle": "Technology and audiovisual volunteering",
      "text": "A registration platform for community activities and camera operation at events."
    }
  ]
},
  projects: {
  "cyola": {
    "title": "CYOLA Portal",
    "shortTitle": "CYOLA\nPortal",
    "category": "Internal system · Management and automation",
    "description": "From administrative routines to an integrated system. A portal connecting fiscal and financial workflows, spreadsheets and documents.",
    "focus": [
      "Omie integration",
      "Documents and payments",
      "Workflow automation"
    ],
    "intention": "Organize information and tasks across multiple tools, bringing queries, documents, reports and tracking into one working platform.",
    "context": "Professional project · internal use",
    "role": "Development and automation within CYOLA’s administrative work.",
    "features": [
      "Fiscal and financial information integrated with Omie, spreadsheets and documents.",
      "Payment, bill and fee workflows with reports and tracking.",
      "Scheduled automations and tools to organize the teams’ work."
    ]
  },
  "nexius-barber": {
    "title": "Nexius Barber",
    "shortTitle": "Nexius\nBarber",
    "category": "Full stack application · Booking",
    "description": "From choosing a slot to managing the day. A demonstration platform for barbershop customers, professionals and managers.",
    "focus": [
      "Online booking",
      "Scheduling and management",
      "Access roles"
    ],
    "intention": "Connect the public website, service selection and scheduling in a responsive experience, with availability rules checked on the server.",
    "context": "Functional demonstration · fictional bookings",
    "role": "Full stack development of the demonstration.",
    "features": [
      "Booking flow covering services, professionals, dates and confirmation.",
      "Customer, professional and management areas with role-based permissions.",
      "Server-side availability, conflict handling, rescheduling and cancellation."
    ]
  },
  "plenitude": {
    "title": "Plenitude",
    "shortTitle": "Plenitude",
    "category": "Web platform · Community",
    "description": "Care that connects people across life stages. A platform to discover courses, register and follow Plenitude at AD Belém SJC.",
    "focus": [
      "Courses and registration",
      "Updates",
      "Graduations"
    ],
    "intention": "Bring the Marriage, Parenting and Engagement courses into one welcoming experience, connecting families with program information, registration and memories.",
    "context": "Community project · published platform",
    "role": "Web platform development for the Plenitude program.",
    "features": [
      "Presentation of Marriage, Parenting and Engagement courses.",
      "Registration flow and participant information.",
      "Updates, graduations and program memories."
    ]
  },
  "uninews": {
    "title": "Uninews",
    "shortTitle": "Uninews",
    "category": "Web development · Education",
    "description": "News for a school community. An IT capstone portal with publishing, search, comments and likes.",
    "focus": [
      "Editorial content",
      "School community",
      "Reading experience"
    ],
    "intention": "Make room for school stories and make information easy to find, read and share.",
    "context": "Academic project · IT capstone",
    "role": "School portal development with a JavaScript interface, a Node.js/Express API and MongoDB persistence.",
    "features": [
      "Publishing, editing and searching news in a school feed.",
      "Comments and likes associated with users and news posts.",
      "Student and teacher access, JWT login and CSV user import."
    ]
  },
  "task-management": {
    "title": "Task Management System",
    "shortTitle": "Task\nManagement",
    "category": "Web app · Organization",
    "description": "Clarity for the next step. A web system to organize tasks and keep track of work.",
    "focus": [
      "Task organization",
      "Work tracking",
      "Web application"
    ],
    "intention": "Bring tasks and priorities into a simple view, connecting planning with execution.",
    "context": "Web application project",
    "role": "Development of a task organization application.",
    "features": [
      "Task organization in a web application.",
      "Tracking activities and priorities.",
      "An overview of work to support planning."
    ]
  },
  "excel-automation": {
    "title": "Excel Automation",
    "shortTitle": "Excel\nAutomation",
    "category": "Automation · Productivity",
    "description": "Less repetition. More time to think. Automation for everyday processes and spreadsheets.",
    "focus": [
      "Spreadsheet routines",
      "Data organization",
      "Productivity"
    ],
    "intention": "Turn repetitive tasks into organized routines so that work can focus on decisions.",
    "context": "Productivity automations",
    "role": "Creating routines to simplify spreadsheet work.",
    "features": [
      "Organizing information in spreadsheets.",
      "Automating repetitive steps with Excel and VBA.",
      "Supporting data checking and preparation."
    ]
  },
  "quebra-tudo": {
    "title": "Quebra Tudo",
    "shortTitle": "Quebra\nTudo",
    "category": "Local experiment · Automation and OCR",
    "description": "A Python study environment for web queries, text recognition and browser result validation.",
    "focus": [
      "Browser automation",
      "Local OCR",
      "Result validation"
    ],
    "intention": "Explore local recognition and web automation while distinguishing recognized text from an operation actually accepted by the source website.",
    "context": "Experimental prototype · local execution",
    "role": "Prototype development and validation workflows.",
    "features": [
      "Browser automation using Python and Playwright.",
      "Experiments with local text recognition and audio transcription.",
      "Result records and validation of the response from the queried page."
    ]
  },
  "portfolio": {
    "title": "Personal portfolio",
    "shortTitle": "Personal\nportfolio",
    "category": "Creative development · Digital identity",
    "description": "A home for my work. An editorial experience bringing typography, motion and real projects together.",
    "focus": [
      "Interaction and motion",
      "Three languages",
      "Accessibility"
    ],
    "intention": "Present projects, skills and background through a consistent identity, clear navigation and attention to different screens and motion preferences.",
    "context": "Personal project · public source code",
    "role": "Interface, content and interaction development.",
    "features": [
      "Portuguese, English and Spanish, with light and dark themes.",
      "GSAP and Lenis animations with reduced-motion support.",
      "Project pages and static publishing through GitHub Pages."
    ]
  }
},
  previews: {
    news: { tagline: 'School voices. New perspectives.', menu: 'Menu', sections: ['School', 'Culture', 'Technology', 'Community'], kicker: 'Ideas that deserve space', title: ['The next', 'chapter', 'is ours.'], read: 'Discover stories', people: ['Made of', 'people.'], bottom: 'A look at what happens here.', journal: 'Uninews Journal' },
    plenitude: { brand: 'AD Belém SJC', menu: 'Menu', eyebrow: 'Plenitude Program', heading: ['Journeys for', 'family life.'], description: 'Care, learning and fellowship for every stage.', cta: 'Explore the courses', courses: ['Marriage', 'Parenting', 'Engagement'], audience: ['For couples', 'For parents and guardians', 'For engaged couples'], edition: 'Family in fullness' },
    excel: { kicker: 'Automate the ordinary.', heading: ['Make room', 'for more.'], routine: 'Work routine', formula: '= LESS_REPETITION + MORE_POSSIBILITIES', rows: [['Process', 'Source', 'Status'], ['Organize data', 'Spreadsheet', 'Done'], ['Validate information', 'Spreadsheet', 'Done'], ['Generate report', 'Automation', 'Done'], ['Next routine', 'You decide', 'Ready']], processes: 'Processes', example: 'Illustrative example', less: 'Repeat less.', more: 'Create more.' },
    tasks: { breadcrumb: 'Overview / My board', kicker: 'One thing at a time.', heading: ['Clarity to', 'move forward.'], add: 'New task', columns: ['To do', 'In progress', 'Done'], cards: [['Organize ideas', 'Set priorities'], ['Create something new', 'Explore possibilities'], ['Take the first step']], tags: ['Planning', 'Development', 'Project'] },
  },
};

const es: Translation = {
  preferences: { label: 'Preferencias de apariencia e idioma', theme: 'Tema', language: 'Idioma', system: 'Sistema', light: 'Blanco', dark: 'Negro' },
  nav: ['Proyectos', 'Sobre mí', 'Especialidades', 'Contacto'],
  home: 'Gabriel Nogueira, inicio', navigation: 'Navegación principal', menu: 'Menú', close: 'Cerrar', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', menuTitle: 'Explorar el portafolio', menuHelp: 'Elige una sección. Pulsa Escape para cerrar.', menuCaption: 'Las buenas ideas empiezan con una conexión.',
  pageTitle: 'Gabriel Nogueira — Desarrollador creativo', pageDescription: 'Desarrollo creativo, automatización y tecnología. Portafolio de Gabriel Nogueira, en São José dos Campos, Brasil.', skip: 'Saltar al contenido', noScript: 'Activa JavaScript para explorar las animaciones. Contacto:',
  hero: { word: 'DESARROLLADOR', role: 'CREATIVO', introduction: 'Desarrollo independiente. Pensamiento creativo.', traits: ['Visual', 'Código', 'Experiencia'], explore: 'Desplázate para explorar', about: 'Conocer a Gabriel', available: 'Abierto a colaboraciones', stamp: 'CREEMOS ALGO JUNTOS · CREEMOS ALGO JUNTOS · ', location: 'São José dos Campos, Brasil' },
  loader: { label: 'Introducción del portafolio', loading: 'Cargando la experiencia', hello: 'Hola. Bienvenido a mi universo.', skip: 'Saltar intro', patience: 'Un poco de paciencia. Mucha intención.', stages: ['Preparando el espacio', 'Conectando las ideas', 'Listo para explorar'] },
  about: { label: 'La persona detrás del trabajo', title: 'Sobre mí', who: '¿Quién soy?', heading: ['Construyo ', 'mundos digitales', ' donde el diseño encuentra ', 'código.'], monogram: 'Monograma de Gabriel Nogueira', caption: 'Código. Creación. Repetición.', curious: 'Curioso por naturaleza.', precise: 'Preciso por intención. ↗', hello: 'Hola, soy Gabriel.', paragraphs: ['Entre mis estudios de ingeniería y la libertad de crear, desarrollo experiencias digitales y automatizaciones que simplifican el día a día.', 'Soy técnico en Informática y estudiante de Ingeniería Aeronáutica y Espacial. Conecto lo que aprendo con los proyectos que desarrollo.'], based: 'Ubicación', country: 'Brasil', focus: 'Enfoque', focusText: 'Desarrollo y automatización', background: 'Formación y estudios', education: ['Técnico en Informática', 'Ing. Aeronáutica y Espacial — en curso'] },
  expertise: { label: 'Lo que aporto', heading: ['Mis', 'especialidades'], description: 'Un repertorio técnico diverso. Un objetivo: hacer que las ideas funcionen.', tools: 'Tecnologías y herramientas', interactionHint: 'Pasa el cursor o toca los iconos.', selectionHint: 'Explora las tecnologías y sus aplicaciones.', pause: 'Pausar el movimiento de los iconos', play: 'Animar los iconos', items: [
    { title: 'Desarrollo creativo', description: 'Diseño en movimiento. Código con intención.', detail: 'Interfaces adaptables e interacciones con HTML, CSS, JavaScript y Bootstrap. Control de versiones con Git.' },
    { title: 'Automatización y sistemas', description: 'Rutinas más simples. Más posibilidades.', detail: 'Python, Flask, integración de APIs, OCR y automatización de procesos.' },
    { title: 'Aplicaciones web modernas', description: 'De la primera idea a la próxima interacción.', detail: 'Aplicaciones con React, TypeScript, Vite y Node.js. APIs con Express y persistencia organizada con Prisma.' },
    { title: 'Datos y productividad', description: 'Información organizada para hacer más.', detail: 'Excel, VBA, análisis de datos y productividad.' },
  ] },
  work: { label: 'Proyectos seleccionados', word: 'PROYECTOS', explore: 'Desplázate para explorar mis', total: 'proyectos', edition: 'Edición 2026', tagline: 'Ideas que toman forma.', end: 'Fin de la selección', nextIdea: 'Tu idea puede ser la próxima. ↗', view: 'VER ↗', discover: 'Conocer', overview: 'Vista del proyecto', concept: 'Concepto visual · composición ilustrativa', exploreProject: 'Explorar proyecto', selected: 'Proyecto seleccionado', all: 'Todos los proyectos', interface: 'Interfaz del proyecto', disciplines: ['Interfaces', 'Web interactiva', 'Desarrollo creativo', 'Automatización'] },
  case: { intention: 'La intención', heading: ['Ideas que', 'toman forma.'], note: 'La imagen de arriba es una composición visual ilustrativa, no una captura del proyecto.', visit: 'Visitar proyecto', code: 'Código en GitHub', next: 'Próximo proyecto' },
  contact: { label: '¿Tienes algo en mente?', heading: ['Creemos', 'algo', 'significativo.'], invitation: 'Una idea, un reto o una buena conversación. Empecemos por ahí.', hello: 'Di hola', based: 'Ubicación', elsewhere: 'Otros lugares', formLabel: 'Preparar contacto por correo', formHeading: 'Hagámoslo realidad.', fields: ['Tu nombre', 'Tu correo', 'Asunto', 'Tu mensaje'], placeholders: ['¿Cómo te llamas?', 'tu@ejemplo.com', '¿Qué vamos a construir?', 'Cuéntame un poco sobre tu idea…'], submit: 'Preparar correo', note: 'Abre tu aplicación de correo con el mensaje preparado. Tú confirmas el envío.', prepared: 'Mensaje preparado. Completa el envío en tu aplicación de correo. Si no se abre, copia el mensaje de abajo.', copied: 'Mensaje copiado. Pégalo en tu correo y envíalo a', manual: 'Selecciona y copia el mensaje en el campo de abajo.', copy: 'Copiar mensaje', copyLabel: 'Mensaje listo para copiar', error: 'Revisa los campos e inténtalo de nuevo.', signoff: 'HABLEMOS', footer: 'Diseñado con intención. Hecho con código.', top: 'Volver al inicio' },
  notFound: { text: 'Este camino todavía no lleva a un proyecto.', back: 'Volver al inicio' },
  catalog: {
  "index": "Encuentra un proyecto",
  "indexHint": "Una vista de mi trabajo. Elige un proyecto para conocer los detalles.",
  "role": "Mi contribución",
  "context": "Contexto",
  "features": "Qué incluye",
  "stack": "Tecnologías",
  "experience": "Experiencia que se convierte en proyectos",
  "trajectory": "De la formación a la práctica",
  "language": "Idiomas",
  "languageValue": "Portugués · Inglés básico",
  "tools": "También en mis herramientas",
  "career": [
    {
      "title": "CYOLA",
      "subtitle": "Auxiliar administrativo · Desarrollo y automatización",
      "text": "Aplicación de tecnología a las rutinas fiscales y financieras, integrando datos, documentos y procesos."
    },
    {
      "title": "Univap",
      "subtitle": "Formación técnica y estudios de Ingeniería",
      "text": "Técnico en Informática por Colégio Univap. Estudiante de Ingeniería Aeronáutica y Espacial en Univap, con finalización prevista en 2030. Participación en competiciones de programación."
    },
    {
      "title": "Comunidad",
      "subtitle": "Voluntariado en tecnología y audiovisual",
      "text": "Plataforma de inscripciones para actividades comunitarias y operación de cámara en eventos."
    }
  ]
},
  projects: {
  "cyola": {
    "title": "Portal CYOLA",
    "shortTitle": "Portal\nCYOLA",
    "category": "Sistema interno · Gestión y automatización",
    "description": "De la rutina administrativa al sistema integrado. Un portal que conecta gestión fiscal, financiera, hojas de cálculo y documentos.",
    "focus": [
      "Integración con Omie",
      "Documentos y pagos",
      "Automatización de rutinas"
    ],
    "intention": "Organizar información y tareas de distintas herramientas, reuniendo consultas, documentos, informes y seguimiento en una plataforma de trabajo.",
    "context": "Proyecto profesional · uso interno",
    "role": "Desarrollo y automatización en la rutina administrativa de CYOLA.",
    "features": [
      "Información fiscal y financiera integrada con Omie, hojas de cálculo y documentos.",
      "Rutinas de pagos, facturas y tasas con informes y seguimiento.",
      "Automatizaciones programadas y organización del trabajo de los equipos."
    ]
  },
  "nexius-barber": {
    "title": "Nexius Barber",
    "shortTitle": "Nexius\nBarber",
    "category": "Aplicación full stack · Reservas",
    "description": "Desde elegir un horario hasta organizar el día. Una plataforma de demostración para clientes, profesionales y gestión de barbería.",
    "focus": [
      "Reservas online",
      "Agenda y gestión",
      "Perfiles de acceso"
    ],
    "intention": "Conectar presentación, selección de servicios y agenda en una experiencia adaptable, con reglas de disponibilidad comprobadas en el servidor.",
    "context": "Demostración funcional · reservas ficticias",
    "role": "Desarrollo full stack de la demostración.",
    "features": [
      "Flujo de reserva con servicio, profesional, fecha y confirmación.",
      "Áreas de cliente, profesional y gestión con permisos por perfil.",
      "Disponibilidad, conflictos, reprogramación y cancelación tratados en el servidor."
    ]
  },
  "plenitude": {
    "title": "Plenitude",
    "shortTitle": "Plenitude",
    "category": "Plataforma web · Comunidad",
    "description": "Cuidado que conecta personas y etapas de la vida. Una plataforma para conocer los cursos, inscribirse y acompañar Plenitude de AD Belém SJC.",
    "focus": [
      "Cursos e inscripciones",
      "Novedades",
      "Graduaciones"
    ],
    "intention": "Reunir los cursos de Matrimonio, Paternidad y Noviazgo en una experiencia acogedora, conectando a las familias con la información, las inscripciones y las memorias del programa.",
    "context": "Proyecto comunitario · plataforma publicada",
    "role": "Desarrollo de la plataforma web para el programa Plenitude.",
    "features": [
      "Presentación de los cursos de Matrimonio, Paternidad y Noviazgo.",
      "Flujo de inscripciones e información para los participantes.",
      "Novedades, graduaciones y memorias del programa."
    ]
  },
  "uninews": {
    "title": "Uninews",
    "shortTitle": "Uninews",
    "category": "Desarrollo web · Educación",
    "description": "Noticias para la comunidad escolar. Un portal desarrollado como trabajo final de Informática, con publicaciones, búsqueda, comentarios y me gusta.",
    "focus": [
      "Contenido editorial",
      "Comunidad escolar",
      "Experiencia de lectura"
    ],
    "intention": "Dar espacio a las historias de la escuela y facilitar la búsqueda, lectura y difusión de la información.",
    "context": "Proyecto académico · Trabajo final de Informática",
    "role": "Desarrollo del portal escolar con interfaz en JavaScript, API en Node.js/Express y persistencia en MongoDB.",
    "features": [
      "Publicación, edición y búsqueda de noticias en un feed escolar.",
      "Comentarios y me gusta asociados a usuarios y noticias.",
      "Acceso de alumnos y profesores, inicio de sesión con JWT e importación de usuarios por CSV."
    ]
  },
  "task-management": {
    "title": "Gestión de tareas",
    "shortTitle": "Gestión de\ntareas",
    "category": "Aplicación web · Organización",
    "description": "Claridad para el próximo paso. Un sistema web para organizar tareas y dar seguimiento al trabajo.",
    "focus": [
      "Organización de tareas",
      "Seguimiento del trabajo",
      "Aplicación web"
    ],
    "intention": "Reunir tareas y prioridades en una vista sencilla, conectando la planificación con la ejecución.",
    "context": "Proyecto de aplicación web",
    "role": "Desarrollo de una aplicación de organización de tareas.",
    "features": [
      "Organización de tareas en una aplicación web.",
      "Seguimiento de actividades y prioridades.",
      "Vista del trabajo para apoyar la planificación."
    ]
  },
  "excel-automation": {
    "title": "Automatización en Excel",
    "shortTitle": "Automatización\nen Excel",
    "category": "Automatización · Productividad",
    "description": "Menos repetición. Más tiempo para pensar. Automatización de procesos y hojas de cálculo del día a día.",
    "focus": [
      "Rutinas en hojas de cálculo",
      "Organización de datos",
      "Productividad"
    ],
    "intention": "Transformar tareas repetitivas en rutinas organizadas para concentrar el trabajo en las decisiones.",
    "context": "Automatizaciones de productividad",
    "role": "Creación de rutinas para simplificar el trabajo con hojas de cálculo.",
    "features": [
      "Organización de información en hojas de cálculo.",
      "Automatización de etapas repetitivas con Excel y VBA.",
      "Apoyo a la revisión y preparación de datos."
    ]
  },
  "quebra-tudo": {
    "title": "Quebra Tudo",
    "shortTitle": "Quebra\nTudo",
    "category": "Experimento local · Automatización y OCR",
    "description": "Un entorno de estudio en Python para consultas web, reconocimiento de texto y validación de resultados en el navegador.",
    "focus": [
      "Automatización del navegador",
      "OCR local",
      "Validación de resultados"
    ],
    "intention": "Explorar el reconocimiento local y la automatización web, distinguiendo el texto reconocido de una operación aceptada por la página de origen.",
    "context": "Prototipo experimental · ejecución local",
    "role": "Desarrollo del prototipo y de los flujos de validación.",
    "features": [
      "Automatización del navegador con Python y Playwright.",
      "Experimentos de reconocimiento de texto y transcripción de audio local.",
      "Registro de resultados y confirmación de la respuesta de la página consultada."
    ]
  },
  "portfolio": {
    "title": "Portafolio personal",
    "shortTitle": "Portafolio\npersonal",
    "category": "Desarrollo creativo · Identidad digital",
    "description": "Un lugar para reunir mi trabajo. Una experiencia editorial que combina tipografía, movimiento y proyectos reales.",
    "focus": [
      "Interacción y movimiento",
      "Tres idiomas",
      "Accesibilidad"
    ],
    "intention": "Presentar proyectos, conocimientos y trayectoria con una identidad coherente, navegación clara y atención a distintas pantallas y preferencias de movimiento.",
    "context": "Proyecto personal · código público",
    "role": "Desarrollo de la interfaz, el contenido y las interacciones.",
    "features": [
      "Portugués, inglés y español, con temas claro y oscuro.",
      "Animaciones con GSAP y Lenis, con soporte para movimiento reducido.",
      "Páginas de proyecto y publicación estática mediante GitHub Pages."
    ]
  }
},
  previews: {
    news: { tagline: 'Voces de la escuela. Nuevas perspectivas.', menu: 'Menú', sections: ['Escuela', 'Cultura', 'Tecnología', 'Comunidad'], kicker: 'Ideas que merecen espacio', title: ['El próximo', 'capítulo', 'es nuestro.'], read: 'Descubrir historias', people: ['Hecho de', 'personas.'], bottom: 'Una mirada a lo que pasa aquí.', journal: 'Diario Uninews' },
    plenitude: { brand: 'AD Belém SJC', menu: 'Menú', eyebrow: 'Programa Plenitude', heading: ['Caminos para', 'vivir en familia.'], description: 'Cuidado, formación y comunión en cada etapa.', cta: 'Conocer los cursos', courses: ['Matrimonio', 'Paternidad', 'Noviazgo'], audience: ['Para parejas', 'Para padres y responsables', 'Para novios'], edition: 'Familia en plenitud' },
    excel: { kicker: 'Automatiza lo cotidiano.', heading: ['Haz espacio', 'para más.'], routine: 'Rutina de trabajo', formula: '= MENOS_REPETICIÓN + MÁS_POSIBILIDADES', rows: [['Proceso', 'Origen', 'Estado'], ['Organizar datos', 'Hoja de cálculo', 'Completado'], ['Validar información', 'Hoja de cálculo', 'Completado'], ['Generar informe', 'Automatización', 'Completado'], ['Próxima rutina', 'Tú decides', 'Listo']], processes: 'Procesos', example: 'Ejemplo ilustrativo', less: 'Repite menos.', more: 'Crea más.' },
    tasks: { breadcrumb: 'Vista general / Mi tablero', kicker: 'Una cosa a la vez.', heading: ['Claridad para', 'seguir adelante.'], add: 'Nueva tarea', columns: ['Por hacer', 'En progreso', 'Completado'], cards: [['Organizar las ideas', 'Definir prioridades'], ['Crear algo nuevo', 'Explorar posibilidades'], ['Dar el primer paso']], tags: ['Planificación', 'Desarrollo', 'Proyecto'] },
  },
};

export const translations: Record<Locale, Translation> = { pt, en, es };
