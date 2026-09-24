'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMotion } from '@/src/hooks/useMotion';
import { stringControl } from '@/src/lib/pointerMotion';

export function ElasticLine() {
  const root = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const { reduced } = useMotion();
  useEffect(() => {
    if (reduced) return;
    const svg = root.current!, stroke = path.current!;
    const point = { x: 500, y: 60 };
    const paint = () => stroke.setAttribute('d', `M0 60 Q${point.x} ${point.y} 1000 60`);
    const context = gsap.context(() => {}, svg);
    let xTo: gsap.QuickToFunc, yTo: gsap.QuickToFunc, spring: gsap.core.Tween;
    context.add(() => {
      xTo = gsap.quickTo(point, 'x', { duration: .16, ease: 'power2.out', onUpdate: paint });
      yTo = gsap.quickTo(point, 'y', { duration: .16, ease: 'power2.out', onUpdate: paint });
      spring = gsap.to(point, { x: 500, y: 60, duration: 1.35, ease: 'elastic.out(1,.25)', paused: true, onUpdate: paint });
    });
    const release = () => { xTo.tween.pause(); yTo.tween.pause(); spring.invalidate().restart(); };
    const pull = (event: PointerEvent) => {
      const position = stringControl({ x: event.clientX, y: event.clientY }, svg.getBoundingClientRect());
      spring.pause(); xTo(position.x, point.x); yTo(position.y, point.y);
    };
    const touch = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      const position = stringControl({ x: event.clientX, y: event.clientY }, svg.getBoundingClientRect());
      spring.pause(); xTo(position.x, point.x); yTo(108, point.y);
    };
    svg.addEventListener('pointermove', pull, { passive: true });
    svg.addEventListener('pointerdown', touch, { passive: true });
    svg.addEventListener('pointerleave', release);
    svg.addEventListener('pointerup', release);
    svg.addEventListener('pointercancel', release);
    return () => {
      svg.removeEventListener('pointermove', pull); svg.removeEventListener('pointerdown', touch);
      svg.removeEventListener('pointerleave', release); svg.removeEventListener('pointerup', release); svg.removeEventListener('pointercancel', release);
      context.revert(); stroke.setAttribute('d', 'M0 60 Q500 60 1000 60');
    };
  }, [reduced]);
  return <span className="section-line elastic-line" aria-hidden="true"><svg ref={root} viewBox="0 0 1000 120" preserveAspectRatio="none"><rect width="1000" height="120" fill="transparent"/><path ref={path} d="M0 60 Q500 60 1000 60" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/></svg></span>;
}
