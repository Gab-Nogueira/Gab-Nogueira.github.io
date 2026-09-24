'use client';
import Link from 'next/link';
import { usePreferences } from '@/src/hooks/usePreferences';
import { PreferenceControls } from '@/src/components/PreferenceControls';
export default function NotFound() {
  const { t } = usePreferences();
  return <main className="not-found"><span className="micro">GABRIEL NOGUEIRA</span><h1>404</h1><p>{t.notFound.text}</p><Link className="text-link micro" href="/">{t.notFound.back} ↗</Link><PreferenceControls/></main>;
}
