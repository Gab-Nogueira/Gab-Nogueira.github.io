'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Hero } from './Hero';
import { About } from './About';
import { Expertise } from './Expertise';
import { WorkIntro, Projects } from './Projects';
import { Contact } from './Contact';
import { Loader } from './Loader';
import { CustomCursor } from './CustomCursor';
import { usePageAnimations } from '@/src/hooks/usePageAnimations';
import { usePreferences } from '@/src/hooks/usePreferences';
import { useHeroEntrance } from '@/src/hooks/useHeroEntrance';
import { useScrollLock } from '@/src/hooks/useMotion';

export function Portfolio() {
  const { t } = usePreferences();
  useEffect(() => { document.title = t.pageTitle; document.querySelector('meta[name="description"]')?.setAttribute('content', t.pageDescription); }, [t]);
  const [ready, setReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [animateHero, setAnimateHero] = useState(true);
  const root = useRef<HTMLElement>(null);
  const complete = useCallback((animate: boolean) => {
    setAnimateHero(animate);
    setIntroDone(true);
    if (!animate) setReady(true);
  }, []);
  const reveal = useCallback(() => setReady(true), []);
  useScrollLock('opening', !ready);
  useHeroEntrance(root, introDone && animateHero, reveal);
  usePageAnimations(root, ready);
  return <>
    {!introDone && <Loader onComplete={complete}/>}
    <a href="#main-content" className="skip-link">{t.skip}</a>
    <main id="main-content" className="portfolio" ref={root} data-entry={introDone ? 'revealed' : 'pending'} inert={!ready} aria-hidden={!ready || undefined} tabIndex={-1}>
      <Hero/><About/><div className="expertise-work-stage"><Expertise/><WorkIntro/></div><Projects/><Contact/>
    </main>
    {ready && <CustomCursor/>}
    <noscript><style>{'.intro-overlay {display:none} .portfolio [class] {visibility:visible}'}</style><p className="noscript-note">{t.noScript} <a href="mailto:gabsilvanogueira@gmail.com">gabsilvanogueira@gmail.com</a>.</p></noscript>
  </>;
}
