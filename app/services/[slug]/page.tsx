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

      {/* SERVICE DETAIL SECTION - HEADLINES OUTSIDE BOXES WITH SPACIOUS GAPS */}
      <section className="service-detail-section py-24">
        <div className="container max-w-4xl mx-auto flex flex-col gap-16">
          
          {/* SECTION 1: OVERVIEW */}
          <div className="service-block">
            <h2 className="section-standalone-heading">Overview</h2>
            <div className="content-box content-box--spacious">
              <p className="lead-text text-lg leading-relaxed">{service.intro}</p>
            </div>
          </div>

          {/* SECTION 2: WHAT WE HANDLE */}
          <div className="service-block">
            <h2 className="section-standalone-heading">What We Handle</h2>
            <div className="content-box content-box--spacious">
              <ul className="custom-bullets text-base leading-relaxed space-y-3">
                {service.whatWeHandle.map((item, idx) => (
                  <li key={idx} className="pl-6">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 3: WHY IT MATTERS */}
          <div className="service-block">
            <h2 className="section-standalone-heading">Why It Matters</h2>
            <div className="content-box content-box--spacious">
              <p className="text-base leading-relaxed">{service.whyItMatters}</p>
            </div>
          </div>

          {/* SECTION 4: OPERATIONAL STRATEGY & EXECUTION (Integrated Keywords) */}
          <div className="service-block">
            <h2 className="section-standalone-heading">Operational Strategy &amp; Execution</h2>
            <div className="content-box content-box--spacious">
              <p className="text-base leading-relaxed mb-4">
                Our approach to <strong className="gradient-text font-semibold">{service.primaryKeyword}</strong> centers on building resilient, self-sustaining workflows tailored to your business needs. Rather than implementing quick patches, we design custom systems that eliminate operational bottlenecks and drive measurable growth.
              </p>
              <p className="text-base leading-relaxed mb-4">
                We integrate solutions covering:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {service.longTailKeywords.map((kw, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-surface-3 border border-border">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent-2 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-sm font-medium">{kw}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cta-card mt-12">
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
