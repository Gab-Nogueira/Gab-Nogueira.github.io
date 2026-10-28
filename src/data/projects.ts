// Confirmed technical data. All editorial copy lives in translations.ts.
export type ProjectId = 'cyola' | 'nexius-barber' | 'plenitude' | 'uninews' | 'task-management' | 'excel-automation' | 'quebra-tudo' | 'portfolio';
export interface Project {
  id: ProjectId;
  image: string;
  technologies: string[];
  url: string;
  github: string;
  color: string;
}

export const projects: Project[] = [
  {
    "id": "cyola",
    "image": "",
    "technologies": [
      "Python",
      "Flask",
      "SQLite",
      "Excel",
      "Omie API",
      "OCR"
    ],
    "url": "",
    "github": "",
    "color": "#a9c8b3"
  },
  {
    "id": "nexius-barber",
    "image": "",
    "technologies": [
      "React",
      "TypeScript",
      "Vinext",
      "Drizzle",
      "Cloudflare D1",
      "Cloudflare R2"
    ],
    "url": "",
    "github": "https://github.com/Gab-Nogueira/nexius-barber",
    "color": "#b6a4e6"
  },
  {
    "id": "plenitude",
    "image": "/projects/plenitude-home-final.png",
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "Prisma",
      "SQLite"
    ],
    "url": "https://familia.adbelem.sjc.br/",
    "github": "",
    "color": "#f2cb4c"
  },
  {
    "id": "uninews",
    "image": "",
    "technologies": ["JavaScript", "Node.js", "Express", "MongoDB", "HTML", "CSS"],
    "url": "",
    "github": "",
    "color": "#ccff62"
  },
  {
    "id": "task-management",
    "image": "",
    "technologies": [],
    "url": "",
    "github": "",
    "color": "#e6a884"
  },
  {
    "id": "excel-automation",
    "image": "",
    "technologies": [
      "Excel",
      "VBA"
    ],
    "url": "",
    "github": "",
    "color": "#a9c8b3"
  },
  {
    "id": "quebra-tudo",
    "image": "",
    "technologies": [
      "Python",
      "Playwright",
      "OCR",
      "faster-whisper"
    ],
    "url": "",
    "github": "https://github.com/Gab-Nogueira/QUEBRA-TUDO",
    "color": "#95bdda"
  },
  {
    "id": "portfolio",
    "image": "",
    "technologies": [
      "React",
      "TypeScript",
      "Vinext",
      "GSAP",
      "Lenis",
      "GitHub Pages"
    ],
    "url": "",
    "github": "https://github.com/Gab-Nogueira/Gab-Nogueira.github.io",
    "color": "#d7c38e"
  }
];

export const projectTotal = String(projects.length).padStart(2, '0');
