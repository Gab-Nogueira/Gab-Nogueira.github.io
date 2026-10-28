import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const siteDirectory = path.resolve("dist/client");
const workDirectory = path.join(siteDirectory, "work");

const entries = await readdir(workDirectory, { withFileTypes: true });
const projectPages = entries.filter(
  (entry) => entry.isFile() && entry.name.endsWith(".html"),
);

for (const page of projectPages) {
  const slug = page.name.slice(0, -".html".length);
  const routeDirectory = path.join(workDirectory, slug);

  await mkdir(routeDirectory, { recursive: true });
  await copyFile(
    path.join(workDirectory, page.name),
    path.join(routeDirectory, "index.html"),
  );
}

await writeFile(path.join(siteDirectory, ".nojekyll"), "");
const siteUrl = 'https://gab-nogueira.github.io';
const urls = ['/', ...projectPages.map(page => `/work/${page.name.slice(0, -5)}/`)];
await writeFile(path.join(siteDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(route => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(siteDirectory, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(
  `GitHub Pages preparado: ${projectPages.length} rotas de projeto e .nojekyll.`,
);
