'use client';
import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from './useMotion';
import { expertisePosition, registerScrollAnchor } from '@/src/lib/scrollAnchors';

export function usePageAnimations(root: RefObject<HTMLElement | null>, ready: boolean) {
  const { reduced, scrollTo } = useMotion();
  useEffect(() => {
    if (!ready || !root.current) return;
    const context = gsap.context(() => {
      if (reduced) return;
      const media = gsap.matchMedia();
      media.add({ desktop: '(min-width: 901px)', normal: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.normal) return;
        const desktop = match.conditions.desktop;
        const cinematic = desktop;
        const scope = root.current!;
        const stage = scope.querySelector<HTMLElement>('.expertise-work-stage');
        const expertise = scope.querySelector<HTMLElement>('.expertise');
        const work = scope.querySelector<HTMLElement>('.work-intro');
        const unregister: (() => void)[] = [];
        const projects = scope.querySelector<HTMLElement>('.projects');
        const hero = scope.querySelector<HTMLElement>('.hero');

        if (hero && desktop) {
          gsap.to('.hero-main', { yPercent: -22, opacity: .4, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: () => `+=${window.innerHeight * .88}`, scrub: true, pin: hero, pinSpacing: false, anticipatePin: 1, invalidateOnRefresh: true } });
          gsap.fromTo('.about', { clipPath: 'inset(0 4.5% 0 4.5%)' }, { clipPath: 'inset(0 0% 0 0%)', ease: 'none', scrollTrigger: { trigger: '.about', start: 'top 92%', end: 'top 12%', scrub: true } });
        }

        if (cinematic && stage && expertise && work) {
          // Read Expertise at its natural height before pinning its bottom.
          stage.classList.add('is-horizontal');
          gsap.set(work, { xPercent: 100 });
          const horizontal = gsap.timeline({ scrollTrigger: {
            id: 'expertise-to-work', trigger: stage, start: 'bottom bottom',
            end: () => `+=${window.innerWidth * 1.25}`, pin: true, scrub: .7,
            anticipatePin: 1, invalidateOnRefresh: true,
          } });
          horizontal.to(expertise, { xPercent: -100, duration: 1, ease: 'none' }, 0)
            .to(work, { xPercent: 0, duration: 1, ease: 'none' }, 0)
            .to({}, { duration: .18 });
          unregister.push(registerScrollAnchor('#work', () => horizontal.scrollTrigger!.end));
          unregister.push(registerScrollAnchor('#expertise', () => expertisePosition(horizontal.scrollTrigger!.start, stage.offsetHeight, window.innerHeight)));
          gsap.fromTo('.work-title', { yPercent: 12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: stage, start: () => horizontal.scrollTrigger!.start, end: () => horizontal.scrollTrigger!.end, scrub: true } });
        } else if (work) {
          gsap.fromTo('.work-title', { xPercent: 5, clipPath: 'inset(0 0 0 100%)' }, { xPercent: 0, clipPath: 'inset(0 0 0 0%)', ease: 'none', scrollTrigger: { trigger: work, start: 'top 95%', end: 'center 50%', scrub: true } });
        }

        gsap.utils.toArray<HTMLElement>('[data-line]', scope).forEach(line => {
          gsap.from(line, { yPercent: 110, duration: .95, ease: 'power4.out', scrollTrigger: { trigger: line.parentElement, start: 'top 94%', once: true } });
        });
        gsap.utils.toArray<HTMLElement>('[data-reveal]', scope).forEach(element => {
          gsap.from(element, { y: desktop ? 36 : 22, autoAlpha: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 93%', once: true } });
        });
        gsap.utils.toArray<HTMLElement>('.section-line', scope).forEach(line => gsap.from(line, { scaleX: 0, transformOrigin: 'left', duration: 1.25, ease: 'power3.inOut', scrollTrigger: { trigger: line, start: 'top 95%', once: true } }));
        if (desktop && scope.querySelector('.identity-frame')) gsap.fromTo('.identity-type, .portrait-image', { yPercent: -6, scale: 1.05 }, { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { trigger: '.identity-frame', start: 'top bottom', end: 'bottom top', scrub: true } });

        const cards = gsap.utils.toArray<HTMLElement>('.project-card', scope);
        if (cinematic) projects?.classList.add('is-stacked');
        cards.forEach((card, index) => {
          const link = card.querySelector<HTMLElement>('.project-link')!;
          const text = card.querySelectorAll('.project-heading, .project-overlay-footer');
          if (cinematic) {
            // Scale the inner surface, keeping the sticky article's geometry.
            card.style.zIndex = String(index + 1);
            gsap.fromTo(link, { '--project-dim': 0 }, { '--project-dim': 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 82%', end: 'top 24%', scrub: true } });
            gsap.fromTo(text, { opacity: 0, y: 32 }, { opacity: 1, y: 0, stagger: .08, ease: 'none', scrollTrigger: { trigger: card, start: 'top 65%', end: 'top 22%', scrub: true } });
            const next = cards[index + 1];
            if (next) gsap.to(link, { scale: .94, ease: 'none', scrollTrigger: { trigger: next, start: 'top 92%', end: 'top 12%', scrub: true } });
          } else {
            gsap.from(card, { y: 35, opacity: .7, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 65%', scrub: true } });
            gsap.from(card.querySelector('.project-image-mask'), { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
          }
          if (desktop) gsap.fromTo(card.querySelector('.project-image'), { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
        });

        const restoreExpertise = (event: FocusEvent) => {
          // Menu navigation focuses the heading with preventScroll; preserve
          // that deliberate smooth trip. Only a tab into a control needs rescue.
          if (!(event.target instanceof HTMLElement) || !event.target.matches('a,button,summary,select,input,textarea,[tabindex="0"]')) return;
          const trigger = ScrollTrigger.getById('expertise-to-work');
          if (trigger && trigger.progress > .02) scrollTo('#expertise', { immediate: true });
        };
        expertise?.addEventListener('focusin', restoreExpertise);
        return () => {
          unregister.forEach(remove => remove());
          stage?.classList.remove('is-horizontal');
          projects?.classList.remove('is-stacked');
          cards.forEach(card => card.style.removeProperty('z-index'));
          expertise?.removeEventListener('focusin', restoreExpertise);
        };
      });
    }, root);
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash;
      if (hash && hash !== '#home' && document.getElementById(hash.slice(1))) {
        scrollTo(hash, { immediate: true });
        ScrollTrigger.update();
      }
    });
    return () => { cancelAnimationFrame(frame); context.revert(); };
  }, [root, ready, reduced, scrollTo]);
}
