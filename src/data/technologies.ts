export const technologies = [
  { id: 'python', name: 'Python', icon: '/icons/python.svg', area: 1, x: 0, y: 0, rotate: -12 },
  { id: 'javascript', name: 'JavaScript', icon: '/icons/javascript.svg', area: 0, x: .34, y: 0, rotate: 10 },
  { id: 'typescript', name: 'TypeScript', icon: '/icons/typescript.svg', area: 2, x: .67, y: 0, rotate: -7 },
  { id: 'react', name: 'React', icon: '/icons/react.svg', area: 2, x: 1, y: 0, rotate: -9 },
  { id: 'nodejs', name: 'Node.js', icon: '/icons/nodejs.svg', area: 2, x: 0, y: .33, rotate: 8 },
  { id: 'vite', name: 'Vite', icon: '/icons/vite.svg', area: 2, x: .34, y: .33, rotate: -10 },
  { id: 'html5', name: 'HTML', icon: '/icons/html5.svg', area: 0, x: .67, y: .33, rotate: -10 },
  { id: 'css3', name: 'CSS', icon: '/icons/css3.svg', area: 0, x: 1, y: .33, rotate: 13 },
  { id: 'express', name: 'Express', icon: '/icons/express.svg', area: 2, x: 0, y: .67, rotate: -8 },
  { id: 'prisma', name: 'Prisma', icon: '/icons/prisma.svg', area: 2, x: .34, y: .67, rotate: 7 },
  { id: 'sqlite', name: 'SQLite', icon: '/icons/sqlite.svg', area: 2, x: .67, y: .67, rotate: -6 },
  { id: 'mongodb', name: 'MongoDB', icon: '/icons/mongodb.svg', area: 1, x: 1, y: .67, rotate: -8 },
  { id: 'excel', name: 'Excel / VBA', icon: '', area: 3, x: 0, y: 1, rotate: 7 },
  { id: 'git', name: 'Git', icon: '/icons/git.svg', area: 0, x: .34, y: 1, rotate: -11 },
  { id: 'github', name: 'GitHub', icon: '/icons/github.svg', area: 2, x: .67, y: 1, rotate: -6 },
  { id: 'bootstrap', name: 'Bootstrap', icon: '/icons/bootstrap.svg', area: 0, x: 1, y: 1, rotate: 9 },
] as const;
export type Technology = typeof technologies[number];
