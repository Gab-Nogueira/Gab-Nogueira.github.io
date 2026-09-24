'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { Pause, Play, Sheet } from 'lucide-react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { technologies, type Technology } from '@/src/data/technologies';
import { getFloatPath, technologyParallax } from '@/src/lib/floating';
import { useMotion } from '@/src/hooks/useMotion';
import { usePreferences } from '@/src/hooks/usePreferences';

export function TechnologyField({ selected, onSelect }: { selected: string | null; onSelect: (technology: Technology) => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const { reduced } = useMotion();
  const { t } = usePreferences();
  const animations = useRef(new Map<string, gsap.core.Timeline>());
  const parallax = useRef(new Map<string, { x: gsap.QuickToFunc; y: gsap.QuickToFunc }>());
  const held = useRef(new Set<string>());
  const inView = useRef(false);

  useEffect(() => {
    const field = root.current!;
    const loops = animations.current;
    const offsets = parallax.current;
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)');
    let context: gsap.Context | undefined;
    let resizeFrame = 0;
    const sync = () => {
      loops.forEach((animation,id) => animation.paused(paused || reduced || !inView.current || document.hidden || held.current.has(id)));
    };
    const rest = () => offsets.forEach((offset,id) => { if (!held.current.has(id)) { offset.x(0); offset.y(0); } });
    const arrange = () => {
      context?.revert(); loops.clear(); offsets.clear();
      context = gsap.context(() => {
        const width = field.clientWidth, height = field.clientHeight;
        technologies.forEach((technology,index) => {
          const token = field.querySelector<HTMLElement>(`[data-tech="${technology.id}"]`)!;
          const drift = token.querySelector<HTMLElement>('.tech-drift')!;
          const compact = width < 500;
          const compactColumns = 3;
          const compactRows = Math.ceil(technologies.length / compactColumns);
          const x = compact ? (index % compactColumns) / (compactColumns - 1) : technology.x;
          const y = compact ? Math.floor(index / compactColumns) / (compactRows - 1) : technology.y;
          const path = getFloatPath({ width, height, size: token.offsetWidth, x, y, index, amplitudeScale: compact ? .35 : .55 });
          gsap.set(token, { left: path.base.x, top: path.base.y });
          if (reduced) return;
          const layer = token.querySelector<HTMLElement>('.tech-parallax')!;
          offsets.set(technology.id, {
            x: gsap.quickTo(layer, 'x', { duration: .8, ease: 'power3.out' }),
            y: gsap.quickTo(layer, 'y', { duration: .8, ease: 'power3.out' }),
          });
          const timeline = gsap.timeline({ repeat: -1, paused: true });
          gsap.set(drift, { ...path.points[0], rotation: technology.rotate - 5 });
          path.points.slice(1).forEach((point,i) => timeline.to(drift, { ...point, rotation: technology.rotate + (i % 2 ? -5 : 7), duration: 2.3 + (index % 3) * .3, ease: 'sine.inOut' }));
          timeline.progress((index * .117) % 1);
          loops.set(technology.id, timeline);
        });
      }, field);
      sync();
    };
    arrange();
    const visibility = new IntersectionObserver(entries => { inView.current = entries[0].isIntersecting; sync(); }, { rootMargin: '70px' });
    visibility.observe(field);
    const size = new ResizeObserver(() => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(arrange); });
    size.observe(field);
    const move = (event: PointerEvent) => {
      if (paused || reduced || !fine.matches || event.pointerType === 'touch' || !inView.current) return;
      const rect = field.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(1, rect.width) * 2 - 1;
      const y = (event.clientY - rect.top) / Math.max(1, rect.height) * 2 - 1;
      technologies.forEach((technology,index) => {
        const offset = offsets.get(technology.id);
        if (!offset || held.current.has(technology.id)) return;
        const position = technologyParallax(x,y,index);
        offset.x(position.x); offset.y(position.y);
      });
    };
    field.addEventListener('pointermove', move, { passive: true });
    field.addEventListener('pointerleave', rest);
    document.addEventListener('visibilitychange', sync);
    return () => { visibility.disconnect(); size.disconnect(); cancelAnimationFrame(resizeFrame); field.removeEventListener('pointermove',move); field.removeEventListener('pointerleave',rest); context?.revert(); loops.clear(); offsets.clear(); document.removeEventListener('visibilitychange', sync); };
  }, [paused, reduced]);

  const hold = (id: string) => {
    held.current.add(id); animations.current.get(id)?.pause();
    const offset = parallax.current.get(id);
    offset?.x.tween.pause(); offset?.y.tween.pause();
  };
  const release = (id: string, element: HTMLElement, ignoreHover = false) => {
    if (element.matches(':focus-within') || (!ignoreHover && element.matches(':hover'))) return;
    held.current.delete(id);
    if (!paused && !reduced && inView.current && !document.hidden) animations.current.get(id)?.play();
  };

  return <div className="technology-playground">
    <div className="technology-toolbar"><p>{t.expertise.interactionHint}</p>{!reduced && <Button variant="ghost" size="icon" type="button" className="technology-motion" aria-label={paused?t.expertise.play:t.expertise.pause} title={paused?t.expertise.play:t.expertise.pause} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?<Play size={16}/>:<Pause size={16}/>}</Button>}</div>
    <div className="technology-field" ref={root} aria-label={t.expertise.tools}>
      <span className="technology-field-guide" aria-hidden="true">+</span>
      {technologies.map(technology=><div className="tech-token" data-tech={technology.id} key={technology.id} style={{ '--anchor-x':technology.x, '--anchor-y':technology.y } as CSSProperties}>
        <div className="tech-drift"><div className="tech-parallax"><Button type="button" variant="ghost" className="tech-icon-button" aria-label={`${technology.name} — ${t.expertise.items[technology.area].title}`} aria-pressed={selected===technology.id}
          onPointerEnter={event=>{ if (event.pointerType!=='touch') hold(technology.id); }} onPointerLeave={event=>release(technology.id,event.currentTarget)}
          onPointerDown={()=>hold(technology.id)} onPointerUp={event=>{if(event.pointerType==='touch')release(technology.id,event.currentTarget,true);}} onPointerCancel={event=>release(technology.id,event.currentTarget,true)}
          onFocus={()=>hold(technology.id)} onBlur={event=>release(technology.id,event.currentTarget)}
          onClick={()=>onSelect(technology)}>
          {technology.icon ? <Image src={technology.icon} alt="" width={48} height={48} loading="lazy" draggable={false}/> : <Sheet className="excel-icon" size={44} strokeWidth={1.7} aria-hidden="true"/>}
          <span className="tech-name">{technology.name}</span>
        </Button></div></div>
      </div>)}
    </div>
    <output className="technology-selection" aria-live="polite">{selected ? `${technologies.find(item=>item.id===selected)!.name} ↗ ${t.expertise.items[technologies.find(item=>item.id===selected)!.area].title}` : t.expertise.selectionHint}</output>
  </div>;
}
