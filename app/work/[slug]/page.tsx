import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import PageHead from '@/components/PageHead';
import EndCta from '@/components/EndCta';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: 'Project Not Found | AW Web Services',
    };
  }

  const url = `https://www.awweb.online/work/${project.slug}`;

  return {
    title: `${project.title.split(' - ')[0]} case study`,
    description: project.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | Case Study | AW Web Services`,
      description: project.metaDescription,
      url: url,
      type: 'article',
      images: [{ url: project.heroImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Case Study | AW Web Services`,
      description: project.metaDescription,
      images: [project.heroImage],
    },
  };
}

export default function DynamicProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://www.awweb.online/work' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://www.awweb.online/work/${project.slug}` },
    ],
  };

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'AW Web Services',
      url: 'https://www.awweb.online',
    },
    image: `https://www.awweb.online${project.heroImage}`,
  };

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const [name, tagline] = project.title.split(' - ');
  const isConcept = !!project.tag;
  const facts: { k: string; v: string }[] = [
    ...(project.client ? [{ k: 'Client', v: project.client }] : [{ k: 'Type', v: 'Concept build, no client' }]),
    { k: 'Status', v: project.status },
    ...(project.location ? [{ k: 'Market', v: project.location }] : []),
    { k: 'Category', v: project.category },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={creativeWorkSchema} />

      <PageHead
        crumbs={[{ name: 'Work', href: '/work' }, { name }]}
        label={isConcept ? 'Concept · not a client project' : 'Case study'}
        title={name}
        lead={tagline ? `${tagline}. ${project.metaDescription}` : project.metaDescription}
      >
        {project.liveUrl && (
          <div style={{ marginTop: 32 }}>
            <a className="btn btn--line" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {isConcept ? 'Open the concept' : 'Visit the live site'}
            </a>
          </div>
        )}
      </PageHead>

      <section className="cs-hero">
        <div className="wrap">
          <div className="frame" style={{ marginTop: 0 }}>
            <div className="frame__bar"><i /><i /><i /><span>{project.liveUrl?.replace(/^https?:\/\/(www\.)?/, '') ?? name}</span></div>
            <img src={project.screenshots[0] || project.heroImage} alt={`${name} screenshot`} />
          </div>
          <dl className="cs-facts">
            {facts.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap">
          <div className="cs-block">
            <h2 className="label">The problem</h2>
            <p>{project.body.problem}</p>
          </div>
          <div className="cs-block">
            <h2 className="label">What we built</h2>
            <ol className="cs-steps">
              {project.body.solution.map((s) => (
                <li key={s.heading}><h3>{s.heading}</h3><p>{s.text}</p></li>
              ))}
            </ol>
          </div>
          <div className="cs-block">
            <h2 className="label">The result</h2>
            <div>
              <p>{project.body.result}</p>
              {(project.body.before || project.body.after) && (
                <div className="ba">
                  {project.body.before && <div><span>Before</span><b>{project.body.before}</b></div>}
                  {project.body.after && <div><span>After</span><b>{project.body.after}</b></div>}
                </div>
              )}
            </div>
          </div>
          {project.screenshots.length > 1 && (
            <div className="cs-block">
              <h2 className="label">Screens</h2>
              <div className="shots">
                {project.screenshots.slice(1).map((src, i) => (
                  <div className="frame" key={src}>
                    <img src={src} alt={`${name} screen ${i + 2}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link className="next-case" href={`/work/${next.slug}`}>
            <span className="label">Next</span>
            <span className="h1" style={{ display: 'block', marginTop: 18 }}>{next.title.split(' - ')[0]} →</span>
          </Link>
        </div>
      </section>
      <EndCta />
    </>
  );
}
