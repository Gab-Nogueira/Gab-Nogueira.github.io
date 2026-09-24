export type Locale = 'pt' | 'en' | 'es';
export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';
export type LanguagePreference = Locale | 'system';
export interface Preferences { theme: ThemePreference; language: LanguagePreference; }
export const PREFERENCES_KEY = 'gn-preferences-v1';
export const defaultPreferences: Preferences = { theme: 'system', language: 'system' };

export function parsePreferences(raw: string | null): Preferences {
  try {
    const value: unknown = JSON.parse(raw || '{}');
    const saved = value && typeof value === 'object' ? value as Record<string, unknown> : {};
    return {
      theme: saved.theme === 'light' || saved.theme === 'dark' ? saved.theme : 'system',
      language: saved.language === 'pt' || saved.language === 'en' || saved.language === 'es' ? saved.language : 'system',
    };
  } catch { return { ...defaultPreferences }; }
}

export function resolveLocale(preference: LanguagePreference, languages: readonly string[]): Locale {
  if (preference !== 'system') return preference;
  for (const language of languages) {
    const base = language.toLowerCase().split(/[-_]/)[0];
    if (base === 'pt' || base === 'en' || base === 'es') return base;
  }
  return 'pt';
}

export function resolveTheme(preference: ThemePreference, systemDark: boolean): Theme {
  return preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
}

// Self-contained so it can run in <head>, before CSS paints or React hydrates.
// The same behavior is checked against the application resolver in the tests.
function bootstrapPreferences(storageKey: string) {
  let saved: { theme?: string; language?: string } = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch { /* optional storage */ }
  const theme = saved.theme === 'light' || saved.theme === 'dark'
    ? saved.theme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  let locale = saved.language;
  if (locale !== 'pt' && locale !== 'en' && locale !== 'es') {
    locale = (navigator.languages || [navigator.language]).map(language => language.toLowerCase().split(/[-_]/)[0]).find(language => language === 'pt' || language === 'en' || language === 'es') || 'pt';
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.lang = locale === 'pt' ? 'pt-BR' : locale;
  document.documentElement.style.colorScheme = theme;
}

export const preferencesBootstrap = `(${bootstrapPreferences.toString()})(${JSON.stringify(PREFERENCES_KEY)});`;
