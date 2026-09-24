'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { projects, projectTotal, type Project } from '@/src/data/projects';
import { useScrollLock } from '@/src/hooks/useMotion';
import { usePageAnimations } from '@/src/hooks/usePageAnimations';
import { Arrow, TransitionLink } from './Shared';
import { ProjectPreview } from './ProjectPreview';
import { CustomCursor } from './CustomCursor';
import { PreferenceControls } from './PreferenceControls';
import { usePreferences } from '@/src/hooks/usePreferences';

export function CaseStudy({ project: source }: { project: Project }) {
  const { t } = usePreferences();
  const project = { ...source, ...t.projects[source.id] };
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLElement>(null);
  const opening = useRef<HTMLDivElement>(null);
  const nextSource = projects[(projects.findIndex(item => item.id === project.id) + 1) % projects.length];
  const next = { ...nextSource, ...t.projects[nextSource.id] };
  useEffect(() => { document.title = `${project.title} — Gabriel Nogueira`; document.querySelector('meta[name="description"]')?.setAttribute('content', project.description); }, [project.title, project.description]);
  useScrollLock('case-opening', !ready);
  usePageAnimations(root, ready);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const frame = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(frame); }
    const context = gsap.context(() => {
      gsap.timeline({ onComplete: () => setReady(true) })
        .from('.case-opening > span', { y: 35, autoAlpha: 0, duration: .7, stagger: .12, ease: 'power3.out' })
        .to(opening.current, { yPercent: -100, duration: .9, ease: 'power3.inOut' }, '+=.4');
    }, opening);
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const skip = () => { if (query.matches) setReady(true); };
    query.addEventListener('change', skip);
    return () => { context.revert(); query.removeEventListener('change', skip); };
  }, []);

  return <>
    {!ready && <div className="case-opening" ref={opening} aria-hidden="true"><span className="micro">{t.work.selected}</span><span>{project.shortTitle}</span></div>}
    <main className="case-page" ref={root} inert={!ready}>
      <header className="case-nav"><TransitionLink href="/" className="wordmark" aria-label={t.home}><span className="wordmark-symbol" aria-hidden="true">✳</span><span>GABRIEL<br/>NOGUEIRA</span></TransitionLink><PreferenceControls/><TransitionLink href="/#work" className="micro text-link">{t.work.all} <span aria-hidden="true">↗</span></TransitionLink></header>
      <section className="case-hero"><div className="micro"><span>{project.category}</span><span>{String(projects.findIndex(item => item.id === project.id) + 1).padStart(2, '0')} / {projectTotal}</span></div><h1 className="case-title" data-reveal>{project.shortTitle}</h1><div className="case-description"><p data-reveal>{project.description}</p><ul className="case-focus" data-reveal>{project.focus.map(item=><li key={item}>{item}</li>)}</ul></div></section>
      <figure className="case-visual" style={{margin:0}} data-reveal>{project.image ? <Image src={project.image} alt={`${t.work.interface} ${project.title}`} width={1440} height={900} style={{width:'100%',height:'auto'}}/> : <ProjectPreview id={project.id}/>}<figcaption className="case-preview-caption micro"><span>{project.image ? t.work.overview : t.work.concept}</span><span>GABRIEL NOGUEIRA — {t.work.label}</span></figcaption></figure>
      <section className="case-story"><div data-reveal><span className="micro">{t.case.intention}</span><h2>{t.case.heading[0]}<br/>{t.case.heading[1]}</h2></div><div data-reveal><p>{project.intention}</p>{!project.image && <p className="case-note">{t.case.note}</p>}{project.technologies.length > 0 && <p className="micro">{project.technologies.join(' / ')}</p>}{project.url && <a className="text-link micro" href={project.url} target="_blank" rel="noopener noreferrer">{t.case.visit} ↗</a>}{project.github && <a className="text-link micro" href={project.github} target="_blank" rel="noopener noreferrer">{t.case.code} ↗</a>}</div></section>
      <TransitionLink href={`/work/${next.id}`} transitionLabel={next.title} className="case-next" aria-label={`${t.work.discover} ${next.title}`}><div><span className="micro">{t.case.next}</span><h2>{next.title}</h2></div><span className="circle-arrow"><Arrow diagonal/></span></TransitionLink>
    </main>
    {ready && <CustomCursor/>}
  </>;
}
