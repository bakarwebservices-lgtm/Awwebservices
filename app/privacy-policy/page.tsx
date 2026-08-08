import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy — AW Web Services',
  description: 'Privacy Policy for AW Web Services (awweb.online). Learn how we handle your contact information, analytics data, and protect your privacy.',
  alternates: {
    canonical: 'https://awweb.online/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy — AW Web Services',
    description: 'Privacy Policy for AW Web Services (awweb.online). Learn how we handle your contact information, analytics data, and protect your privacy.',
    url: 'https://awweb.online/privacy-policy',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — AW Web Services',
    description: 'Privacy Policy for AW Web Services (awweb.online).',
    images: ['/images/hero.webp'],
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://awweb.online/privacy-policy' },
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
            <span aria-current="page">Privacy Policy</span>
          </nav>

          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__subtitle">Last updated: August 4, 2026</p>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="container max-w-4xl">
          <div className="legal-document content-box">
            <p className="lead-text">
              AW Web Services (&quot;AWWeb,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website awweb.online. This policy explains what information we collect, how we use it, and the choices you have.
            </p>

            <h2>Information We Collect</h2>
            <p>When you submit our contact or quote request form, we collect:</p>
            <ul className="custom-bullets">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Service you're interested in</li>
              <li>Budget range (optional)</li>
              <li>Project details you provide</li>
            </ul>
            <p>We do not collect payment information on awweb.online. We do not process e-commerce transactions on this site.</p>

            <h3>Automatically Collected Information</h3>
            <p>Like most websites, we use analytics tools (Google Analytics) that automatically collect:</p>
            <ul className="custom-bullets">
              <li>Pages visited and time spent on the site</li>
              <li>General location (city/country level, based on IP address)</li>
              <li>Device and browser type</li>
              <li>Referring website or search term that brought you here</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="custom-bullets">
              <li>Respond to your inquiry or quote request</li>
              <li>Understand which services and pages visitors are most interested in, to improve our site</li>
              <li>Communicate with you about a project you've inquired about</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties.</p>

            <h2>Cookies</h2>
            <p>
              Our site may use cookies through Google Analytics to understand site usage. You can disable cookies through your browser settings at any time; this may affect some site functionality.
            </p>

            <h2>Third-Party Services</h2>
            <p>We use the following third-party services, which have their own privacy policies:</p>
            <ul className="custom-bullets">
              <li><strong>Google Analytics</strong> — for site traffic analysis</li>
              <li><strong>Meta (Facebook)</strong> — if you arrive via a Facebook/Instagram ad, Meta's pixel may record that interaction per Meta's own privacy policy</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
              We retain contact form submissions for as long as necessary to respond to your inquiry and maintain business records, or until you request deletion.
            </p>

            <h2>Your Rights</h2>
            <p>You may contact us at any time to:</p>
            <ul className="custom-bullets">
              <li>Request a copy of the information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
            </ul>
            <p>To make a request, email us at <a href="mailto:bakarwebservices@gmail.com">bakarwebservices@gmail.com</a>.</p>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect the information you submit to us. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are intended for businesses and individuals aged 18 and older. We do not knowingly collect information from children under 18.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top will reflect the most recent changes.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions about this privacy policy, contact us at:</p>
            <p>
              <strong>Email:</strong> <a href="mailto:bakarwebservices@gmail.com">bakarwebservices@gmail.com</a><br />
              <strong>Website:</strong> awweb.online
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
