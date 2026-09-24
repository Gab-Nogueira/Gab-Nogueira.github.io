'use client';

import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { navigation, profile } from '@/src/data/profile';
import { useMotion } from '@/src/hooks/useMotion';
import { ScrollLink } from './Shared';
import { PreferenceControls } from './PreferenceControls';
import { usePreferences } from '@/src/hooks/usePreferences';
import { createMenuNavigation } from '@/src/lib/menuNavigation';

export function Header() {
  const [open, setOpen] = useState(false);
  const { scrollTo, lock } = useMotion();
  const { t } = usePreferences();
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const menu = useRef<ReturnType<typeof createMenuNavigation> | null>(null);
  useEffect(() => {
    const controller = createMenuNavigation({
      setOpen,
      lock: active => lock('menu', active),
      focusTrigger: () => trigger.current?.focus({ preventScroll: true }),
      schedule: callback => requestAnimationFrame(callback),
      cancel: frame => cancelAnimationFrame(frame),
      navigate: href => {
        history.replaceState(history.state, '', href);
        scrollTo(href);
        const title = document.querySelector<HTMLElement>(`${href} h2`);
        if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
      },
    });
    menu.current = controller;
    return () => { controller.dispose(); menu.current = null; };
  }, [lock, scrollTo]);

  return <header className="hero-header">
    <ScrollLink href="#home" className="wordmark" aria-label={t.home}><span className="wordmark-symbol" aria-hidden="true">✳</span><span>GABRIEL<br/>NOGUEIRA</span></ScrollLink>
    <nav className="desktop-nav micro" aria-label={t.navigation}>{navigation.map((item, index) => <ScrollLink key={item.href} href={item.href} className="text-link">{t.nav[index]}</ScrollLink>)}</nav>
    <div className="header-actions"><PreferenceControls/>
    <Dialog open={open} onOpenChange={next=>menu.current?.changeOpen(next)} onOpenChangeComplete={next=>menu.current?.complete(next)} modal="trap-focus">
      <DialogTrigger ref={trigger} className="menu-trigger micro" aria-label={t.openMenu}><span className="menu-word">{t.menu}</span><span className="menu-glyph" aria-hidden="true">☰</span></DialogTrigger>
      <DialogContent className="navigation-panel" showCloseButton={false} initialFocus={close} finalFocus={false} data-lenis-prevent>
        <div className="navigation-top"><span className="wordmark">GABRIEL<br/>NOGUEIRA</span><DialogClose ref={close} className="menu-trigger micro" aria-label={t.closeMenu}>{t.close} <span className="menu-glyph" aria-hidden="true">×</span></DialogClose></div>
        <DialogTitle className="sr-only">{t.menuTitle}</DialogTitle>
        <DialogDescription className="sr-only">{t.menuHelp}</DialogDescription>
        <div className="navigation-layout"><div className="navigation-caption"><p className="micro">{t.menuCaption} ↗</p><PreferenceControls/></div><nav className="navigation-links" aria-label={t.menuTitle}>{navigation.map((item, index) => <a key={item.href} href={item.href} style={{ animationDelay: `${index * 65 + 180}ms` }} onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault(); menu.current?.select(item.href);
        }}><span className="micro">{item.number}</span><span>{t.nav[index]}</span><span className="nav-arrow" aria-hidden="true">↗</span></a>)}</nav></div>
        <div className="navigation-bottom micro"><a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a><span>SÃO JOSÉ DOS CAMPOS, BR</span></div>
      </DialogContent>
    </Dialog>
    </div>
  </header>;
}
