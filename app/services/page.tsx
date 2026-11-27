import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import PageHead, { crumbSchema } from '@/components/PageHead';
import EndCta from '@/components/EndCta';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services: web design, e-commerce, marketing & automation',
  description: 'Explore custom web development, owned e-commerce systems, Meta ads management, business workflow automation, and virtual assistance services.',
  alternates: {
    canonical: 'https://www.awweb.online/services',
  },
  openGraph: {
    title: 'Services Overview | Web Design, E-Commerce & Automation | AW Web Services',
    description: 'Explore custom web development, owned e-commerce systems, Meta ads management, business workflow automation, and virtual assistance services.',
    url: 'https://www.awweb.online/services',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Overview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services Overview | Web Design, E-Commerce & Automation | AW Web Services',
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
  return (
    <>
      <JsonLd data={crumbSchema([{ name: 'Services', path: '/services' }])} />
      <PageHead
        crumbs={[{ name: 'Services' }]}
        label="What we do"
        title={<>Five services. <span className="hl" data-paint>One team.</span></>}
        lead="Each one stands on its own. Together they cover the whole path: people find you, trust you, buy, and the work after the sale runs itself."
      />
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap svc-rows">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="svc-row">
              <div className="frame svc-row__img">
                <img src={serviceImages[s.slug]} alt="" loading={i < 2 ? 'eager' : 'lazy'} />
              </div>
              <div className="svc-row__body">
                <span className="label">{s.title}</span>
                <h2 className="h2" style={{ marginTop: 18 }}>{s.short}</h2>
                <p className="lead" style={{ marginTop: 18 }}>{s.heading}</p>
                <ul className="svc-row__list">
                  {s.whatWeHandle.slice(0, 3).map((w) => <li key={w}>{w}</li>)}
                </ul>
                <span className="link" style={{ marginTop: 24 }}>Read more about {s.short.toLowerCase()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div style={{ height: 'clamp(60px, 8vw, 120px)' }} />
      <EndCta />
    </>
  );
}
