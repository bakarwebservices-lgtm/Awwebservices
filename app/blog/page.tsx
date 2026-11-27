import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import PageHead, { crumbSchema } from '@/components/PageHead';
import EndCta from '@/components/EndCta';

export const metadata: Metadata = {
  title: 'Blog & Insights | Web Development & Automation Articles',
  description: 'Technical insights, e-commerce infrastructure guides, and business automation strategies from the engineering team at AW Web Services.',
  alternates: {
    canonical: 'https://www.awweb.online/blog',
  },
  openGraph: {
    title: 'Blog & Insights | Web Development & Automation Articles',
    description: 'Technical insights, e-commerce infrastructure guides, and business automation strategies from the engineering team at AW Web Services.',
    url: 'https://www.awweb.online/blog',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights | AW Web Services',
    description: 'Technical insights, e-commerce infrastructure guides, and business automation strategies.',
    images: ['/images/hero.webp'],
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={crumbSchema([{ name: 'Blog', path: '/blog' }])} />
      <PageHead
        crumbs={[{ name: 'Journal' }]}
        label="Journal"
        title={<>Notes from <span className="hl" data-paint>the build.</span></>}
        lead="Write-ups on owned e-commerce, courier and profit automation, WhatsApp lead funnels and fast local-business sites. The first articles are being written now."
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
          <a className="btn" href="https://www.instagram.com/awwebservices" target="_blank" rel="noopener noreferrer">Follow on Instagram meanwhile</a>
          <Link className="btn btn--line" href="/contact">Request a topic</Link>
        </div>
      </PageHead>
      <EndCta />
    </>
  );
}
