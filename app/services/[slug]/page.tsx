import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import { services } from '@/data/services';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: 'Service Not Found | AW Web Services',
    };
  }

  const url = `https://awweb.online/services/${service.slug}`;

  return {
    title: `${service.title} | AW Web Services`,
    description: service.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} | AW Web Services`,
      description: service.metaDescription,
      url: url,
      type: 'website',
      images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | AW Web Services`,
      description: service.metaDescription,
      images: ['/images/hero.webp'],
    },
  };
}

export default function DynamicServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://awweb.online/services' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://awweb.online/services/${service.slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'AW Web Services',
      url: 'https://awweb.online',
    },
    areaServed: 'Worldwide',
    termsOfService: 'https://awweb.online/terms-of-service',
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span aria-current="page">{service.title}</span>
          </nav>

          <h1 className="page-hero__title">{service.title}</h1>
          <p className="page-hero__subtitle">{service.heading}</p>
        </div>
      </section>

      <section className="service-detail-section">
        <div className="container">
          <div className="service-detail-grid">
            <div className="service-main">
              <div className="content-box">
                <h2>Overview</h2>
                <p className="lead-text">{service.intro}</p>
              </div>

              <div className="content-box mt-8">
                <h2>What We Handle</h2>
                <ul className="custom-bullets">
                  {service.whatWeHandle.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="content-box mt-8">
                <h2>Why It Matters</h2>
                <p>{service.whyItMatters}</p>
              </div>

              <div className="content-box mt-8">
                <h2>Target Keywords &amp; Technical Scope</h2>
                <p>Primary focus keyword: <strong>{service.primaryKeyword}</strong></p>
                <div className="tech-pills-list mt-3">
                  {service.longTailKeywords.map((kw, i) => (
                    <span key={i} className="tech-pill">{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="service-sidebar">
              <div className="sidebar-card">
                <h3>Ready to discuss {service.title}?</h3>
                <p>Let's map out your requirements and build a solution tailored for your business.</p>
                <Link href="/contact" className="btn btn--primary btn--lg w-full mt-4">
                  <span>{service.cta || 'Get Started Now'}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
