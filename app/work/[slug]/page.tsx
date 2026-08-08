import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import JsonLd from '@/components/JsonLd';
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

  const url = `https://awweb.online/work/${project.slug}`;

  return {
    title: `${project.title} | Case Study | AW Web Services`,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://awweb.online/work' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://awweb.online/work/${project.slug}` },
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
      url: 'https://awweb.online',
    },
    image: `https://awweb.online${project.heroImage}`,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={creativeWorkSchema} />

      {/* HERO BANNER WITH BLUE GLOW HIGHLIGHT */}
      <section className="page-hero hero-blue-banner">
        <div className="container">
          <nav className="breadcrumbs mb-4" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/work">Work</Link>
            <span>/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <span className="hero-highlight-tag">
              <span className="hero-highlight-dot"></span>
              <span>{project.category}</span>
            </span>
            {project.tag && <span className="portfolio-card__badge">{project.tag}</span>}
          </div>

          <h1 className="page-hero__title text-4xl sm:text-5xl font-extrabold">{project.title}</h1>
          <p className="page-hero__subtitle text-xl mt-3 max-w-3xl leading-relaxed">{project.metaDescription}</p>
        </div>
      </section>

      {/* PROJECT DETAIL SECTION */}
      <section className="project-detail-section py-16">
        <div className="container">
          <div className="project-hero-image mb-16">
            <img src={project.heroImage} alt={`${project.title} Case Study Showcase`} className="rounded-2xl shadow-2xl w-full max-h-[560px] object-cover border border-border" />
          </div>

          {/* META GRID WITH SPACIOUS PADDING */}
          <div className="project-meta-grid mb-16">
            {project.client && (
              <div className="meta-box">
                <span className="meta-label">Client</span>
                <span className="meta-value">{project.client}</span>
              </div>
            )}
            <div className="meta-box">
              <span className="meta-label">Status</span>
              <span className="meta-value">{project.status}</span>
            </div>
            {project.location && (
              <div className="meta-box">
                <span className="meta-label">Region</span>
                <span className="meta-value">{project.location}</span>
              </div>
            )}
            <div className="meta-box">
              <span className="meta-label">Technologies</span>
              <div className="tech-pills-list mt-2 flex flex-wrap gap-2">
                {project.builtWith.map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* PROJECT BODY CONTENT WITH SPACIOUS GAP */}
          <div className="project-body-grid">
            <div className="project-main-content flex flex-col gap-12">
              <div className="content-box content-box--spacious">
                <h2 className="text-2xl font-bold mb-4">The Challenge &amp; Context</h2>
                <p className="text-base leading-relaxed text-muted">{project.body.problem}</p>
              </div>

              <div className="content-box content-box--spacious">
                <h2 className="text-2xl font-bold mb-6">Solution &amp; Technical Execution</h2>
                <div className="solution-steps flex flex-col gap-8">
                  {project.body.solution.map((sol, index) => (
                    <div key={index} className="solution-step-item p-6 rounded-xl bg-surface-3 border border-border">
                      <h3 className="text-lg font-bold text-accent-1 mb-2">{sol.heading}</h3>
                      <p className="text-base leading-relaxed text-muted">{sol.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {project.body.result && (
                <div className="content-box content-box--spacious">
                  <h2 className="text-2xl font-bold mb-4">Results &amp; Impact</h2>
                  <p className="text-base leading-relaxed mb-6">{project.body.result}</p>

                  {(project.body.before || project.body.after) && (
                    <div className="before-after-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      {project.body.before && (
                        <div className="metric-card metric-card--before p-6">
                          <span className="metric-label">Before</span>
                          <span className="metric-value text-xl">{project.body.before}</span>
                        </div>
                      )}
                      {project.body.after && (
                        <div className="metric-card metric-card--after p-6">
                          <span className="metric-label">After</span>
                          <span className="metric-value text-xl">{project.body.after}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* SCREENSHOT GALLERY */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="content-box content-box--spacious">
                  <h2 className="text-2xl font-bold mb-6">Interface Gallery &amp; Screenshots</h2>
                  <div className="screenshots-gallery-grid grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.screenshots.map((src, i) => (
                      <div key={i} className="screenshot-item">
                        <img src={src} alt={`${project.title} Interface Screenshot ${i + 1}`} className="rounded-xl shadow-lg border border-border w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="cta-card mt-24">
            <h2 className="text-3xl font-extrabold">Want a Similar System Built for Your Business?</h2>
            <p className="text-muted text-base mt-2">Let's discuss your project goals, timelines, and technical requirements.</p>
            <div className="mt-6">
              <Link href="/contact" className="btn btn--primary btn--lg">
                <span>Start Your Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
