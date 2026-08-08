import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies — Custom Web Projects | AW Web Services',
  description: 'View our portfolio of custom e-commerce platforms, real-time P&L profit engines, AI edtech platforms, and local business website designs.',
  alternates: {
    canonical: 'https://awweb.online/work',
  },
  openGraph: {
    title: 'Portfolio & Case Studies — Custom Web Projects | AW Web Services',
    description: 'View our portfolio of custom e-commerce platforms, real-time P&L profit engines, AI edtech platforms, and local business website designs.',
    url: 'https://awweb.online/work',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Case Studies — AW Web Services',
    description: 'Explore custom client projects and concept builds by AW Web Services.',
    images: ['/images/hero.webp'],
  },
};

export default function WorkIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://awweb.online/work' },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Work</span>
          </nav>

          <h1 className="page-hero__title">Our Work &amp; Featured Case Studies</h1>
          <p className="page-hero__subtitle">
            Explore live systems and concept builds engineered for performance, automation, and full infrastructure ownership.
          </p>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="container">
          <div className="portfolio-grid">
            {projects.map((project) => (
              <div key={project.slug} className="portfolio-card">
                <div className="portfolio-card__image">
                  <img src={project.heroImage} alt={`${project.title} Screenshot`} />
                  {project.tag && <span className="portfolio-card__badge">{project.tag}</span>}
                </div>
                <div className="portfolio-card__content">
                  <span className="portfolio-card__category">{project.category}</span>
                  <h2 className="portfolio-card__title text-xl font-bold">{project.title}</h2>
                  <p className="portfolio-card__desc">{project.metaDescription}</p>
                  <div className="portfolio-card__tags mt-3">
                    {project.builtWith.map((tech) => (
                      <span key={tech} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                  <Link href={`/work/${project.slug}`} className="btn btn--secondary btn--sm mt-4">
                    View Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-card mt-24">
            <h2>Have a project in mind?</h2>
            <p className="mt-2 text-muted">Let's build a custom solution tailored to your business.</p>
            <div className="mt-6">
              <Link href="/contact" className="btn btn--primary btn--lg">
                <span>Start a Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
