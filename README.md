# Gabriel Nogueira — Creative Developer

Portfólio editorial completo em React, TypeScript, Vite/Vinext, GSAP, ScrollTrigger e Lenis. Fontes Anton, Manrope e DM Mono servidas junto com o site.

## Executar

Requer Node.js 22.13 ou superior e npm.

No Windows, abra `INICIAR-PORTFOLIO.cmd`. O iniciador usa Node.js portátil quando necessário, sem alterar a instalação global.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run lint
npm run build
npm run verify:site
npm start
```

## Publicação no GitHub Pages

O fluxo `.github/workflows/deploy-pages.yml` valida e publica automaticamente o portfólio quando uma alteração chega à branch `main`. Para manter os caminhos atuais do site funcionando na raiz, o repositório deve se chamar `Gab-Nogueira.github.io`.

Depois da primeira configuração, futuras alterações seguem o mesmo processo: editar, validar, criar um commit e enviar para o GitHub. A publicação é atualizada automaticamente se todas as verificações passarem.

O endereço local é informado pelo servidor: desenvolvimento em `http://127.0.0.1:3000`, produção local em `http://127.0.0.1:4173`. A Home está em `/`; os detalhes atuais ficam em `/work/uninews`, `/work/task-management`, `/work/plenitude` e `/work/excel-automation`. A publicação usa apenas arquivos estáticos de `dist/client`, sem servidor ou banco em produção.

## Conteúdo

- `src/data/profile.ts`: e-mail, GitHub e LinkedIn fornecidos por Gabriel, localização e campo opcional para foto. Links vazios ficam ocultos.
- `src/data/projects.ts`: conteúdo e links dos quatro projetos. Preencha `image` com uma captura real em `public/`, `year` e `technologies` com dados confirmados.
- `src/data/translations.ts`: textos de todas as páginas, projetos, prévias e formulários em português, inglês e espanhol. Os textos exibidos são os deste arquivo; imagens, links e demais dados técnicos continuam em `projects.ts`.
- As composições de interface em `ProjectPreview.tsx` são originais e identificadas como conceituais. Não são capturas reais nem evidência de resultados dos projetos.
- O monograma GN ocupa o espaço da foto enquanto não há retrato fornecido. Não representa uma pessoa fictícia.
- A seção Sobre informa, nos três idiomas, que Gabriel é técnico em Informática e estudante de Engenharia Aeronáutica e Espaço; a graduação aparece como em andamento.

## Contato

O formulário valida os campos e prepara um `mailto:` para `gabsilvanogueira@gmail.com`. O visitante conclui o envio no próprio aplicativo de e-mail. Há cópia da mensagem e alternativa manual se a área de transferência estiver indisponível. A página não afirma que uma mensagem foi enviada ou entregue. Nenhuma credencial de e-mail é exposta e nenhuma mensagem é armazenada.

## Tema e idioma

O primeiro acesso segue `prefers-color-scheme` para branco/preto e a ordem de `navigator.languages` para português, inglês e espanhol. Variantes regionais como `pt-BR`, `en-GB` e `es-MX` são reconhecidas. Sem idioma compatível, o padrão é português.

Os seletores estão no cabeçalho, menu, rodapé e páginas de projeto. A escolha manual fica em `localStorage` na chave `gn-preferences-v1` e vale entre páginas e visitas. “Sistema” e “Auto” retomam a detecção automática. Mudanças do sistema são acompanhadas enquanto o modo automático estiver ativo; abas abertas também sincronizam a preferência. Quando o armazenamento está bloqueado, a escolha continua funcionando na visita atual.

Um script no cabeçalho aplica tema e atributo `lang` antes da pintura. As traduções atualizam os títulos das páginas e a descrição sem reiniciar a abertura ou levar a pessoa ao topo. O conteúdo digitado no formulário permanece intacto.

O vídeo fornecido orientou a capa com letras altas, o selo circular, a entrada da seção Sobre, o fundo quadriculado, o título líquido dos projetos e as capas com texto sobreposto. `src/styles/reference.css` reúne essa composição; `src/styles/preferences.css` centraliza os temas e controles.

## Movimento e acessibilidade

