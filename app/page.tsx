import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import WorkScrollCarousel from '@/components/WorkScrollCarousel';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'AW Web Services — Custom Web Development, Marketing & Business Automation',
  description: 'AW Web Services crafts custom websites, e-commerce platforms, Meta ad campaigns, and business workflow automation systems engineered for growth and scale.',
  alternates: {
    canonical: 'https://awweb.online',
  },
  openGraph: {
    title: 'AW Web Services — Custom Web Development, Marketing & Business Automation',
    description: 'AW Web Services crafts custom websites, e-commerce platforms, Meta ad campaigns, and business workflow automation systems engineered for growth and scale.',
    url: 'https://awweb.online',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Homepage Hero' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AW Web Services — Custom Web Development, Marketing & Business Automation',
    description: 'AW Web Services crafts custom websites, e-commerce platforms, Meta ad campaigns, and business workflow automation systems engineered for growth and scale.',
    images: ['/images/hero.webp'],
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AW Web Services',
    url: 'https://awweb.online',
    logo: 'https://awweb.online/images/logo.webp',
    description: 'Digital agency providing custom web development, e-commerce platforms, digital marketing, business automation, and virtual assistance.',
    email: 'bakarwebservices@gmail.com',
    sameAs: ['https://www.facebook.com/awwebservices'],
  };

  return (
    <>
      <JsonLd data={organizationSchema} />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <p className="eyebrow hero__eyebrow">Custom Web &amp; Automation Agency</p>
              <h1 className="hero__title">
                <span className="line"><span className="word">We</span> <span className="word">build</span></span>{' '}
                <span className="line"><span className="word">digital</span> <span className="word gradient-text">experiences</span></span>{' '}
                <span className="line"><span className="word">that</span> <span className="word">move</span> <span className="word">brands.</span></span>
              </h1>
              <p className="hero__desc">
                Web design, marketing, automation &amp; e-commerce — engineered for growth. Built for ambitious businesses seeking production-grade systems.
              </p>
              <div className="hero__actions">
                <Link href="/contact" className="btn btn--primary btn--lg">
                  <span>Free Consultation</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/work" className="btn btn--ghost btn--lg">
                  <span>View Our Work</span>
                </Link>
              </div>
            </div>

            <div className="hero__video-wrapper">
              <div className="hero__video-block">
                <video autoPlay loop muted playsInline className="hero__video" poster="/images/hero.webp">
                  <source src="/images/hero-section.mp4" type="video/mp4" />
                </video>
                <div className="hero__video-overlay"></div>
                <div className="hero__video-badge">
                  <span className="hero__video-dot"></span>
                  <span>Digital Excellence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hero__stats">
            <div className="stat-card">
              <span className="stat-card__num" style={{ fontSize: '1.35rem', lineHeight: 1.2, marginBottom: '0.35rem' }}>
                Custom Systems
              </span>
              <span className="stat-card__label">Tailored Web Platforms</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num" style={{ fontSize: '1.35rem', lineHeight: 1.2, marginBottom: '0.35rem' }}>
                Full Ownership
              </span>
              <span className="stat-card__label">Zero Vendor Lock-In</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num" style={{ fontSize: '1.35rem', lineHeight: 1.2, marginBottom: '0.35rem' }}>
                Direct APIs
              </span>
              <span className="stat-card__label">PostEx &amp; PayPal Integration</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__num" style={{ fontSize: '1.35rem', lineHeight: 1.2, marginBottom: '0.35rem' }}>
                End-to-End
              </span>
              <span className="stat-card__label">Production Reliability</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TRACK */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span>Web Design</span><span className="marquee__dot">◆</span>
          <span>Digital Marketing</span><span className="marquee__dot">◆</span>
          <span>E-Commerce</span><span className="marquee__dot">◆</span>
          <span>Automation</span><span className="marquee__dot">◆</span>
          <span>Virtual Assistance</span><span className="marquee__dot">◆</span>
          <span>Brand Strategy</span><span className="marquee__dot">◆</span>
          <span>Web Design</span><span className="marquee__dot">◆</span>
          <span>Digital Marketing</span><span className="marquee__dot">◆</span>
          <span>E-Commerce</span><span className="marquee__dot">◆</span>
          <span>Automation</span><span className="marquee__dot">◆</span>
          <span>Virtual Assistance</span><span className="marquee__dot">◆</span>
          <span>Brand Strategy</span><span className="marquee__dot">◆</span>
        </div>
      </div>

      {/* SERVICES SECTION — BENTO GRID */}
      <section className="section" id="services-preview">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What We Do</p>
            <h2 className="section-head__title">
              Services built to <span className="gradient-text">scale</span> your business
            </h2>
          </div>

          <div className="bento">
            {/* 01: Website Design */}
            <article className="bento__item bento__item--lg">
              <div className="bento__img">
                <img
                  src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&h=600&fit=crop"
                  alt="Custom Website Design & Development"
                />
              </div>
              <div className="bento__body">
                <span className="bento__num">01</span>
                <h3>Website Design</h3>
                <p>Custom, responsive websites that captivate audiences and convert visitors into loyal customers.</p>
                <Link href="/services/website-design" className="bento__link">
                  Explore →
                </Link>
              </div>
            </article>

            {/* 02: Digital Marketing */}
            <article className="bento__item">
              <div className="bento__img">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                  alt="Digital Marketing & Meta Ads"
                />
              </div>
              <div className="bento__body">
                <span className="bento__num">02</span>
                <h3>Digital Marketing</h3>
                <p>Strategic campaigns that amplify reach and engage your target audience.</p>
                <Link href="/services/digital-marketing" className="bento__link">
                  Explore →
                </Link>
              </div>
            </article>

            {/* 03: E-Commerce */}
            <article className="bento__item">
              <div className="bento__img">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                  alt="Custom E-Commerce Platform"
                />
              </div>
              <div className="bento__body">
                <span className="bento__num">03</span>
                <h3>E-Commerce</h3>
                <p>Complete storefronts with payment integration, courier sync, and zero platform rent.</p>
                <Link href="/services/e-commerce" className="bento__link">
                  Explore →
                </Link>
              </div>
            </article>

            {/* 04: Business Automation */}
            <article className="bento__item">
              <div className="bento__img">
                <img
                  src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop"
                  alt="Business Workflow Automation"
                />
              </div>
              <div className="bento__body">
                <span className="bento__num">04</span>
                <h3>Automation</h3>
                <p>Smart workflows that save time, automate P&amp;L tracking, and eliminate manual errors.</p>
                <Link href="/services/business-automation" className="bento__link">
                  Explore →
                </Link>
              </div>
            </article>

            {/* 05: Virtual Assistance */}
            <article className="bento__item bento__item--wide">
              <div className="bento__img">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=400&fit=crop"
                  alt="Virtual Assistance & Operations Support"
                />
              </div>
              <div className="bento__body">
                <span className="bento__num">05</span>
                <h3>Virtual Assistance</h3>
                <p>Professional remote admin support and inbox management so you can focus on growing your business.</p>
                <Link href="/services/virtual-assistance" className="bento__link">
                  All Services →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FEATURED WORK HORIZONTAL SCROLL CAROUSEL */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Featured Work</p>
            <h2 className="section-head__title">
              Projects that <span className="gradient-text">deliver results</span>
            </h2>
          </div>
        </div>

        {/* Interactive Drag & Scroll Carousel */}
        <WorkScrollCarousel projects={projects} />

        <div className="container text-center mt-12">
          <Link href="/work" className="btn btn--ghost btn--lg">
            View Full Portfolio
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS / REVIEWS SECTION (SINGLE-ROW SCROLLABLE) */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Testimonials</p>
            <h2 className="section-head__title">
              Trusted by <span className="gradient-text">ambitious businesses</span>
            </h2>
          </div>

          <ReviewsCarousel />
        </div>
      </section>

      {/* CTA BANNER WITH VIDEO BACKGROUND */}
      <section className="cta-banner">
        <div className="cta-banner__bg">
          <video autoPlay loop muted playsInline className="cta-banner__video" poster="/images/hero.webp">
            <source src="/images/hero-section-2.0.mp4" type="video/mp4" />
          </video>
          <div className="cta-banner__overlay"></div>
        </div>
        <div className="container cta-banner__inner">
          <h2>
            Ready to elevate your<br />
            <span className="gradient-text">digital presence?</span>
          </h2>
          <p>Partner with us to engineer high-performing, production-grade digital systems.</p>
          <Link href="/contact" className="btn btn--primary btn--lg">
            <span>Get Started Today</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
