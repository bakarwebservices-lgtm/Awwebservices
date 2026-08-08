import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About Us — AW Web Services | Custom Web Development Agency',
  description: 'Learn about AW Web Services. We build owned e-commerce platforms, custom web applications, Meta lead funnels, and real-time business workflow automation.',
  alternates: {
    canonical: 'https://awweb.online/about',
  },
  openGraph: {
    title: 'About Us — AW Web Services | Custom Web Development Agency',
    description: 'Learn about AW Web Services. We build owned e-commerce platforms, custom web applications, Meta lead funnels, and real-time business workflow automation.',
    url: 'https://awweb.online/about',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'About AW Web Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — AW Web Services',
    description: 'Custom web development, owned e-commerce, and automated profit engines built for scale.',
    images: ['/images/hero.webp'],
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://awweb.online/about' },
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
            <span aria-current="page">About Us</span>
          </nav>

          <h1 className="page-hero__title text-4xl sm:text-5xl font-extrabold">Engineering Systems Built to Be Owned, Not Rented</h1>
          <p className="page-hero__subtitle text-xl mt-3 max-w-3xl leading-relaxed">
            AW Web Services is a specialized agency crafting production-grade software, e-commerce platforms, and real-time business automation.
          </p>
        </div>
      </section>

      <section className="about-content py-20">
        <div className="container max-w-5xl mx-auto">
          <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="about-block content-box content-box--spacious">
              <h2 className="text-2xl font-bold mb-4">Our Philosophy</h2>
              <p className="text-base leading-relaxed text-muted mb-4">
                Most modern businesses get locked into subscription platforms, generic templates, and manual spreadsheet workarounds that slow down operations as order volume grows.
              </p>
              <p className="text-base leading-relaxed text-muted">
                We take a different approach: we engineer custom storefronts, API bridges, and internal admin tools that you fully own. From PostgreSQL databases to Next.js codebases, every line of code belongs to your business.
              </p>
            </div>

            <div className="about-block content-box content-box--spacious">
              <h2 className="text-2xl font-bold mb-4">What We Specialize In</h2>
              <ul className="custom-bullets text-base leading-relaxed space-y-3">
                <li><strong>Owned E-Commerce Platforms:</strong> Zero-subscription storefronts with native checkout flows.</li>
                <li><strong>PostEx &amp; Courier Automation:</strong> Real-time courier API synchronization and automated P&amp;L.</li>
                <li><strong>Custom Web Engineering:</strong> Fast Next.js websites built with SEO-first architecture.</li>
                <li><strong>Performance Marketing:</strong> Meta ad campaigns, WhatsApp lead qualification funnels.</li>
                <li><strong>Virtual Operations Support:</strong> Ongoing remote admin, inbox triage, and operations support.</li>
              </ul>
            </div>
          </div>

          <div className="tech-stack-section content-box content-box--spacious mt-12">
            <h2 className="text-2xl font-bold mb-4">Our Core Tech Stack</h2>
            <div className="tech-pills-list flex flex-wrap gap-3 mt-4">
              <span className="tech-pill">Next.js (App Router)</span>
              <span className="tech-pill">TypeScript</span>
              <span className="tech-pill">Node.js</span>
              <span className="tech-pill">PostgreSQL / Supabase</span>
              <span className="tech-pill">OpenAI API</span>
              <span className="tech-pill">PostEx API</span>
              <span className="tech-pill">PayPal &amp; Stripe APIs</span>
              <span className="tech-pill">Vercel</span>
            </div>
          </div>

          <div className="cta-card mt-20">
            <h2 className="text-3xl font-extrabold">Work with an Agency That Builds for Long-Term Growth</h2>
            <p className="text-muted text-base mt-2">Get in touch to discuss your platform requirements or book a technical consultation.</p>
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
