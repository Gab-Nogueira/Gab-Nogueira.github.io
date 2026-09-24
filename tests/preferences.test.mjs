import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { defaultPreferences, parsePreferences, resolveLocale, resolveTheme, preferencesBootstrap } from '../src/lib/preferences.ts';
import { translations } from '../src/data/translations.ts';
import { createContactDraft, ContactError } from '../src/lib/contact.ts';

test('first visit follows system appearance and the first supported browser language', () => {
  assert.deepEqual(parsePreferences(null), defaultPreferences);
  assert.equal(resolveTheme('system', true), 'dark');
  assert.equal(resolveTheme('system', false), 'light');
  for (const [languages, expected] of [
    [['pt-BR', 'en-US'], 'pt'], [['es-AR', 'en'], 'es'], [['en-GB', 'pt'], 'en'],
    [['fr-FR', 'es-MX', 'pt-BR'], 'es'], [['de-DE', 'EN_us'], 'en'], [['ja-JP'], 'pt'], [[], 'pt'],
  ]) assert.equal(resolveLocale('system', languages), expected);
});

test('manual choices survive reload and ignore subsequent system changes until reset', () => {
  const saved = parsePreferences(JSON.stringify({ theme: 'dark', language: 'es' }));
  assert.equal(resolveTheme(saved.theme, false), 'dark');
  assert.equal(resolveTheme(saved.theme, true), 'dark');
  assert.equal(resolveLocale(saved.language, ['pt-BR']), 'es');
  assert.equal(resolveLocale(saved.language, ['en-US']), 'es');
  const reset = parsePreferences(JSON.stringify({ ...saved, theme: 'system', language: 'system' }));
  assert.equal(resolveTheme(reset.theme, false), 'light');
  assert.equal(resolveLocale(reset.language, ['pt-BR']), 'pt');
});

test('unavailable, corrupted and stale preferences safely return to automatic mode', () => {
  for (const raw of ['', '{broken', 'null', 'false', '7', '[]', '"dark"', '{"theme":"old","language":"it"}']) {
    assert.deepEqual(parsePreferences(raw), defaultPreferences);
  }
  assert.deepEqual(parsePreferences('{"theme":"dark","language":"xx"}'), { theme: 'dark', language: 'system' });
});

function runBootstrap(raw, dark, languages, blocked = false) {
  const root = { dataset: {}, style: {}, lang: '' };
  vm.runInNewContext(preferencesBootstrap, {
    document: { documentElement: root },
    navigator: { languages, language: languages[0] || 'pt' },
    window: { matchMedia: () => ({ matches: dark }) },
    localStorage: { getItem: () => { if (blocked) throw new Error('Storage denied'); return raw; } },
  });
  return root;
}

test('pre-paint initialization agrees with the hydrated resolvers across all modes', () => {
  for (const theme of ['system', 'light', 'dark']) for (const language of ['system', 'pt', 'en', 'es']) {
    for (const systemDark of [true, false]) for (const languages of [['pt-BR'], ['en-GB'], ['de', 'es-MX'], ['ja']]) {
      const raw = JSON.stringify({ theme, language });
      const root = runBootstrap(raw, systemDark, languages);
      const locale = resolveLocale(language, languages);
      assert.equal(root.dataset.theme, resolveTheme(theme, systemDark));
      assert.equal(root.style.colorScheme, resolveTheme(theme, systemDark));
      assert.equal(root.lang, locale === 'pt' ? 'pt-BR' : locale);
    }
  }
  for (const raw of ['{broken', 'null', 'false', '7', '[]', '"dark"']) {
    assert.equal(runBootstrap(raw, true, ['es']).lang, 'es');
  }
  assert.equal(runBootstrap(null, true, ['en-US'], true).dataset.theme, 'dark');
});

function leaves(value, prefix = '') {
  return Object.entries(value).flatMap(([key, item]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof item === 'string') { assert.ok(item.trim(), `${path} cannot be empty`); return [path]; }
    return leaves(item, path);
  }).sort((a,b) => a.localeCompare(b));
}

test('all three languages cover every page, preview, accessibility label and status', () => {
  const expected = leaves(translations.pt);
  assert.deepEqual(leaves(translations.en), expected);
  assert.deepEqual(leaves(translations.es), expected);
  assert.equal(translations.en.hero.word, 'CREATIVE');
  assert.equal(`${translations.en.hero.word} ${translations.en.hero.role}`, 'CREATIVE DEVELOPER');
  assert.equal(`${translations.pt.hero.word} ${translations.pt.hero.role}`, 'DESENVOLVEDOR CRIATIVO');
  assert.equal(`${translations.es.hero.word} ${translations.es.hero.role}`, 'DESARROLLADOR CREATIVO');
});

test('localized contact drafts preserve user text and report validation in the selected language', () => {
  const values = { name: 'Ángela', email: 'angela@example.com', subject: 'Idea & diseño?', message: 'Mensagem original sem tradução automática.' };
  for (const [locale, greeting, subjectLabel] of [['pt','Olá, Gabriel!','Assunto'], ['en','Hello, Gabriel!','Subject'], ['es','¡Hola, Gabriel!','Asunto']]) {
    const draft = createContactDraft(values, 'gabsilvanogueira@gmail.com', locale);
    assert.ok(draft.body.startsWith(greeting));
    assert.ok(draft.body.includes(values.message));
    assert.ok(draft.copy.includes(`${subjectLabel}: ${values.subject}`));
    assert.throws(() => createContactDraft({ ...values, email: 'bad' }, 'gabsilvanogueira@gmail.com', locale), error => error instanceof ContactError && error.code === 'email');
    assert.throws(() => createContactDraft({ ...values, message: 'short' }, 'gabsilvanogueira@gmail.com', locale), error => error.code === 'short');
  }
});
