'use client';
import { useEffect, useRef } from 'react';
import { useMotion } from '@/src/hooks/useMotion';

export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotion();

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!fine.matches || reduced) return;
    let x = -100, y = -100, currentX = -100, currentY = -100;
    let frame = 0;
    let initialized = false;
    const outer = ring.current!;
    const point = dot.current!;
    const tick = () => {
      currentX += (x - currentX) * .12;
      currentY += (y - currentY) * .12;
      outer.style.transform = `translate3d(${currentX}px,${currentY}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !fine.matches) { hide(); return; }
      x = event.clientX; y = event.clientY;
      if (!initialized) { currentX = x; currentY = y; initialized = true; }
      point.style.transform = `translate3d(${x}px,${y}px,0)`;
      outer.classList.add('cursor-visible'); point.classList.add('cursor-visible');
      if (!frame) frame = requestAnimationFrame(tick);
      const element = event.target instanceof Element ? event.target : null;
      const project = element?.closest('[data-cursor]');
      const clickable = element?.closest('a,button,input,textarea,summary,[tabindex="0"]');
      outer.classList.toggle('cursor-hover', !!clickable);
      outer.classList.toggle('cursor-project', !!project);
      if (label.current) label.current.textContent = project?.getAttribute('data-cursor') || '';
    };
    const hide = () => { outer.classList.remove('cursor-visible'); point.classList.remove('cursor-visible'); cancelAnimationFrame(frame); frame = 0; };
    const visibility = () => { if (document.hidden) hide(); };
    const onMediaChange = () => { if (!fine.matches) { hide(); document.documentElement.classList.remove('has-custom-cursor'); } else document.documentElement.classList.add('has-custom-cursor'); };
    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', hide);
    fine.addEventListener('change', onMediaChange);
    return () => {
      cancelAnimationFrame(frame); document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', visibility); window.removeEventListener('blur', hide); fine.removeEventListener('change', onMediaChange);
    };
  }, [reduced]);

  return <><div className="cursor-dot" ref={dot} aria-hidden="true"/><div className="cursor-ring" ref={ring} aria-hidden="true"><div className="cursor-ring-inner"><span ref={label}/></div></div></>;
}
