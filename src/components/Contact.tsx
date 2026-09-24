'use client';
import { useRef, useState, type SubmitEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { profile } from '@/src/data/profile';
import { createContactDraft, ContactError, contactErrors, type ContactErrorCode } from '@/src/lib/contact';
import { usePreferences } from '@/src/hooks/usePreferences';
import { Arrow, ScrollLink, SectionLabel } from './Shared';
import { PreferenceControls } from './PreferenceControls';

export function Contact() {
  const { t, locale } = usePreferences();
  const [draft, setDraft] = useState<ReturnType<typeof createContactDraft> | null>(null);
  const [status, setStatus] = useState<'prepared' | 'copied' | 'manual'>('prepared');
  const [manualCopy, setManualCopy] = useState(false);
  const [error, setError] = useState<ContactErrorCode | 'unknown' | null>(null);
  const fallback = useRef<HTMLTextAreaElement>(null);

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const field = (name: string) => { const value = values.get(name); return typeof value === 'string' ? value : ''; };
    try {
      const result = createContactDraft({ name: field('name'), email: field('email'), subject: field('subject'), message: field('message') }, profile.email, locale);
      setError(null); setDraft(result); setManualCopy(false); setStatus('prepared');
      window.location.href = result.mailto;
    } catch (err) { setError(err instanceof ContactError ? err.code : 'unknown'); }
  };
  const copy = async () => {
    if (!draft) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(draft.copy);
      setStatus('copied');
    } catch {
      setManualCopy(true); setStatus('manual');
      requestAnimationFrame(() => { fallback.current?.focus(); fallback.current?.select(); });
    }
  };

  return <section className="contact dark section-pad" id="contact">
    <SectionLabel number="04">{t.contact.label}</SectionLabel>
    <div className="contact-layout"><div className="contact-copy">
      <h2 className="section-heading">{t.contact.heading.map((line,index)=><span className="line-mask" key={index}><span data-line className={index===1?'gold':undefined}>{line}</span></span>)}</h2>
      <p className="contact-invitation" data-reveal>{t.contact.invitation}</p>
      <dl className="contact-details"><div data-reveal><dt className="micro">{t.contact.hello}</dt><dd><a href={`mailto:${profile.email}`} className="text-link">{profile.email} <span aria-hidden="true">↗</span></a></dd></div><div data-reveal><dt className="micro">{t.contact.based}</dt><dd>{t.hero.location}</dd></div>{(profile.github || profile.linkedin) && <div data-reveal><dt className="micro">{t.contact.elsewhere}</dt><dd className="social-links">{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn ↗</a>}{profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub ↗</a>}</dd></div>}</dl>
    </div>
      <form className="contact-form" onSubmit={submit} aria-label={t.contact.formLabel}>
        <div className="form-heading micro" data-reveal><span>{t.contact.formHeading}</span><span aria-hidden="true">↘</span></div>
        <div className="form-row"><label data-reveal htmlFor="contact-name"><span className="micro">01 — {t.contact.fields[0]}</span><Input id="contact-name" className="contact-input" name="name" autoComplete="name" placeholder={t.contact.placeholders[0]} maxLength={100} required/></label><label data-reveal htmlFor="contact-email"><span className="micro">02 — {t.contact.fields[1]}</span><Input id="contact-email" className="contact-input" name="email" type="email" autoComplete="email" placeholder={t.contact.placeholders[1]} maxLength={254} required/></label></div>
        <label data-reveal htmlFor="contact-subject"><span className="micro">03 — {t.contact.fields[2]}</span><Input id="contact-subject" className="contact-input" name="subject" placeholder={t.contact.placeholders[2]} maxLength={180} required/></label>
        <label data-reveal htmlFor="contact-message"><span className="micro">04 — {t.contact.fields[3]}</span><Textarea id="contact-message" className="contact-input contact-textarea" name="message" placeholder={t.contact.placeholders[3]} minLength={10} maxLength={5000} rows={5} required/></label>
        {error && <p className="form-error" role="alert">{error==='unknown'?t.contact.error:contactErrors[locale][error]}</p>}
        <Button className="contact-submit micro" type="submit" data-reveal><span>{t.contact.submit}</span><Arrow diagonal/></Button>
        <p className="form-note">{t.contact.note}</p>
        {draft && <div className="contact-feedback"><output aria-live="polite">{t.contact[status]}{status==='copied' && ` ${profile.email}.`}</output><Button type="button" className="copy-button micro" variant="outline" onClick={copy}>{t.contact.copy} ↗</Button>{manualCopy && <Textarea ref={fallback} className="contact-input" readOnly value={draft.copy} aria-label={t.contact.copyLabel} rows={8}/>}</div>}
      </form></div>
    <footer className="site-footer"><div className="footer-signoff" aria-hidden="true">{t.contact.signoff}<span>↗</span></div><div className="footer-preferences"><span className="micro">{t.preferences.label}</span><PreferenceControls/></div><div className="footer-bottom micro"><span>© 2026 GABRIEL NOGUEIRA</span><span>{t.contact.footer}</span><ScrollLink href="#home" className="text-link">{t.contact.top} ↑</ScrollLink></div></footer>
  </section>;
}
