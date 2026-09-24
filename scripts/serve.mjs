import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stat, readFile } from 'node:fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/client');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.rsc': 'text/x-component', '.txt': 'text/plain; charset=utf-8' };
try { await stat(path.join(root, 'index.html')); } catch { console.error('Execute npm run build antes de iniciar a versão de produção.'); process.exit(1); }

const server = http.createServer(async (request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
    const pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
    const resolved = path.resolve(root, `.${pathname}`);
    if (pathname.includes('\0') || (resolved !== root && !resolved.startsWith(root + path.sep))) { response.writeHead(400); response.end('Caminho inválido.'); return; }
    const candidates = [resolved, path.join(resolved, 'index.html'), `${resolved}.html`];
    let filename;
    for (const candidate of candidates) {
      try { if ((await stat(candidate)).isFile()) { filename = candidate; break; } } catch { /* Try the next static path. */ }
    }
    const status = filename ? 200 : 404;
    filename ||= path.join(root, '404.html');
    const body = await readFile(filename);
    response.writeHead(status, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Content-Length': body.length, 'Cache-Control': filename.includes(`${path.sep}_next${path.sep}static${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(400); response.end('Não foi possível abrir este endereço.'); }
});
server.on('error', error => { console.error(`Não foi possível iniciar na porta ${port}: ${error.message}`); process.exit(1); });
server.listen(port, '127.0.0.1', () => console.log(`Portfólio: http://127.0.0.1:${port}/`));
