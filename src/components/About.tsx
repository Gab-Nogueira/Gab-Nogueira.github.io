'use client';
import Image from 'next/image';
import { profile } from '@/src/data/profile';
import { usePreferences } from '@/src/hooks/usePreferences';
import { ElasticLine } from './ElasticLine';

export function About() {
  const { t } = usePreferences();
  return <section id="about" className="about dark section-pad">
    <div className="about-section-intro"><span className="micro" data-reveal>02 — {t.about.label}</span><h2 className="section-heading"><span className="line-mask"><span data-line>{t.about.title}</span></span></h2><ElasticLine/></div>
    <div className="about-layout">
      <div className="identity-wrap" data-reveal>
        <div className="identity-frame">
          <div className="identity-hover-surface">{profile.portrait ? <Image className="portrait-image" src={profile.portrait} alt="Gabriel Nogueira" width={680} height={820} loading="lazy"/> : <div className="identity-type" aria-label={t.about.monogram}><span className="identity-cross" aria-hidden="true">+</span><span className="identity-monogram" aria-hidden="true">GN<span>®</span></span><div className="identity-baseline"/><span className="identity-caption micro">GABRIEL NOGUEIRA<br/>{t.about.caption}</span><span className="identity-coordinates micro" aria-hidden="true">23° S<br/>45° W</span></div>}</div>
          <div className="identity-hover-bar"><span className="micro">GABRIEL<br/>NOGUEIRA</span><div className="identity-socials">
            {profile.github && <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub — Gabriel Nogueira"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg></a>}
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn — Gabriel Nogueira"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="5" r="2"/><path d="M3 9h4v12H3zM10 9h4v1.7c.8-1.3 2-2 3.5-2 3 0 3.5 2 3.5 5.3v7h-4v-6.2c0-1.6-.2-2.7-1.5-2.7S14 13.3 14 14.8V21h-4z"/></svg></a>}
          </div></div>
        </div>
        <div className="identity-footer micro"><span>{t.about.curious}</span><span>{t.about.precise}</span></div>
      </div>
      <div className="about-copy">
        <span className="micro about-who" data-reveal>{t.about.who}</span>
        <h3 className="about-statement" data-reveal>{t.about.heading.map((part,index) => index % 2 ? <em key={index}>{part}</em> : <span key={index}>{part}</span>)}</h3>
        <div className="about-description" data-reveal><span className="micro">{t.about.hello}</span>{t.about.paragraphs.map((text,index)=><p key={index}>{text}</p>)}</div>
        <dl className="about-facts"><div data-reveal><dt className="micro">{t.about.based}</dt><dd>São José dos Campos, SP<br/>{t.about.country}</dd></div><div data-reveal><dt className="micro">{t.about.focus}</dt><dd>{t.about.focusText}</dd></div><div data-reveal><dt className="micro">{t.about.background}</dt><dd>{t.about.education[0]}<br/>{t.about.education[1]}</dd></div></dl>
      </div>
    </div>
  </section>;
}
