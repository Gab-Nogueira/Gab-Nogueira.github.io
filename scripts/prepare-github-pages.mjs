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

console.log(
  `GitHub Pages preparado: ${projectPages.length} rotas de projeto e .nojekyll.`,
);
