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

      {/* HERO BANNER WITH BLUE GLOW HIGHLIGHT */}
      <section className="page-hero hero-blue-banner">
        <div className="container">
          <nav className="breadcrumbs mb-4" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span aria-current="page">{service.title}</span>
          </nav>

          <div className="hero-highlight-tag mb-3">
            <span className="hero-highlight-dot"></span>
            <span>Core Service Offering</span>
          </div>

          <h1 className="page-hero__title text-4xl sm:text-5xl font-extrabold">{service.title}</h1>
          <p className="page-hero__subtitle text-xl mt-3 max-w-3xl leading-relaxed">{service.heading}</p>
        </div>
      </section>

      {/* SERVICE DETAIL SECTION - HEADLINES INSIDE DISTINCTLY SEPARATED BOXES */}
      <section className="service-detail-section py-20">
        <div className="container max-w-4xl mx-auto">
          <div className="service-main flex flex-col gap-10">
            
            <div className="content-box content-box--spacious">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="lead-text text-lg leading-relaxed">{service.intro}</p>
            </div>

            <div className="content-box content-box--spacious">
              <h2 className="text-2xl font-bold mb-4">What We Handle</h2>
              <ul className="custom-bullets text-base leading-relaxed space-y-3">
                {service.whatWeHandle.map((item, idx) => (
                  <li key={idx} className="pl-6">{item}</li>
                ))}
              </ul>
            </div>

            <div className="content-box content-box--spacious">
              <h2 className="text-2xl font-bold mb-4">Why It Matters</h2>
              <p className="text-base leading-relaxed">{service.whyItMatters}</p>
            </div>

            <div className="content-box content-box--spacious">
              <h2 className="text-2xl font-bold mb-4">Target Keywords &amp; Technical Scope</h2>
              <p className="text-base mb-3">
                Primary focus keyword: <strong className="gradient-text">{service.primaryKeyword}</strong>
              </p>
              <div className="tech-pills-list flex flex-wrap gap-2 mt-4">
                {service.longTailKeywords.map((kw, i) => (
                  <span key={i} className="tech-pill">{kw}</span>
                ))}
              </div>
            </div>

          </div>

          <div className="cta-card mt-20">
            <h2 className="text-3xl font-extrabold">Build Your Customized System Today</h2>
            <p className="text-muted text-base mt-2">Our team is ready to engineer production-grade solutions tailored to your brand.</p>
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
