'use client';
import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { useMotion } from './useMotion';
import { cutoutOrbit, dropletOrbit } from '@/src/lib/workDroplets';
import { dropletPush } from '@/src/lib/pointerMotion';

export function useWorkDroplets(root: RefObject<SVGSVGElement | null>) {
  const { reduced } = useMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    const svg = root.current;
    const bubbles = Array.from(svg.querySelectorAll<SVGGElement>('.work-droplet'));
    const circles = bubbles.map(bubble => bubble.querySelector('circle')!);
    const loops: gsap.core.Timeline[] = [];
    const push: { x: gsap.QuickToFunc; y: gsap.QuickToFunc }[] = [];
    let visible = false;
    const context = gsap.context(() => {
      svg.querySelectorAll<SVGCircleElement>('.work-cutout').forEach((circle, index) => {
        const orbit = cutoutOrbit(index);
        const timeline = gsap.timeline({ repeat: -1, paused: true });
        gsap.set(circle, { attr: orbit[0] });
        orbit.slice(1).forEach(point => timeline.to(circle, { attr: point, duration: 1.5 + index % 3 * .3, ease: 'sine.inOut' }));
        timeline.progress(index * .19 % 1);
        loops.push(timeline);
      });
      circles.forEach((circle, index) => {
        const orbit = dropletOrbit(index);
        const timeline = gsap.timeline({ repeat: -1, paused: true });
        gsap.set(circle, { attr: orbit[0] });
        orbit.slice(1).forEach(point => timeline.to(circle, { attr: point, duration: 1.2 + index % 4 * .22, ease: 'sine.inOut' }));
        timeline.progress(index * .137 % 1);
        loops.push(timeline);
        push.push({ x: gsap.quickTo(bubbles[index], 'x', { duration: .7, ease: 'power3.out' }),
          y: gsap.quickTo(bubbles[index], 'y', { duration: .7, ease: 'power3.out' }) });
      });
    }, svg);
    const sync = () => loops.forEach(loop => loop.paused(!visible || document.hidden));
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { rootMargin: '40px' });
    observer.observe(svg);
    const move = (event: PointerEvent) => {
      if (!visible) return;
      const rect = svg.getBoundingClientRect();
      const pointer = { x: (event.clientX - rect.left) / rect.width * 1000, y: (event.clientY - rect.top) / rect.height * 320 };
      const parent = svg.querySelector<SVGGElement>('.work-droplets')!;
      const parentY = Number(gsap.getProperty(parent, 'y')) || 0;
      circles.forEach((circle, index) => {
        // Include the parent's scroll transform so the response stays under the cursor.
        const offset = dropletPush(pointer, { x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')) + parentY });
        push[index].x(offset.x); push[index].y(offset.y);
      });
    };
    const release = () => push.forEach(point => { point.x(0); point.y(0); });
    svg.addEventListener('pointermove', move, { passive: true });
    svg.addEventListener('pointerleave', release);
    svg.addEventListener('pointerup', release);
    svg.addEventListener('pointercancel', release);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect(); document.removeEventListener('visibilitychange', sync);
      svg.removeEventListener('pointermove', move); svg.removeEventListener('pointerleave', release);
      svg.removeEventListener('pointerup', release); svg.removeEventListener('pointercancel', release);
      context.revert();
    };
  }, [root, reduced]);
}
