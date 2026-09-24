'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { resolveScrollAnchor } from '@/src/lib/scrollAnchors';

gsap.registerPlugin(ScrollTrigger);

interface MotionContextValue {
  reduced: boolean;
  scrollTo: (target: string | number, options?: { immediate?: boolean }) => void;
  lock: (reason: string, active: boolean) => void;
}
const MotionContext = createContext<MotionContextValue>({ reduced: false, scrollTo: () => {}, lock: () => {} });
export const useMotion = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const locks = useRef(new Set<string>());
  const previousOverflow = useRef('');
  const [reduced, setReduced] = useState(false);

  const lock = useCallback((reason: string, active: boolean) => {
    const wasLocked = locks.current.size > 0;
    if (active) locks.current.add(reason); else locks.current.delete(reason);
    if (locks.current.size) {
      if (!wasLocked) previousOverflow.current = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      lenis.current?.stop();
    } else if (wasLocked) {
      document.documentElement.style.overflow = previousOverflow.current;
      lenis.current?.start();
    }
  }, []);

  const scrollTo = useCallback((target: string | number, options?: { immediate?: boolean }) => {
    const destination = typeof target === 'string' ? resolveScrollAnchor(target) ?? document.querySelector<HTMLElement>(target) : target;
    if (destination === null) return;
    if (lenis.current) {
      // ScrollTrigger can add pin spacing before ResizeObserver updates Lenis.
      // Refresh its limits now so a deep link is not clamped to the old height.
      lenis.current.resize();
      lenis.current.scrollTo(destination, { offset: 0, duration: 1.65, immediate: options?.immediate });
    }
    else if (typeof destination === 'number') window.scrollTo({ top: destination, behavior: 'auto' });
    else destination.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, []);

  useEffect(() => {
    const activeLocks = locks.current;
    const originalOverflow = previousOverflow.current;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopQuery = window.matchMedia('(min-width: 901px) and (pointer: fine)');
    let ticker: ((time: number) => void) | undefined;
    const setup = () => {
      if (ticker) gsap.ticker.remove(ticker);
      lenis.current?.destroy();
      lenis.current = null;
      setReduced(motionQuery.matches);
      if (!motionQuery.matches && desktopQuery.matches) {
        const instance = new Lenis({ lerp: .075, smoothWheel: true, syncTouch: false, autoRaf: false, anchors: false });
        instance.on('scroll', () => ScrollTrigger.update());
        ticker = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
        lenis.current = instance;
        if (locks.current.size) instance.stop();
      }
      ScrollTrigger.refresh();
    };
    setup();
    motionQuery.addEventListener('change', setup);
    desktopQuery.addEventListener('change', setup);
    // Refresh after fonts and image dimensions settle, including lazy images.
    let cancelled = false;
    void document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    let refreshFrame = 0;
    const onLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };
    document.addEventListener('load', onLoad, true);
    return () => {
      cancelled = true;
      if (ticker) gsap.ticker.remove(ticker);
      lenis.current?.destroy();
      lenis.current = null;
      cancelAnimationFrame(refreshFrame);
      motionQuery.removeEventListener('change', setup);
      desktopQuery.removeEventListener('change', setup);
      document.removeEventListener('load', onLoad, true);
      if (activeLocks.size) document.documentElement.style.overflow = originalOverflow;
      activeLocks.clear();
    };
  }, []);

  return <MotionContext.Provider value={{ reduced, scrollTo, lock }}>{children}</MotionContext.Provider>;
}

export function useScrollLock(reason: string, active: boolean) {
  const { lock } = useMotion();
  useEffect(() => { lock(reason, active); return () => lock(reason, false); }, [lock, reason, active]);
}
