'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { projects, projectTotal, type Project } from '@/src/data/projects';
import { usePreferences } from '@/src/hooks/usePreferences';
import { CircularSeal, TransitionLink } from './Shared';
import { ProjectPreview } from './ProjectPreview';
import { workCutouts, workDroplets } from '@/src/lib/workDroplets';
import { useWorkDroplets } from '@/src/hooks/useWorkDroplets';

export function WorkIntro() {
  const { t } = usePreferences();
  const art = useRef<SVGSVGElement>(null);
  useWorkDroplets(art);
  return <section className="work-intro dark" id="work" aria-labelledby="work-heading">
    <div className="work-overline micro"><span>{t.work.explore}</span><span className="scroll-stem" aria-hidden="true"/></div>
    <div className="work-mask"><h2 id="work-heading" className="work-title" aria-label={t.work.label}>
      <svg className="work-art" ref={art} viewBox="0 0 1000 320" aria-hidden="true">
        <defs><filter id="work-ink" x="-5%" y="-10%" width="110%" height="150%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.7" result="blur"/><feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -8" result="ink"/><feComposite in="SourceGraphic" in2="ink" operator="atop"/></filter>
          <mask id="work-edge" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="320"><rect width="1000" height="320" fill="white"/>{workCutouts.map(([cx,cy,r],index)=><circle className="work-cutout" key={index} cx={cx} cy={cy} r={r} fill="black"/>)}</mask>
        </defs>
        <g filter="url(#work-ink)"><text mask="url(#work-edge)" x="500" y="242" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs">{t.work.word}</text><g className="work-droplets">{workDroplets.map(([cx,cy,r],index)=><g className="work-droplet" key={index}><circle cx={cx} cy={cy} r={r}/></g>)}</g></g>
      </svg>
    </h2></div>
    <div className="work-bottom micro"><span>{t.work.tagline}</span><span>{projectTotal} {t.work.total} / {t.work.edition}</span></div>
    <div className="discipline-marquee" aria-hidden="true"><div className="discipline-track">{[0,1].map(copy=><div className="discipline-strip" key={copy}>{t.work.disciplines.map((item,index)=><span key={index}>{item}<i>✦</i></span>)}</div>)}</div></div>
  </section>;
}

export function Projects() {
  const { t } = usePreferences();
  return <section className="projects dark" aria-label={t.work.label}>
    <div className="projects-heading micro" data-reveal>{t.work.label} <span>({projectTotal})</span></div>
    {projects.map((project,index) => <ProjectCard key={project.id} project={project} index={index}/>)}
    <div className="projects-end micro"><span>{t.work.end}</span><span>{t.work.nextIdea}</span></div>
  </section>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = usePreferences();
  const copy = t.projects[project.id];
  return <article className={`project-card project-${project.id}`}>
    <TransitionLink href={`/work/${project.id}`} aria-label={`${t.work.discover} ${copy.title}`} transitionLabel={copy.title} className="project-link" data-cursor={t.work.view}>
      <div className="project-image-mask"><div className="project-image">{project.image ? <Image src={project.image} alt={`${t.work.interface} ${copy.title}`} width={1440} height={900} loading="lazy" decoding="async"/> : <ProjectPreview id={project.id}/>}</div></div>
      <div className="project-heading"><span className="micro project-category">— {copy.category} · 0{index+1}</span><h3>{copy.title}</h3><p>{copy.description}</p></div>
      <div className="project-overlay-footer"><div className="project-focus micro">{copy.focus.map((focus,i)=><span key={i}>{focus}</span>)}</div><CircularSeal text={`${t.work.exploreProject} · ${t.work.exploreProject} · `}/></div>
    </TransitionLink>
    <div className="project-caption micro"><span>{project.image ? t.work.overview : t.work.concept}</span><span>{String(index + 1).padStart(2, '0')} / {projectTotal}</span></div>
  </article>;
}
