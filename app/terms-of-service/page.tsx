import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Terms of Service — AW Web Services',
  description: 'Terms of Service for AW Web Services (awweb.online). Read our terms governing site usage, intellectual property, and service disclaimers.',
  alternates: {
    canonical: 'https://awweb.online/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service — AW Web Services',
    description: 'Terms of Service for AW Web Services (awweb.online). Read our terms governing site usage, intellectual property, and service disclaimers.',
    url: 'https://awweb.online/terms-of-service',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — AW Web Services',
    description: 'Terms of Service for AW Web Services (awweb.online).',
    images: ['/images/hero.webp'],
  },
};

export default function TermsOfServicePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://awweb.online/terms-of-service' },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="page-hero hero-blue-banner">
        <div className="container">
          <nav className="breadcrumbs mb-4" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Terms of Service</span>
          </nav>

          <h1 className="page-hero__title text-4xl sm:text-5xl font-extrabold">Terms of Service</h1>
          <p className="page-hero__subtitle text-lg mt-2">Last updated: August 4, 2026</p>
        </div>
      </section>

      <section className="legal-content-section py-20">
        <div className="container max-w-4xl mx-auto">
          <div className="legal-document content-box content-box--spacious">
            <p className="lead-text mb-6">
              These Terms of Service (&quot;Terms&quot;) govern your use of the website awweb.online (the &quot;Site&quot;), operated by AW Web Services (&quot;AWWeb,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By using this Site, you agree to these Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Use of the Site</h2>
            <p className="mb-4">
              This Site is provided to give information about our services (web design, digital marketing, e-commerce development, business automation, and virtual assistance) and to allow prospective clients to request quotes or contact us.
            </p>
            <p className="mb-4">You agree to use this Site only for lawful purposes and not to:</p>
            <ul className="custom-bullets mb-6">
              <li>Attempt to gain unauthorized access to any part of the Site or its underlying systems</li>
              <li>Submit false or misleading information through our contact/quote forms</li>
              <li>Use automated systems (bots, scrapers) to extract content from the Site without permission</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Services</h2>
            <p className="mb-4">
              Descriptions of our services and past projects on this Site are for informational purposes. Case studies reflect real client work; project outcomes described (timelines, metrics, results) are specific to that project's context and are not a guarantee of similar results for future clients.
            </p>
            <p className="mb-6">
              Any actual engagement for services is governed by a separate agreement or proposal between AWWeb and the client, negotiated directly, not by these Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content on this Site — including text, images, logos, and case study descriptions — is the property of AW Web Services unless otherwise noted, and may not be reproduced, distributed, or used without our written permission.
            </p>
            <p className="mb-6">
              Client names, logos, and project details featured in our portfolio are shown with permission or represent our own work on those projects; if you are a featured client and wish to have your project details removed or modified, contact us.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Links</h2>
            <p className="mb-6">
              This Site may link to third-party websites (such as live client projects or demo sites). We are not responsible for the content, availability, or practices of those third-party sites.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Disclaimer</h2>
            <p className="mb-6">
              This Site and its content are provided &quot;as is&quot; without warranties of any kind, express or implied. We do not guarantee that the Site will be uninterrupted, error-free, or secure at all times.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-6">
              To the fullest extent permitted by law, AW Web Services shall not be liable for any indirect, incidental, or consequential damages arising from your use of this Site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to These Terms</h2>
            <p className="mb-6">
              We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law</h2>
            <p className="mb-6">
              These Terms are governed by the laws of Pakistan, without regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p className="mb-2">Questions about these Terms can be sent to:</p>
            <p className="mt-2 leading-relaxed">
              <strong>Email:</strong> <a href="mailto:bakarwebservices@gmail.com" className="gradient-text font-semibold">bakarwebservices@gmail.com</a><br />
              <strong>Website:</strong> awweb.online
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
