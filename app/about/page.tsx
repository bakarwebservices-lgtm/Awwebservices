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

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">About Us</span>
          </nav>

          <h1 className="page-hero__title">Engineering digital systems built to be owned, not rented</h1>
          <p className="page-hero__subtitle">
            AW Web Services is a specialized web development, digital marketing, and business automation agency crafting production-grade software for growing brands.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-block">
              <h2>Our Philosophy</h2>
              <p>
                Most modern businesses get locked into subscription platforms, generic templates, and manual spreadsheet workarounds that slow down operations as order volume grows.
              </p>
              <p>
                We take a different approach: we engineer custom storefronts, API bridges, and internal admin tools that you fully own. From PostgreSQL databases to Next.js codebases, every line of code belongs to your business.
              </p>
            </div>

            <div className="about-block">
              <h2>What We Specialize In</h2>
              <ul className="custom-bullets">
                <li><strong>Owned E-Commerce Platforms:</strong> Zero-subscription storefronts with native checkout flows (PayPal, Stripe, COD).</li>
                <li><strong>PostEx &amp; Courier Automation:</strong> Real-time courier API synchronization and automated profit/loss calculation.</li>
                <li><strong>Custom Web Engineering:</strong> Fast, mobile-first Next.js websites built with SEO-first architecture.</li>
                <li><strong>Performance Marketing:</strong> Meta ad campaign management, WhatsApp qualification funnels, and tracking pipelines.</li>
                <li><strong>Virtual Operations Support:</strong> Ongoing remote admin, inbox triage, and operations assistance.</li>
              </ul>
            </div>
          </div>

          <div className="tech-stack-section mt-12">
            <h2>Our Core Tech Stack</h2>
            <div className="tech-pills-list">
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

          <div className="cta-card mt-16">
            <h2>Work with an agency that builds for long-term growth</h2>
            <p>Get in touch to discuss your platform requirements or book a technical consultation.</p>
            <Link href="/contact" className="btn btn--primary btn--lg">
              <span>Start a Project</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
