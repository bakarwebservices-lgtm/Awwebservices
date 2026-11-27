import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import PageHead, { crumbSchema } from '@/components/PageHead';
import EndCta from '@/components/EndCta';
import { liveWork, concepts } from '@/data/stores';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'About: a Lahore studio for web, e-commerce and automation',
  description: 'Learn about AW Web Services. We build owned e-commerce platforms, custom web applications, Meta lead funnels, and real-time business workflow automation.',
  alternates: {
    canonical: 'https://www.awweb.online/about',
  },
  openGraph: {
    title: 'About Us | Custom Web Development Agency | AW Web Services',
    description: 'Learn about AW Web Services. We build owned e-commerce platforms, custom web applications, Meta lead funnels, and real-time business workflow automation.',
    url: 'https://www.awweb.online/about',
    type: 'website',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'About AW Web Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Custom Web Development Agency | AW Web Services',
    description: 'Custom web development, owned e-commerce, and automated profit engines built for scale.',
    images: ['/images/og.png'],
  },
};

export default function AboutPage() {
  const facts = [
    { n: String(liveWork.length), l: 'live sites and stores' },
    { n: String(concepts.length), l: 'concept builds' },
    { n: String(services.length), l: 'services under one roof' },
    { n: '2', l: 'markets: Pakistan and the EU' },
  ];
  return (
    <>
      <JsonLd data={crumbSchema([{ name: 'About Us', path: '/about' }])} />
      <PageHead
        crumbs={[{ name: 'About' }]}
        label="AW Web Services · Lahore"
        title={<>Built to be <span className="hl" data-paint>owned,</span> not rented.</>}
        lead="We are a small Lahore team that builds custom websites, online stores, ad funnels and the automation behind them, for businesses that are done patching things together."
      />
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <dl className="facts">
            {facts.map((f) => <div key={f.l}><dt className="sr-only">{f.l}</dt><dd style={{ margin: 0 }}><b>{f.n}</b><span>{f.l}</span></dd></div>)}
          </dl>
        </div>
      </section>
      <section className="section">
        <div className="wrap about-grid">
          <div>
            <span className="label">Our philosophy</span>
            <h2 className="h2" style={{ marginTop: 22 }}>Your code, your data, your hosting.</h2>
          </div>
          <div className="prose" style={{ fontSize: 19 }}>
            <p>Most businesses get locked into subscription platforms, generic templates and spreadsheet workarounds that slow everything down as orders grow.</p>
            <p>We take a different approach. We build custom storefronts, API bridges and internal admin tools that you fully own. From the database to the codebase, every line belongs to your business, and the hosting account is in your name.</p>
            <p>That is why clients keep working with us after launch: there is nothing to escape from, only things to build next.</p>
          </div>
        </div>
      </section>
      <section className="section section--paper2">
        <div className="wrap about-grid">
          <div>
            <span className="label">What we specialise in</span>
            <h2 className="h2" style={{ marginTop: 22 }}>The whole path, from first click to the books.</h2>
          </div>
          <ul className="ticks">
            <li><strong>Owned e-commerce.</strong> Stores with native checkout, WhatsApp order confirmation and courier booking, with no monthly platform rent.</li>
            <li><strong>Courier and profit automation.</strong> PostEx and other courier APIs synced to orders, with live profit and loss.</li>
            <li><strong>Custom websites.</strong> Fast Next.js sites with SEO built in from the first page.</li>
            <li><strong>Performance marketing.</strong> Meta campaigns and WhatsApp lead funnels that sort enquiries for you.</li>
            <li><strong>Operations support.</strong> Ongoing remote admin, inbox triage and coordination.</li>
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="wrap about-grid">
          <div>
            <span className="label">Our stack</span>
            <h2 className="h3" style={{ marginTop: 22, maxWidth: '18ch' }}>Modern, boring in the right places, and easy to hand over.</h2>
          </div>
          <div className="stack">
            {['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Vercel', 'Cloudflare', 'OpenAI & Claude APIs', 'PostEx API', 'PayPal & Stripe', 'Meta Ads & Pixel', 'WhatsApp'].map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </section>
      <section className="section section--paper2">
        <div className="wrap">
          <span className="label">Clients, in their words</span>
          <div className="quotes" style={{ marginTop: 48 }}>
            {testimonials.map((t) => (
              <figure className="quote" key={t.id}>
                <figcaption className="quote__who">
                  <img src={t.avatar} alt="" width={56} height={56} loading="lazy" />
                  <div><b>{t.name}</b><span>{t.title}, {t.company}</span></div>
                </figcaption>
                <blockquote><p className="quote__big">{t.highlight}</p></blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <EndCta />
    </>
  );
}
