import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/src/data/projects';
import { CaseStudy } from '@/src/components/CaseStudy';
import { translations } from '@/src/data/translations';

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.id === slug);
  const copy = project ? translations.pt.projects[project.id] : undefined;
  return { title: copy ? `${copy.title} — Gabriel Nogueira` : 'Projeto não encontrado — Gabriel Nogueira', description: copy?.description };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.id === slug);
  if (!project) notFound();
  return <CaseStudy project={project}/>;
}
