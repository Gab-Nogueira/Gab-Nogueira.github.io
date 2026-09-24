'use client';
import { useId } from 'react';
import { Globe2, Moon, Sun } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { usePreferences } from '@/src/hooks/usePreferences';
import type { LanguagePreference, ThemePreference } from '@/src/lib/preferences';

export function PreferenceControls() {
  const id = useId();
  const { preferences, theme, locale, setPreferences, t } = usePreferences();
  const ThemeIcon = theme === 'dark' ? Moon : Sun;
  return <fieldset className="preference-controls"><legend className="sr-only">{t.preferences.label}</legend>
    <label className="preference-control" htmlFor={`${id}-theme`}>
      <ThemeIcon size={15} aria-hidden="true"/>
      <span className="sr-only">{t.preferences.theme}</span>
      <NativeSelect id={`${id}-theme`} size="sm" value={preferences.theme} onChange={event => setPreferences({ theme: event.target.value as ThemePreference })}>
        <NativeSelectOption value="system">{t.preferences.system}</NativeSelectOption>
        <NativeSelectOption value="light">{t.preferences.light}</NativeSelectOption>
        <NativeSelectOption value="dark">{t.preferences.dark}</NativeSelectOption>
      </NativeSelect>
    </label>
    <label className="preference-control" htmlFor={`${id}-language`}>
      <Globe2 size={15} aria-hidden="true"/>
      <span className="sr-only">{t.preferences.language}</span>
      <NativeSelect id={`${id}-language`} size="sm" value={preferences.language} onChange={event => setPreferences({ language: event.target.value as LanguagePreference })}>
        <NativeSelectOption value="system">Auto · {locale.toUpperCase()}</NativeSelectOption>
        <NativeSelectOption value="pt" lang="pt-BR">Português</NativeSelectOption>
        <NativeSelectOption value="en" lang="en">English</NativeSelectOption>
        <NativeSelectOption value="es" lang="es">Español</NativeSelectOption>
      </NativeSelect>
    </label>
  </fieldset>;
}
