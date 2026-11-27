import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import Reel from '@/components/home/Reel';
import Clock from '@/components/home/Clock';
import RentMeter from '@/components/home/RentMeter';
import StoreRail from '@/components/home/StoreRail';
import CaseList from '@/components/home/CaseList';
import DragRail from '@/components/home/DragRail';
import Words from '@/components/Words';
import EndCta from '@/components/EndCta';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { concepts, storeFeatures } from '@/data/stores';
import { testimonials } from '@/data/testimonials';
import { WHATSAPP_LINK } from '@/lib/siteConfig';

const TITLE = 'AW Web Services | Online stores you own, built in Lahore';
const DESC =
  'We build Pakistani brands their own online store with WhatsApp order confirmation, courier booking and real profit tracking built in. One-time price, no monthly Shopify rent.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: 'https://www.awweb.online' },
  openGraph: { title: TITLE, description: DESC, url: 'https://www.awweb.online', type: 'website', images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'AW Web Services' }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/images/og.png'] },
};

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
    description: 'Lahore agency that builds brands their own e-commerce stores, plus automation, Meta ads and admin support.',
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
            <span className="label">AI systems for online stores</span>
            <span className="label label--plain muted">Lahore · <Clock /> PKT</span>
          </div>
          <h1 className="hero__title">
            <span className="row"><span>Stop renting</span></span>
            <span className="row indent"><span>your <span className="hl">store.</span></span></span>
          </h1>
          <div className="hero__bottom">
            <p className="lead">
              We build Pakistani brands their own online store, with WhatsApp order confirmation, courier booking and real profit built in.
              You pay once. It&rsquo;s yours.
            </p>
            <p className="hero__note">
              <span>Free homepage mockup <b>before you pay anything.</b></span>
            </p>
            <div className="hero__actions">
              <a className="btn btn--emerald" href={MOCKUP_LINK} target="_blank" rel="noopener noreferrer">
                Get my free mockup <Arrow />
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
          <span className="label">The idea</span>
          <Words text="Shopify is a rented shop. You pay every month and it is *never* yours. We build the shop, hand you the keys, and leave the rent out." />
        </div>
      </section>

      {/* RENT METER */}
      <section className="section section--ink" aria-labelledby="rent-title">
        <div className="wrap rent">
          <div>
            <span className="label" style={{ color: 'var(--emerald-light)' }}>Do the maths</span>
            <h2 className="h2" id="rent-title" style={{ marginTop: 22 }}>
              Rent adds up. <span className="hl hl--light" data-paint>Owning</span> doesn&rsquo;t.
            </h2>
            <p className="lead" style={{ marginTop: 28 }}>
              A Shopify plan plus the apps a COD store needs costs about Rs 1.3 lakh a year, for as long as you sell. Slide to see where that goes.
            </p>
          </div>
          <RentMeter />
        </div>
      </section>

      {/* LIVE STORES */}
      <div id="stores">
        <StoreRail />
      </div>

      {/* FEATURES */}
      <section className="section section--paper2" aria-labelledby="feat-title">
        <div className="wrap feat">
          <div className="feat__aside">
            <span className="label">In every store</span>
            <h2 className="h2" id="feat-title" style={{ marginTop: 22 }}>
              Built in, <span className="hl" data-paint>not bolted on.</span>
            </h2>
            <p className="lead">What Pakistani COD brands actually need, already there on day one. No app store to shop in for the basics.</p>
          </div>
          <ul className="feat__list">
            {storeFeatures.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
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

      {/* CONCEPTS / FREE MOCKUP */}
      <section className="section" aria-labelledby="concepts-title">
        <div className="wrap concepts-head">
          <div>
            <span className="label">The free mockup</span>
            <h2 className="h2" id="concepts-title" style={{ marginTop: 22 }}>
              Before you pay, we design <span className="hl" data-paint>your homepage.</span>
            </h2>
          </div>
          <div>
            <p className="lead">
              Send your logo and three or four photos. We build a homepage for your brand, free, so you see it before you decide.
              Some we made for other niches:
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

      {/* SERVICES */}
      <section className="section" aria-labelledby="svc-title">
        <div className="wrap">
          <div className="stores-head">
            <div>
              <span className="label">What we do</span>
              <h2 className="h2" id="svc-title" style={{ marginTop: 22 }}>Stores first. Then everything around them.</h2>
            </div>
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

      <EndCta />
    </>
  );
}
