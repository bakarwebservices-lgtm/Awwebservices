import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services Overview | Web Design, E-Commerce & Automation | AW Web Services',
  description: 'Explore custom web development, owned e-commerce systems, Meta ads management, business workflow automation, and virtual assistance services.',
  alternates: {
    canonical: 'https://awweb.online/services',
  },
  openGraph: {
    title: 'Services Overview | Web Design, E-Commerce & Automation | AW Web Services',
    description: 'Explore custom web development, owned e-commerce systems, Meta ads management, business workflow automation, and virtual assistance services.',
    url: 'https://awweb.online/services',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Overview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services Overview | AW Web Services',
    description: 'Custom e-commerce platforms, business workflow automation, web design, and digital marketing.',
    images: ['/images/hero.webp'],
  },
};

const serviceImages: Record<string, string> = {
  'website-design': '/images/services/website-design.jpg',
  'digital-marketing': '/images/services/digital-marketing.jpg',
  'e-commerce': '/images/services/e-commerce.jpg',
  'business-automation': '/images/services/business-automation.jpg',
  'virtual-assistance': '/images/services/virtual-assistance.jpg',
};

export default function ServicesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://awweb.online/services' },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="page-hero hero-blue-banner">
        <div className="container">
          <nav className="breadcrumbs mb-4" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Services</span>
          </nav>

          <h1 className="page-hero__title text-4xl sm:text-5xl font-extrabold">Services Built to Scale Your Business</h1>
          <p className="page-hero__subtitle text-xl mt-3 max-w-3xl leading-relaxed">
            Clean, high-performance digital solutions tailored to your operational goals.
          </p>
        </div>
      </section>

      <section className="services-list-section py-20">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.slug} className="service-card">
                <div className="service-card__image-box mb-4">
                  <img
                    src={serviceImages[service.slug] || '/images/hero.webp'}
                    alt={`${service.title} Thumbnail`}
                    className="service-card__thumb"
                  />
                  <span className="bento__num mt-3 inline-block">0{index + 1}</span>
                </div>
                <h2 className="service-card__title text-xl font-bold mb-2">{service.title}</h2>
                <p className="service-card__desc text-sm text-muted mb-4">{service.heading}</p>
                <Link href={`/services/${service.slug}`} className="service-card__link mt-auto">
                  <span>Explore Service</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="cta-card mt-24">
            <h2 className="text-3xl font-extrabold">Need a Custom Solution for Your Business?</h2>
            <p className="mt-2 text-muted text-base">We build tailored digital infrastructure around how your business operates.</p>
            <div className="mt-6">
              <Link href="/contact" className="btn btn--primary btn--lg">
                <span>Request a Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
