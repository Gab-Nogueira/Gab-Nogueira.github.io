'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useScrollLock } from '@/src/hooks/useMotion';
import { usePreferences } from '@/src/hooks/usePreferences';
import { prepareHandwriting } from '@/src/lib/handwriting';
import { crossColumns, introBeats, introSequence } from '@/src/lib/introSequence';

const INTRO_KEY = 'gn-intro-seen-v5';

export function Loader({ onComplete }: { onComplete: (animateHero: boolean) => void }) {
  const { t, locale } = usePreferences();
  const root = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'hello'>('loading');
  const finished = useRef(false);
  useScrollLock('intro', true);

  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let fontTimeout: ReturnType<typeof setTimeout>;
    let assetsReady = false;
    let introTimeline: gsap.core.Timeline | undefined;
    const finish = (animateHero = true) => {
      if (disposed || finished.current) return;
      finished.current = true;
      try { sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* Private browsing may disable storage. */ }
      onComplete(animateHero);
    };
    let seen = false;
    try { seen = sessionStorage.getItem(INTRO_KEY) === '1'; } catch { /* The intro still works without storage. */ }
    const replay = new URLSearchParams(window.location.search).get('intro') === 'replay';
    if ((seen && !replay) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish(false);
      return;
    }

    const context = gsap.context(() => {
      const milestones = [0, 4, 14, 31, 57, 79, 92, 97, 99];
      const start = performance.now();
      const animateIntro = () => context.add(() => {
        // A replay may start after the browser restores a previous scroll.
        // Reset while the opaque curtain still covers the page.
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        setProgress(100);
        // The preference bootstrap may have changed the language during loading.
        // Measure the paths now, after React has committed the current greeting.
        const strokes = prepareHandwriting(Array.from(root.current!.querySelectorAll<SVGPathElement>('.hello-path')), introSequence.writing);
        const beats = introBeats();
        const timeline = gsap.timeline({ onComplete: finish });
        introTimeline = timeline;
        timeline.to('.loader-progress', { y: () => -window.innerHeight, duration: introSequence.loadingExit, ease: 'power3.in' }, beats.loadingExit)
          .set('.hello-art', { autoAlpha: 1 }, beats.writing)
          .call(() => setPhase('hello'), [], beats.writing)
          .addLabel('writing', beats.writing);
        strokes.forEach(stroke => timeline.fromTo(stroke.path,
          { attr: { 'stroke-dashoffset': stroke.length } },
          { attr: { 'stroke-dashoffset': 0 }, duration: stroke.duration, ease: 'none', immediateRender: false },
          `writing+=${stroke.start}`));
        timeline.fromTo('.hello-caption', { autoAlpha: 0, y: 12 }, { autoAlpha: .75, y: 0, duration: .5 }, beats.writing + introSequence.writing - .1)
          .to('.hello-art, .hello-caption', { y: () => -window.innerHeight, duration: introSequence.greetingExit, ease: 'power3.in' }, beats.greetingExit)
          .to('.intro-signature, .intro-bottom', { autoAlpha: 0, duration: .25 }, beats.greetingExit)
          // An opposite-color stage makes the wipe visible in BOTH themes.
          // The opening and the final curtain still share the hero surface.
          .set('.cross-wipe', { autoAlpha: 1 }, beats.wipe)
          .fromTo('.cross-horizon', { scaleX: 0 }, { scaleX: 1, duration: .3, ease: 'power2.out' }, beats.wipe);
        crossColumns.forEach((distance, index) => timeline.fromTo(`.cross-column:nth-child(${index + 2})`,
          { scaleY: 0 }, { scaleY: 1, duration: .7, ease: 'power3.inOut' }, beats.wipe + distance * .22));
        timeline.to('.intro-skip', { autoAlpha: 0, duration: .15 }, beats.wipe + .8)
          .set('.cross-wipe', { autoAlpha: 1 }, beats.complete);
        timeline.paused(document.hidden);
      });
      const tick = () => {
        if (disposed) return;
        const elapsed = performance.now() - start;
        const position = Math.min(elapsed / (introSequence.loadingMinimum * 1000), 1) * (milestones.length - 1);
        const segment = Math.min(Math.floor(position), milestones.length - 2);
        const fraction = position - segment;
        const value = milestones[segment] + (milestones[segment + 1] - milestones[segment]) * fraction;
        setProgress(Math.floor(value));
        if (elapsed >= introSequence.loadingMinimum * 1000 && assetsReady) { animateIntro(); return; }
        frame = requestAnimationFrame(tick);
      };
      // Fonts are the only critical first-viewport assets. A timeout prevents
      // a failed font request from locking the site; the system font remains usable.
      fontTimeout = setTimeout(() => { assetsReady = true; }, 5600);
      void Promise.allSettled([
        document.fonts.load('16px Anton'),
        document.fonts.load('16px "Manrope Variable"'),
        document.fonts.ready,
      ]).then(() => { if (!disposed) assetsReady = true; });
      frame = requestAnimationFrame(tick);
    }, root);
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onReduce = () => { if (reduceQuery.matches) finish(false); };
    const onVisibility = () => introTimeline?.paused(document.hidden);
    reduceQuery.addEventListener('change', onReduce);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { disposed = true; cancelAnimationFrame(frame); clearTimeout(fontTimeout); introTimeline?.kill(); context.revert(); reduceQuery.removeEventListener('change', onReduce); document.removeEventListener('visibilitychange', onVisibility); };
  }, [onComplete]);

  return <section className="intro-overlay" ref={root} aria-label={t.loader.label}>
    <span className="intro-signature micro" aria-hidden="true">GABRIEL NOGUEIRA®</span>
    <div className="loader-progress"><progress className="sr-only" aria-label={t.loader.loading} max={100} value={progress}/>
      <div className="loader-sculpture" aria-hidden="true"><div className="loader-gyroscope"><span className="loader-orbit loader-orbit-a"/><span className="loader-orbit loader-orbit-b"/><span className="loader-orbit loader-orbit-c"/><span className="loader-satellite"/><span className="loader-core">✳</span></div><svg className="loader-perimeter" viewBox="0 0 220 220"><circle cx="110" cy="110" r="104" pathLength="100" fill="none" stroke="currentColor" strokeWidth=".65" opacity=".2"/><circle cx="110" cy="110" r="104" pathLength="100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="100" strokeDashoffset={100-progress}/></svg></div>
      <div className="loader-readout" aria-hidden="true"><span className="loader-stage micro">{t.loader.stages[progress<35?0:progress<95?1:2]}</span><span className="loader-number">{progress}<small>%</small></span></div>
    </div>
    <svg className="hello-art" viewBox="0 0 340 180" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path className="hello-path" d={locale==='en'
        ? 'M35 137C44 117 52 79 63 53C77 20 93 27 82 51C74 69 48 98 41 119C56 91 72 76 76 92C79 105 56 135 71 138C86 138 107 112 118 99C136 76 111 75 99 93C85 115 93 143 114 136C141 128 163 83 173 52C186 11 161 18 153 45C141 82 131 136 145 137C167 140 193 80 201 47C209 15 188 20 180 47C172 76 158 133 176 138C190 139 199 120 209 104C226 76 257 81 245 110C235 139 204 150 202 125C199 107 213 88 228 88C229 106 248 112 263 107C277 104 286 91 301 82'
        : locale==='pt'
          ? 'M103 95C81 85 64 111 72 132C82 155 111 131 115 108C120 86 99 86 98 99C97 112 119 115 130 105C150 85 169 49 164 34C157 10 139 48 136 70C130 101 124 137 141 138C155 139 169 115 181 104C202 82 222 92 211 113C202 139 178 147 178 126C177 110 196 87 210 95C218 101 213 119 213 130C214 151 240 129 251 114'
          : 'M31 137C40 112 49 70 63 42C75 19 90 30 75 55C65 73 45 104 37 127C53 97 69 87 72 102C74 118 57 138 72 140C87 139 101 115 110 102C129 78 150 92 138 117C127 144 102 147 102 128C103 108 120 90 130 96C131 113 152 115 164 101C180 81 196 44 188 32C177 19 163 52 159 78C153 108 151 135 164 138C178 141 198 114 208 105C229 82 249 92 238 114C226 141 205 145 205 126C205 109 223 87 238 96C245 103 239 119 240 131C242 149 265 129 278 113'}/>
      <path className="hello-path" d={locale==='pt'?'M201 76L217 57M117 158C147 153 174 152 205 154':'M117 158C147 153 174 152 205 154'}/>
    </g></svg>
    <p className="hello-caption micro" aria-hidden="true">{t.loader.hello}</p>
    <div className="cross-wipe" aria-hidden="true"><div className="cross-horizon"/>{crossColumns.map((_, index) => <div className="cross-column" key={index}/>)}</div>
    <output className="sr-only" aria-live="polite">{t.loader[phase]}</output>
    <button className="intro-skip micro text-link" onClick={() => { finished.current = true; try { sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* optional */ } onComplete(false); }}>{t.loader.skip} <span aria-hidden="true">↗</span></button>
    <span className="intro-bottom micro" aria-hidden="true">{t.loader.patience}</span>
  </section>;
}
