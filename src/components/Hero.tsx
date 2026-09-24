'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMotion } from '@/src/hooks/useMotion';
import { usePreferences } from '@/src/hooks/usePreferences';
import { textInkRect, titleImpulse, type PointerSample } from '@/src/lib/pointerMotion';
import { Header } from './Header';
import { CircularSeal, ScrollLink } from './Shared';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const displacement = useRef<SVGFEDisplacementMapElement>(null);
  const noiseOffset = useRef<SVGFEOffsetElement>(null);
  const { reduced } = useMotion();
  const { t } = usePreferences();

  useEffect(() => {
    let cancelled = false;
    const fit = () => {
      if (cancelled || !heading.current) return;
      const canvas = document.createElement('canvas');
      const measure = canvas.getContext('2d');
      if (!measure) return;
      measure.font = '100px Anton';
      const wordWidth = measure.measureText(t.hero.word).width / 100 - .035 * (t.hero.word.length - 1);
      const available = heading.current.parentElement!.clientWidth * .98;
      const maxHeight = Math.max(window.innerHeight, 620) * .39;
      heading.current.style.fontSize = `${Math.min(available / wordWidth, maxHeight)}px`;
    };
    void document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    if (root.current) observer.observe(root.current);
    return () => { cancelled = true; observer.disconnect(); };
  }, [t.hero.word]);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia('(pointer: fine)');
    const title = heading.current!;
    const section = root.current!;
    const letters = Array.from(title.querySelectorAll<HTMLElement>('.hero-letter'));
    const ink = letters.map(letter => letter.querySelector<HTMLElement>('.hero-letter-ink')!);
    const measure = document.createElement('canvas').getContext('2d');
    if (!measure) return;
    let metrics: TextMetrics;
    let disposed = false;
    const measureFont = () => { measure.font = '100px Anton'; metrics = measure.measureText(t.hero.word); };
    measureFont();
    void document.fonts.ready.then(() => { if (!disposed) measureFont(); });
    const inkBounds = () => {
      const style = getComputedStyle(letters[0]);
      const size = parseFloat(style.fontSize);
      const font = { size, lineHeight: parseFloat(style.lineHeight) || size * 1.53,
        ascent: (metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent) / 100,
        descent: (metrics.fontBoundingBoxDescent || 0) / 100,
        inkAscent: metrics.actualBoundingBoxAscent / 100, inkDescent: metrics.actualBoundingBoxDescent / 100 };
      return letters.map(letter => textInkRect(letter.getBoundingClientRect(), font));
    };
    const context = gsap.context(() => {}, root);
    let moveX: gsap.QuickToFunc, moveY: gsap.QuickToFunc, rotate: gsap.QuickToFunc;
    context.add(() => {
      const star = root.current!.querySelector('.hero-stamp');
      moveX = gsap.quickTo(star, 'x', { duration: 1, ease: 'power2.out' });
      moveY = gsap.quickTo(star, 'y', { duration: 1, ease: 'power2.out' });
      rotate = gsap.quickTo(star, 'rotation', { duration: 1, ease: 'power2.out' });
    });
    let previous: PointerSample | null = null;
    let resting: gsap.core.Tween;
    let relax: gsap.core.Tween;
    let scaleTo: gsap.QuickToFunc;
    const deformation = { scale: 0 };
    const originalFilter = title.style.filter;
    const letterMotion: { x: gsap.QuickToFunc; y: gsap.QuickToFunc; skew: gsap.QuickToFunc }[] = [];
    const paint = () => displacement.current?.setAttribute('scale', String(deformation.scale));
    let active = false;
    const settle = () => {
      previous = null;
      resting.pause();
      if (!active) return;
      active = false;
      scaleTo.tween.pause();
      relax.invalidate().restart();
      letterMotion.forEach(letter => { letter.x(0); letter.y(0); letter.skew(0); });
    };
    context.add(() => {
      scaleTo = gsap.quickTo(deformation, 'scale', { duration: .14, ease: 'power2.out', onUpdate: paint });
      relax = gsap.to(deformation, { scale: 0, duration: .32, paused: true, onUpdate: paint,
        onComplete: () => { title.style.filter = originalFilter; } });
      resting = gsap.delayedCall(.16, settle).pause();
      ink.forEach(letter => letterMotion.push({
        x: gsap.quickTo(letter, 'x', { duration: .4, ease: 'power3.out' }),
        y: gsap.quickTo(letter, 'y', { duration: .4, ease: 'power3.out' }),
        skew: gsap.quickTo(letter, 'skewX', { duration: .4, ease: 'power3.out' }),
      }));
    });
    const react = (point: PointerSample, from = previous) => {
      const bounds = inkBounds();
      const impulse = titleImpulse(point, from, bounds);
      if (!impulse.active) { settle(); return; }
      previous = point;
      if (!impulse.strength) return;
      active = true;
      relax.pause();
      title.style.filter = 'url(#type-distortion)';
      scaleTo(impulse.strength, deformation.scale);
      noiseOffset.current?.setAttribute('dx', String((point.x - bounds[0].left) * .06));
      noiseOffset.current?.setAttribute('dy', String((point.y - bounds[0].top) * .08));
      letterMotion.forEach((letter, index) => {
        const rect = bounds[index];
        const influence = Math.exp(-Math.pow((point.x - rect.left - rect.width / 2) / (rect.width * 1.5), 2));
        letter.x(impulse.x * .18 * influence); letter.y(impulse.y * .12 * influence); letter.skew(impulse.x * .32 * influence);
      });
      resting.restart(true);
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType === 'touch') return;
      const dx = (event.clientX / window.innerWidth - .5) * 20;
      const dy = (event.clientY / window.innerHeight - .5) * 20;
      moveX(dx); moveY(dy); rotate(dx * .5);
    };
    const hover = (event: PointerEvent) => { if (event.pointerType !== 'touch' && fine.matches) react({ x: event.clientX, y: event.clientY, time: event.timeStamp }); };
    let touch: PointerSample | null = null;
    const down = (event: PointerEvent) => { if (event.pointerType === 'touch') touch = { x: event.clientX, y: event.clientY, time: event.timeStamp }; };
    const up = (event: PointerEvent) => {
      if (touch && Math.hypot(event.clientX-touch.x,event.clientY-touch.y)<12) {
        const point = { x: event.clientX, y: event.clientY, time: event.timeStamp };
        react(point, { x: point.x - 9, y: point.y - 4, time: point.time - 16 });
      }
      touch = null;
    };
    const cancel = () => { touch = null; settle(); };
    title.addEventListener('pointermove', hover, { passive: true });
    title.addEventListener('pointerleave', cancel);
    title.addEventListener('pointerdown', down, { passive: true });
    title.addEventListener('pointerup', up, { passive: true });
    title.addEventListener('pointercancel', cancel);
    section.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', cancel);
    return () => { disposed = true; title.removeEventListener('pointermove', hover); title.removeEventListener('pointerleave', cancel); title.removeEventListener('pointerdown', down); title.removeEventListener('pointerup', up); title.removeEventListener('pointercancel', cancel); section.removeEventListener('pointermove', move); window.removeEventListener('blur', cancel); context.revert(); title.style.filter = originalFilter; };
  }, [reduced, t.hero.word]);

  return <section className="hero" id="home" ref={root} aria-label={t.pageTitle}>
    <Header />
    <svg className="filter-definitions" aria-hidden="true"><defs><filter id="type-distortion" x="-10%" y="-20%" width="120%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".012 .045" numOctaves="2" seed="8" result="noise"/><feOffset ref={noiseOffset} in="noise" dx="0" dy="0" result="moving-noise"/><feDisplacementMap ref={displacement} in="SourceGraphic" in2="moving-noise" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>
    <div className="hero-rule" />
    <div className="hero-main">
      <div className="hero-title-mask"><h1 className="hero-title" ref={heading} aria-label={`${t.hero.role} ${t.hero.word}`}><span className="hero-word">{t.hero.word.split('').map((letter, index) => <span className="hero-letter" key={index} aria-hidden="true"><span className="hero-letter-ink">{letter}</span></span>)}</span></h1></div>
      <div className="hero-subline"><span className="hero-subtitle-mask"><span className="hero-subtitle">{t.hero.role}</span></span><div className="hero-traits micro">{t.hero.traits.map((trait, index) => <span key={index}>{trait}</span>)}</div></div>
    </div>
    <ScrollLink href="#about" className="hero-explore micro" aria-label={t.hero.about}><span>{t.hero.explore}</span><span className="scroll-stem" aria-hidden="true"/></ScrollLink>
    <footer className="hero-footer"><div className="hero-signature micro"><span>© 2026 GABRIEL NOGUEIRA</span><span className="availability"><i className="status-dot"/>{t.hero.available}</span></div><div className="hero-location"><ScrollLink href="#contact" className="hero-stamp" aria-label={t.contact.formHeading}><CircularSeal text={t.hero.stamp}/></ScrollLink><span className="micro">{t.hero.location}</span></div></footer>
  </section>;
}
