import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import Reel from '@/components/home/Reel';
import Clock from '@/components/home/Clock';
import StoreRail from '@/components/home/StoreRail';
import CaseList from '@/components/home/CaseList';
import DragRail from '@/components/home/DragRail';
import Words from '@/components/Words';
import EndCta from '@/components/EndCta';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { concepts } from '@/data/stores';
import { testimonials } from '@/data/testimonials';
import { WHATSAPP_LINK } from '@/lib/siteConfig';

const TITLE = 'AW Web Services | Custom Web Development, E-Commerce, Marketing & Automation';
const DESC =
  'AW Web Services is a Lahore digital agency building custom websites, e-commerce stores, Meta ad campaigns and business automation systems, engineered for growth and fully owned by you.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: 'https://www.awweb.online' },
  openGraph: { title: TITLE, description: DESC, url: 'https://www.awweb.online', type: 'website', images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'AW Web Services' }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/images/og.png'] },
};

const START_LINK = `${WHATSAPP_LINK}?text=${encodeURIComponent('Hi AW Web Services, I would like to discuss a project.')}`;
const MOCKUP_LINK = `${WHATSAPP_LINK}?text=${encodeURIComponent('Hi AW, I would like a free homepage mockup for my brand.')}`;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AW Web Services',
    url: 'https://www.awweb.online',
    logo: 'https://www.awweb.online/images/logo-mark.png',
    description: 'Digital agency in Lahore providing custom web development, e-commerce platforms, digital marketing, business automation and virtual assistance.',
    email: 'bakarwebservices@gmail.com',
    telephone: '+923061513191',
    address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
    sameAs: ['https://www.facebook.com/awwebservices', 'https://www.instagram.com/awwebservices'],
  };

  const caseSlugs = ['vortex-rings', 'css-kro', 'zn-enterprises', 'attireburg'];
  const cases = caseSlugs.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);

  return (
    <>
      <JsonLd data={organizationSchema} />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero__top">
            <span className="label">Web · E-commerce · Marketing · Automation</span>
            <span className="label label--plain muted">Lahore · <Clock /> PKT</span>
          </div>
          <h1 className="hero__title">
            <span className="row"><span>We build the</span></span>
            <span className="row indent"><span><span className="hl">systems</span> behind</span></span>
            <span className="row"><span>growing brands.</span></span>
          </h1>
          <div className="hero__bottom">
            <p className="lead">
              Custom websites, online stores, Meta ads and business automation for companies in Pakistan and abroad.
              Built around how you work, and fully yours.
            </p>
            <p className="hero__note">
              <span>No vendor lock-in. <b>Code, data and hosting stay in your name.</b></span>
            </p>
            <div className="hero__actions">
              <a className="btn btn--emerald" href={START_LINK} target="_blank" rel="noopener noreferrer">
                Start a project <Arrow />
              </a>
              <Link className="btn btn--line" href="/work">See the work</Link>
            </div>
          </div>
        </div>
        <Reel />
      </section>

      {/* THE IDEA */}
      <section className="section">
        <div className="wrap statement-grid">
          <span className="label">How we work</span>
          <Words text="Most businesses run on a Facebook page, a few rented tools and a spreadsheet someone updates by hand. We replace that with *one* system you own: the site, the store, the ads and the automation behind them." />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--paper2" aria-labelledby="svc-title" style={{ paddingTop: 'clamp(72px, 8vw, 128px)' }}>
        <div className="wrap">
          <div className="stores-head">
            <div>
              <span className="label">What we do</span>
              <h2 className="h2" id="svc-title" style={{ marginTop: 22 }}>
                Five services, <span className="hl" data-paint>one team.</span>
              </h2>
            </div>
            <p className="lead" style={{ maxWidth: '32ch' }}>Take one, or let them work together: the site brings people in, the ads bring more, the automation handles what follows.</p>
          </div>
          <nav className="svc" aria-label="Services">
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>
                    <span className="svc__name">{s.short}</span>
                    <span className="svc__desc">{s.oneLine}</span>
                    <span className="svc__go">Details <Arrow /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section section--ink" aria-labelledby="cases-title">
        <div className="wrap">
          <div className="stores-head">
            <div>
              <span className="label" style={{ color: 'var(--emerald-light)' }}>Behind the storefront</span>
              <h2 className="h2" id="cases-title" style={{ marginTop: 22, maxWidth: '14ch' }}>
                Systems that run the business.
              </h2>
            </div>
            <p className="lead" style={{ maxWidth: '32ch' }}>
              Profit engines, AI graders and estimating tools, built around how one team actually works.
            </p>
          </div>
          <CaseList items={cases} />
        </div>
      </section>

      {/* E-COMMERCE PROJECTS */}
      <div id="stores">
        <StoreRail />
      </div>

      {/* CONCEPTS / FREE MOCKUP */}
      <section className="section" aria-labelledby="concepts-title">
        <div className="wrap concepts-head">
          <div>
            <span className="label">Concepts & mockups</span>
            <h2 className="h2" id="concepts-title" style={{ marginTop: 22 }}>
              See it <span className="hl" data-paint>before you pay.</span>
            </h2>
          </div>
          <div>
            <p className="lead">
              For new clients we design the homepage first, free, from your logo and a few photos. Here are concepts we made for florists, auto shops, HVAC firms, fashion and sports brands:
            </p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 28 }}>
              <a className="btn" href={MOCKUP_LINK} target="_blank" rel="noopener noreferrer">Ask for mine <Arrow /></a>
              <span className="drag-hint"><i aria-hidden="true">↔</i> Drag to browse</span>
            </div>
          </div>
        </div>
        <DragRail label="Concept homepages">
          {concepts.map((c) => (
            <a key={c.id} className="concept" href={c.url} target="_blank" rel="noopener noreferrer" draggable={false}>
              <div className="frame">
                <div className="frame__bar"><i /><i /><i /><span>Concept · {c.niche}</span></div>
                <img src={`/images/work/${c.id}-desktop.webp`} alt={`${c.name} concept homepage`} width={1200} height={750} loading="lazy" draggable={false} />
              </div>
              <div className="concept__cap">
                <b>{c.name}</b>
                <span>{c.niche}</span>
              </div>
            </a>
          ))}
        </DragRail>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section--paper2" aria-labelledby="quotes-title">
        <div className="wrap">
          <span className="label" id="quotes-title">In their words</span>
          <div className="quotes" style={{ marginTop: 48 }}>
            {testimonials.map((t) => (
              <figure className="quote" key={t.id} data-rise>
                <figcaption className="quote__who">
                  <img src={t.avatar} alt="" width={56} height={56} loading="lazy" />
                  <div>
                    <b>{t.name}</b>
                    <span>{t.title}, {t.company}</span>
                  </div>
                </figcaption>
                <blockquote>
                  <p className="quote__big">{t.highlight}</p>
                  <details>
                    <summary>Read the full note</summary>
                    <p className="quote__body">{t.quote}</p>
                  </details>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <EndCta />
    </>
  );
}
