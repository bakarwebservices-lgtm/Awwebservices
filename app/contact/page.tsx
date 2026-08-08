import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us — Request a Consultation | AW Web Services',
  description: 'Get in touch with AW Web Services to discuss your custom web development, e-commerce platform, business automation, or Meta ads management project.',
  alternates: {
    canonical: 'https://awweb.online/contact',
  },
  openGraph: {
    title: 'Contact Us — Request a Consultation | AW Web Services',
    description: 'Get in touch with AW Web Services to discuss your custom web development, e-commerce platform, business automation, or Meta ads management project.',
    url: 'https://awweb.online/contact',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'Contact AW Web Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — AW Web Services',
    description: 'Start your web development, e-commerce, or automation project with AW Web Services.',
    images: ['/images/hero.webp'],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://awweb.online/contact' },
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
            <span aria-current="page">Contact Us</span>
          </nav>

          <h1 className="page-hero__title">Let's build something extraordinary together</h1>
          <p className="page-hero__subtitle">
            Fill out the project quote form below or reach out directly to discuss your website, e-commerce, or automation needs.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Direct Contact Details</h2>
              <p>We typically respond to inquiries within 24 hours.</p>

              <div className="contact-card mt-6">
                <div className="contact-card__item">
                  <h3>Email Inquiry</h3>
                  <a href="mailto:bakarwebservices@gmail.com">bakarwebservices@gmail.com</a>
                </div>
                <div className="contact-card__item mt-4">
                  <h3>Primary Services</h3>
                  <p>Custom E-Commerce, Business Automation, Web Design, Meta Ads, Virtual Assistance</p>
                </div>
                <div className="contact-card__item mt-4">
                  <h3>Operating Hours</h3>
                  <p>Monday — Saturday: 9:00 AM – 7:00 PM (PKT)</p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>Request a Project Quote</h2>
              <form className="contact-form" action="mailto:bakarwebservices@gmail.com" method="post" encType="text/plain">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" name="fullName" required placeholder="John Doe" className="form-input" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required placeholder="john@example.com" className="form-input" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <input type="tel" id="phone" name="phone" placeholder="+92 300 1234567" className="form-input" />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Interested In *</label>
                  <select id="service" name="service" required className="form-select">
                    <option value="e-commerce">Custom E-Commerce Development</option>
                    <option value="business-automation">Business Automation &amp; Workflow Systems</option>
                    <option value="website-design">Custom Website Design &amp; Development</option>
                    <option value="digital-marketing">Digital Marketing &amp; Meta Ads</option>
                    <option value="virtual-assistance">Virtual Assistance &amp; Admin Support</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Estimated Budget Range</label>
                  <select id="budget" name="budget" className="form-select">
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-3k">$1,000 – $3,000</option>
                    <option value="3k-5k">$3,000 – $5,000</option>
                    <option value="5k-plus">$5,000+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="projectDetails">Project Details &amp; Objectives *</label>
                  <textarea id="projectDetails" name="projectDetails" rows={5} required placeholder="Describe your project, goals, timeline, and key requirements..." className="form-textarea"></textarea>
                </div>

                <button type="submit" className="btn btn--primary btn--lg w-full">
                  <span>Send Inquiry</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
