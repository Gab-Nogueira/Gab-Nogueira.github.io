'use client';
import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { introSequence } from '@/src/lib/introSequence';

export function useHeroEntrance(root: RefObject<HTMLElement | null>, start: boolean, onComplete: () => void) {
  useLayoutEffect(() => {
    if (!start || !root.current) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) { onComplete(); return; }
    let timeline: gsap.core.Timeline;
    const context = gsap.context(() => {
      // This runs before paint on the same commit that removes the curtain.
      // Letter wrappers own the entrance; inner ink owns pointer distortion.
      timeline = gsap.timeline({ onComplete, defaults: { ease: 'power3.out' } })
        .fromTo('.hero-header, .hero-rule, .hero-explore', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .06 }, 0)
        .fromTo('.hero-footer', { autoAlpha: 0, y: 90 }, { autoAlpha: 1, y: 0, duration: 1 }, .05)
        .fromTo('.hero-letter', { yPercent: 115, opacity: .3 }, { yPercent: 0, opacity: 1, duration: introSequence.heroLetters, stagger: introSequence.heroStagger }, .2)
        .fromTo('.hero-subtitle', { yPercent: 115, opacity: .3 }, { yPercent: 0, opacity: 1, duration: .75 }, introSequence.heroSubtitleAt)
        .fromTo('.hero-traits', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .65 }, 1.15);
      timeline.paused(document.hidden);
    }, root);
    const visibility = () => timeline.paused(document.hidden);
    const reduce = () => { if (query.matches) timeline.progress(1); };
    document.addEventListener('visibilitychange', visibility);
    query.addEventListener('change', reduce);
    return () => {
      document.removeEventListener('visibilitychange', visibility);
      query.removeEventListener('change', reduce);
      context.revert();
    };
  }, [root, start, onComplete]);
}
