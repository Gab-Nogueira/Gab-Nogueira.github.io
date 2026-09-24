'use client';

import { useId, type AnchorHTMLAttributes, type ReactNode } from 'react';
import gsap from 'gsap';
import { useMotion } from '@/src/hooks/useMotion';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={diagonal ? 'arrow-diagonal' : undefined}><path d="M12 3v17M5 13l7 7 7-7" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

export function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return <div className="section-label micro"><span className="label-mask"><span data-reveal>{children}</span></span><span className="section-line"/><span className="label-number">({number})</span></div>;
}

export function ScrollLink({ href, onClick, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { scrollTo } = useMotion();
  return <a href={href} {...props} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    history.replaceState(history.state, '', href);
    scrollTo(href);
    const heading = target.querySelector<HTMLElement>('h1,h2');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  }}>{children}</a>;
}

export function TransitionLink({ href, children, transitionLabel, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; transitionLabel?: string }) {
  const { reduced } = useMotion();
  return <a {...props} href={href} onClick={event => {
    props.onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reduced) return;
    const overlay = document.getElementById('page-transition');
    if (!overlay) return;
    event.preventDefault();
    if (overlay.dataset.busy) return;
    overlay.dataset.busy = 'true';
    overlay.style.pointerEvents = 'auto';
    const label = overlay.querySelector('[data-transition-label]');
    if (label) label.textContent = transitionLabel || 'GABRIEL NOGUEIRA';
    gsap.fromTo(overlay, { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: .65, ease: 'power4.inOut', onComplete: () => { window.location.assign(href); } });
  }}>{children}</a>;
}

export function PageTransition() {
  return <div id="page-transition" className="page-transition" aria-hidden="true"><span className="micro" data-transition-label /></div>;
}

export function CircularSeal({ text }: { text: string }) {
  const id = useId().replace(/:/g, '');
  return <span className="circular-seal" aria-hidden="true"><svg className="seal-type" viewBox="0 0 120 120"><defs><path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs><circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth=".6"/><text><textPath href={`#${id}`} textLength="280" lengthAdjust="spacing">{text}</textPath></text></svg><span className="seal-arrow">↗</span></span>;
}
