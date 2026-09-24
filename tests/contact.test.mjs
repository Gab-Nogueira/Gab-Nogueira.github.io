import test from 'node:test';
import assert from 'node:assert/strict';
import { createContactDraft } from '../src/lib/contact.ts';
import { projects } from '../src/data/projects.ts';

const recipient = 'gabsilvanogueira@gmail.com';
const fields = { name: 'Ana Silva', email: 'ana@example.com', subject: 'Automação & design?', message: 'Olá! Vamos conversar sobre um projeto de automação?' };

test('mail client receives complete Portuguese text and the confirmed recipient', () => {
  const draft = createContactDraft(fields, recipient);
  const url = new URL(draft.mailto);
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, recipient);
  assert.equal(url.searchParams.get('subject'), fields.subject);
  assert.ok(url.searchParams.get('body').includes(fields.message));
  assert.ok(draft.copy.includes(fields.email));
});

test('special characters cannot create additional mail recipients or parameters', () => {
  const draft = createContactDraft({ ...fields, subject: 'Projeto\r\nBcc: someone@example.com&cc=another@example.com', message: 'Texto com ? & # = + % e acentuação.' }, recipient);
  const url = new URL(draft.mailto);
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
  assert.equal(url.hash, '');
  assert.equal(url.searchParams.get('subject').includes('\n'), false);
});

test('empty, oversized and invalid fields are rejected without an email draft', () => {
  for (const name of Object.keys(fields)) assert.throws(() => createContactDraft({ ...fields, [name]: '   ' }, recipient));
  assert.throws(() => createContactDraft({ ...fields, email: 'not-an-email' }, recipient));
  assert.throws(() => createContactDraft({ ...fields, message: 'x'.repeat(5001) }, recipient));
});

test('project routes are unique, ordered and published links stay explicit', () => {
  assert.ok(projects.length >= 4);
  assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
  assert.equal(projects.some(project => project.id === 'document-management'), false);
  const plenitude = projects.find(project => project.id === 'plenitude');
  assert.equal(projects.findIndex(project => project.id === 'plenitude'), 2);
  assert.equal(plenitude?.url, 'https://familia.adbelem.sjc.br/');
  assert.deepEqual(plenitude?.technologies, ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'Prisma', 'SQLite']);
  for (const project of projects) {
    assert.match(project.id, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(project.title && project.description && project.intention);
    for (const url of [project.url, project.github]) if (url) assert.match(url, /^https:\/\//);
  }
});
