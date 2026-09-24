import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root = path.resolve('dist/client');
const workPages = (await readdir(path.join(root, 'work'))).filter(file => file.endsWith('.html')).sort();
const routes = ['/', ...workPages.map(file => `/work/${file.slice(0, -5)}`)];
const exists = async file => { try { return (await stat(file)).isFile(); } catch { return false; } };
const routeFile = route => path.join(root, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
let checkedAssets = 0;
for (const route of routes) {
  const html = await readFile(routeFile(route), 'utf8');
  const bootstrap = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]).find(script => script.includes('gn-preferences-v1'));
  assert.ok(bootstrap, `${route}: pre-paint preferences script present`);
  // Execute the actual bundled inline script too: serialization/minification
  // must not introduce a reference to a module variable unavailable in <head>.
  for (const [theme, language] of [['light','pt'], ['dark','en'], ['system','es']]) {
    const element = { dataset: {}, style: {}, lang: '' };
    vm.runInNewContext(bootstrap, {
      document: { documentElement: element },
      window: { matchMedia: () => ({ matches: true }) },
      navigator: { languages: ['es-MX'], language: 'es-MX' },
      localStorage: { getItem: () => JSON.stringify({ theme, language }) },
    });
    assert.equal(element.dataset.theme, theme === 'system' ? 'dark' : theme, `${route}: bundled theme initialization`);
    assert.equal(element.lang, language === 'pt' ? 'pt-BR' : language, `${route}: bundled language initialization`);
  }
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  assert.match(markup, /<html[^>]*lang="pt-BR"/, `${route}: language`);
  assert.equal((markup.match(/<h1\b/g) || []).length, 1, `${route}: exactly one main heading`);
  assert.match(markup, /<title>[^<]*Gabriel Nogueira[^<]*<\/title>/, `${route}: meaningful page title`);
  assert.equal(/Building your site|Your site is taking shape|Untitled site/.test(markup), false, `${route}: no starter content`);
  const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${route}: unique element IDs`);
  const selectors = [...markup.matchAll(/<select\b[^>]*\bid="([^"]+)"[^>]*>[\s\S]*?<\/select>/g)];
  assert.ok(selectors.length >= 2, `${route}: theme and language controls present`);
  for (const selector of selectors) {
    assert.ok(markup.includes(`for="${selector[1]}"`), `${route}: preference selector has an associated label`);
    assert.ok(selector[0].includes('value="system"'), `${route}: preference selector can return to system settings`);
  }
  for (const match of markup.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const reference = match[1].split('?')[0].split('#')[0];
    if (!reference.startsWith('/') || reference.startsWith('//')) continue;
    const file = path.join(root, decodeURIComponent(reference));
    assert.ok(await exists(file) || await exists(`${file}.html`) || await exists(path.join(file, 'index.html')), `${route}: missing ${reference}`);
    checkedAssets++;
  }
  if (route === '/') {
    for (const section of ['home', 'about', 'expertise', 'work', 'contact']) assert.ok(ids.includes(section), `Home: ${section} section exists`);
    for (const field of ['name', 'email', 'subject', 'message']) {
      const control = markup.match(new RegExp(`<(?:input|textarea)\\b[^>]*\\bname="${field}"[^>]*>`))?.[0];
      assert.ok(control && /\srequired(?:=|\s|\/?>)/.test(control), `Contact: ${field} required`);
    }
    for (const link of markup.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(link[1]), `Home: anchor #${link[1]} has a destination`);
    assert.match(markup, /mailto:gabsilvanogueira@gmail.com/);
  }
  console.log(`OK ${route}`);
}
console.log(`${routes.length} páginas e ${checkedAssets} referências de assets/links verificadas.`);
