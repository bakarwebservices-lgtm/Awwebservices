import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Blog & Insights — Web Development & Automation Articles | AW Web Services',
  description: 'Technical insights, e-commerce infrastructure guides, and business automation strategies from the engineering team at AW Web Services.',
  alternates: {
    canonical: 'https://awweb.online/blog',
  },
  openGraph: {
    title: 'Blog & Insights — Web Development & Automation Articles | AW Web Services',
    description: 'Technical insights, e-commerce infrastructure guides, and business automation strategies from the engineering team at AW Web Services.',
    url: 'https://awweb.online/blog',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights — AW Web Services',
    description: 'Technical insights, e-commerce infrastructure guides, and business automation strategies.',
    images: ['/images/hero.webp'],
  },
};

export default function BlogIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://awweb.online/blog' },
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
            <span aria-current="page">Blog</span>
          </nav>

          <h1 className="page-hero__title">Engineering Insights &amp; Tech Articles</h1>
          <p className="page-hero__subtitle">
            Articles on custom e-commerce architecture, PostEx courier API integration, Meta lead qualification funnels, and real-time business automation.
          </p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="content-box text-center py-16">
            <h2>Articles &amp; Case Analysis Coming Soon</h2>
            <p className="max-w-xl mx-auto mt-4 text-muted">
              We are preparing detailed technical deep-dives on building owned e-commerce infrastructure, automating cash-on-delivery profit tracking, and designing high-converting local service websites.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="btn btn--primary">
                <span>Subscribe or Request a Topic</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
