import type { Metadata } from 'next';
import { ClientShell } from '@/src/components/ClientShell';
import { preferencesBootstrap } from '@/src/lib/preferences';
import { translations } from '@/src/data/translations';
import '@fontsource/anton/latin-400.css';
import '@fontsource-variable/manrope/index.css';
import '@fontsource/dm-mono/latin-400.css';
import 'lenis/dist/lenis.css';
import './globals.css';
export const metadata: Metadata = {
  title: translations.pt.pageTitle,
  description: translations.pt.pageDescription,
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: preferencesBootstrap }}/></head><body><ClientShell>{children}</ClientShell></body></html>;
}