- Primeira abertura: carregamento de fontes com duração mínima, escrita SVG e transição em cruz. A introdução pode ser pulada e só se repete em uma nova sessão. Para rever a sequência completa, abra `/?intro=replay`.
- GSAP com contextos e limpeza ao desmontar; Lenis sincronizado com o ticker do GSAP e destruído ao desmontar ou trocar a configuração de movimento.
- Hero fixado durante a entrada de Sobre. Em desktop a partir de 901 px de largura, Especialidades sai para a esquerda e Work entra pela direita, independentemente da altura útil deixada pelas barras do navegador; o menu resolve a posição correta desses painéis, inclusive após redimensionar. Telas menores e movimento reduzido mantêm o fluxo vertical.
- Menu em Dialog acessível: foco contido, retorno de foco, teclado e Escape.
- Animações de entrada, masks e imagens recalculadas depois do carregamento de fontes e imagens.
- A abertura inicia com o fundo do sistema/tema escolhido, com anéis orbitais e porcentagem. Os anéis e o número saem para cima, seguidos de uma pausa de 0,8 s. A saudação é desenhada por 4 s, permanece completa por 1,05 s e sobe para fora da tela. A cruz tem cinco colunas, do centro para as extremidades, sobre um fundo de contraste; termina na cor da capa e aguarda 0,6 s antes de revelá-la. As letras entram pela máscara da esquerda para a direita; o subtítulo entra depois. A preparação antes da pintura e o bloqueio de rolagem durante toda a abertura evitam flashes e entradas cortadas. Escrita e entrada pausam com a aba oculta.
- CREATIVE/CRIATIVO/CREATIVO só reage dentro dos limites visuais das letras. O movimento acompanha a direção e a velocidade do ponteiro, com retorno ao repouso; o espaço extra da linha não ativa a distorção. No celular, um toque breve ativa uma reação, e deslizar continua rolando a página.
- A linha abaixo de Sobre mim responde ao mouse e ao toque, retornando como uma corda elástica. As gotas de Work/Projetos têm trajetórias individuais contínuas e reagem ao ponteiro; os loops pausam fora da tela e em abas ocultas. Movimento reduzido mantém esses elementos estáticos.
- O menu ocupa a tela inteira, inclusive em celular deitado; o painel anula a propriedade CSS `translate` herdada das classes de centralização. Há um único controle de bloqueio do scroll, e a navegação aguarda `onOpenChangeComplete`. Fechar ou pressionar Escape devolve o foco ao botão.
- Ícones de tecnologias flutuam por trajetórias limitadas à seção. Ficam estáveis ao receber foco/mouse, podem ser pausados e selecionam a especialidade correspondente por clique ou toque. Fora da tela e em abas ocultas, as trajetórias param. Com movimento reduzido, ficam estáticos. No celular, abrir uma especialidade também mostra sua prévia.
- A entrada de Sobre usa a mesma máscara vertical dos demais títulos. No desktop, os ícones também acompanham o ponteiro com profundidades e direções diferentes; o deslocamento extra é limitado a 8 px, e receber foco ou hover estabiliza o alvo.
- O monograma aproxima ao passar o mouse, revelando nome, GitHub e LinkedIn. Os links ficam acessíveis por teclado e visíveis no touch. Uma barra dourada acompanha hover, foco e expansão das especialidades.
- Work combina gotas independentes e recortes móveis na base das letras. Em desktop, as capas dos projetos se sobrepõem; a anterior diminui levemente, enquanto a próxima escurece e revela o texto conforme a rolagem. No celular, as capas mantêm entrada vertical e texto legível.
- Sem analytics, cookies de rastreamento ou formulários que simulam envio.

## Ícones

Os SVGs locais de Python, JavaScript, TypeScript, React, Node.js, Vite, HTML, CSS, Express, Prisma, SQLite, MongoDB, Git, Bootstrap e GitHub vêm do [Devicon](https://github.com/devicons/devicon), sob licença MIT incluída em `public/icons/LICENSE.devicon.txt`. TypeScript, Vite, Express, Prisma e SQLite foram adicionados após confirmação no código do Plenitude. O ícone de planilha de Excel/VBA usa Lucide, já presente no projeto. Os ícones identificam as tecnologias; não indicam afiliação às marcas.

## Estrutura

`app/` contém rotas, layout e metadados. `src/components/` reúne seções e interações, `src/hooks/` controla scroll e movimento, `src/data/` centraliza conteúdo e `src/styles/portfolio.css` define o sistema visual.

## Validação visual

A Home foi conferida nos navegadores Chrome e Edge instalados, inclusive em desktop baixo (1440×650), confirmando a mesma transição horizontal e os cartões empilhados. O fluxo móvel foi conferido em 390×844: permanece vertical, sem rolagem horizontal e com os 16 ícones distribuídos sem sobreposição.

Além de `npm run typecheck`, `npm run lint`, `npm run build` e `npm run verify:site`, rode `npm test` para verificar preferências, inicialização, cobertura das traduções e composição segura dos e-mails.

