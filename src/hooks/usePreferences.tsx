'use client';
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { defaultPreferences, parsePreferences, PREFERENCES_KEY, resolveLocale, resolveTheme, type Preferences, type Locale, type Theme } from '@/src/lib/preferences';
import { translations } from '@/src/data/translations';

interface PreferenceContext {
  preferences: Preferences;
  locale: Locale;
  theme: Theme;
  setPreferences: (patch: Partial<Preferences>) => void;
}
const Context = createContext<PreferenceContext | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setSaved] = useState<Preferences>(defaultPreferences);
  const [system, setSystem] = useState<{ dark: boolean; languages: readonly string[] }>({ dark: false, languages: ['pt'] });
  const locale = resolveLocale(preferences.language, system.languages);
  const theme = resolveTheme(preferences.theme, system.dark);

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystem = () => setSystem({ dark: media.matches, languages: navigator.languages || [navigator.language] });
    const readSaved = () => {
      try { setSaved(parsePreferences(localStorage.getItem(PREFERENCES_KEY))); } catch { /* keep defaults */ }
    };
    const sync = (event: StorageEvent) => { if (event.key === PREFERENCES_KEY || event.key === null) readSaved(); };
    updateSystem(); readSaved();
    media.addEventListener('change', updateSystem);
    window.addEventListener('languagechange', updateSystem);
    window.addEventListener('storage', sync);
    return () => {
      media.removeEventListener('change', updateSystem);
      window.removeEventListener('languagechange', updateSystem);
      window.removeEventListener('storage', sync);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : locale;
    document.documentElement.style.colorScheme = theme;
  }, [locale, theme]);

  useEffect(() => {
    // Translated text may wrap differently. Re-measure without replaying intros
    // or moving the visitor back to the current hash.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [locale]);

  const setPreferences = (patch: Partial<Preferences>) => {
    const next = parsePreferences(JSON.stringify({ ...preferences, ...patch }));
    setSaved(next);
    try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next)); } catch { /* The current visit still respects the choice. */ }
  };
  return <Context.Provider value={{ preferences, locale, theme, setPreferences }}>{children}</Context.Provider>;
}

export function usePreferences() {
  const context = useContext(Context);
  if (!context) throw new Error('PreferencesProvider is required');
  return { ...context, t: translations[context.locale] };
}
