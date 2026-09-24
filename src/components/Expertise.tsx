'use client';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/src/hooks/useMotion';
import { SectionLabel } from './Shared';
import { ProjectPreview } from './ProjectPreview';
import { projects, type ProjectId } from '@/src/data/projects';
import { usePreferences } from '@/src/hooks/usePreferences';
import { TechnologyField } from './TechnologyField';

const expertiseProjects: ProjectId[] = projects.map(project => project.id);

export function Expertise() {
  const { t } = usePreferences();
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(()=>ScrollTrigger.refresh());
    return ()=>cancelAnimationFrame(frame);
  }, [expanded]);

  return <section id="expertise" className="expertise dark section-pad">
    <SectionLabel number="03">{t.expertise.label}</SectionLabel>
    <div className="expertise-layout"><div className="expertise-intro"><h2 className="section-heading expertise-heading">{t.expertise.heading.map((line,index)=><span className="line-mask" key={index}><span data-line>{line}{index===1 && <span className="gold">.</span>}</span></span>)}</h2><p className="section-description" data-reveal>{t.expertise.description}</p><TechnologyField selected={selected} onSelect={technology=>{setSelected(technology.id);setExpanded(technology.area);}}/></div>
      <div className="expertise-list">{t.expertise.items.map((item,index)=><ExpertiseItem key={index} item={{...item, project:expertiseProjects[index]}} index={index} open={expanded===index} onToggle={value=>setExpanded(current=>value?index:current===index?null:current)}/>)}</div>
    </div>
  </section>;
}

function ExpertiseItem({ item, index, open, onToggle }: { item: { title: string; description: string; detail: string; project: ProjectId }; index: number; open: boolean; onToggle: (open: boolean)=>void }) {
  const thumb = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();
  return <details className="expertise-item" data-reveal open={open} onToggle={event=>onToggle(event.currentTarget.open)} onPointerMove={event=>{
    if (reduced || event.pointerType === 'touch' || !thumb.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    thumb.current.style.setProperty('--thumb-x', `${(event.clientX - rect.left - rect.width / 2) * .05}px`);
    thumb.current.style.setProperty('--thumb-y', `${(event.clientY - rect.top - rect.height / 2) * .15}px`);
  }}><summary><span className="expertise-number micro">0{index+1}</span><span className="expertise-title">{item.title}<small>{item.description}</small></span><span className="expertise-plus" aria-hidden="true">+</span><div className="expertise-thumbnail" ref={thumb}><ProjectPreview id={item.project}/></div></summary><div className="expertise-expanded"><p className="expertise-detail">{item.detail}</p><div className="expertise-touch-preview"><ProjectPreview id={item.project}/></div></div></details>;
}
