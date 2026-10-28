import type { Metadata } from 'next';
import { Portfolio } from '@/src/components/Portfolio';
import { profile } from '@/src/data/profile';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
  const person = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: profile.website, sameAs: [profile.github, profile.linkedin] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}/><Portfolio/></>;
}
