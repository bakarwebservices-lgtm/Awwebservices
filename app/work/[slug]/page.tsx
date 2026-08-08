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

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/work">Work</Link>
            <span>/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <span className="eyebrow">{project.category}</span>
            {project.tag && <span className="portfolio-card__badge">{project.tag}</span>}
          </div>

          <h1 className="page-hero__title">{project.title}</h1>
          <p className="page-hero__subtitle">{project.metaDescription}</p>
        </div>
      </section>

      <section className="project-detail-section">
        <div className="container">
          <div className="project-hero-image mb-12">
            <img src={project.heroImage} alt={`${project.title} Case Study Main Hero Image`} className="rounded-lg shadow-lg w-full max-h-[500px] object-cover" />
          </div>

          <div className="project-meta-grid mb-12">
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
              <div className="tech-pills-list mt-1">
                {project.builtWith.map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="project-body-grid">
            <div className="project-main-content">
              <div className="content-box">
                <h2>The Problem</h2>
                <p>{project.body.problem}</p>
              </div>

              <div className="content-box mt-8">
                <h2>Our Solution &amp; Engineering</h2>
                <div className="solution-steps mt-4">
                  {project.body.solution.map((sol, index) => (
                    <div key={index} className="solution-step-item mb-6">
                      <h3>{sol.heading}</h3>
                      <p>{sol.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {project.body.result && (
                <div className="content-box mt-8">
                  <h2>Result &amp; Impact</h2>
                  <p>{project.body.result}</p>

                  {(project.body.before || project.body.after) && (
                    <div className="before-after-grid mt-6">
                      {project.body.before && (
                        <div className="metric-card metric-card--before">
                          <span className="metric-label">Before</span>
                          <span className="metric-value">{project.body.before}</span>
                        </div>
                      )}
                      {project.body.after && (
                        <div className="metric-card metric-card--after">
                          <span className="metric-label">After</span>
                          <span className="metric-value">{project.body.after}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* SCREENSHOT GALLERY */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="content-box mt-12">
                  <h2>Project Screenshots &amp; Interfaces</h2>
                  <div className="screenshots-gallery-grid mt-6">
                    {project.screenshots.map((src, i) => (
                      <div key={i} className="screenshot-item mb-6">
                        <img src={src} alt={`${project.title} Interface Screenshot ${i + 1}`} className="rounded-lg shadow border" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="cta-card mt-16">
            <h2>Want a similar system built for your business?</h2>
            <p>We build production-grade web systems tailored to your specific requirements.</p>
            <Link href="/contact" className="btn btn--primary btn--lg">
              <span>Start Your Project</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
