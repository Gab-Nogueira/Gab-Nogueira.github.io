'use client';
import { useEffect, type ReactNode } from 'react';
import { MotionProvider } from '@/src/hooks/useMotion';
import { PreferencesProvider } from '@/src/hooks/usePreferences';
import { PageTransition } from './Shared';

export function ClientShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const restore = () => {
      const overlay = document.getElementById('page-transition');
      if (overlay) { overlay.style.transform = 'scaleY(0)'; overlay.style.pointerEvents = 'none'; delete overlay.dataset.busy; }
    };
    window.addEventListener('pageshow', restore);
    return () => window.removeEventListener('pageshow', restore);
  }, []);
  return <PreferencesProvider><MotionProvider>{children}<PageTransition/></MotionProvider></PreferencesProvider>;
}
