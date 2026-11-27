import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import PageHead from '@/components/PageHead';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AW Web Services (awweb.online). Read our terms governing site usage, intellectual property, and service disclaimers.',
  alternates: {
    canonical: 'https://www.awweb.online/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service',
    description: 'Terms of Service for AW Web Services (awweb.online). Read our terms governing site usage, intellectual property, and service disclaimers.',
    url: 'https://www.awweb.online/terms-of-service',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'AW Web Services Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | AW Web Services',
    description: 'Terms of Service for AW Web Services (awweb.online).',
    images: ['/images/hero.webp'],
  },
};

export default function TermsOfServicePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://www.awweb.online/terms-of-service' },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <PageHead crumbs={[{ name: 'Terms' }]} label="Legal" title="Terms of Service" lead="Last updated: August 4, 2026" long />

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="prose">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the website awweb.online (the &quot;Site&quot;), operated by AW Web Services (&quot;AWWeb,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By using this Site, you agree to these Terms.
            </p>

            <h2>Use of the Site</h2>
            <p>
              This Site is provided to give information about our services (web design, digital marketing, e-commerce development, business automation, and virtual assistance) and to allow prospective clients to request quotes or contact us.
            </p>
            <p>You agree to use this Site only for lawful purposes and not to:</p>
            <ul>
              <li>Attempt to gain unauthorized access to any part of the Site or its underlying systems</li>
              <li>Submit false or misleading information through our contact/quote forms</li>
              <li>Use automated systems (bots, scrapers) to extract content from the Site without permission</li>
            </ul>

            <h2>Services</h2>
            <p>
              Descriptions of our services and past projects on this Site are for informational purposes. Case studies reflect real client work; project outcomes described (timelines, metrics, results) are specific to that project's context and are not a guarantee of similar results for future clients.
            </p>
            <p>
              Any actual engagement for services is governed by a separate agreement or proposal between AWWeb and the client, negotiated directly, not by these Terms.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this Site (including text, images, logos, and case study descriptions) is the property of AW Web Services unless otherwise noted, and may not be reproduced, distributed, or used without our written permission.
            </p>
            <p>
              Client names, logos, and project details featured in our portfolio are shown with permission or represent our own work on those projects; if you are a featured client and wish to have your project details removed or modified, contact us.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              This Site may link to third-party websites (such as live client projects or demo sites). We are not responsible for the content, availability, or practices of those third-party sites.
            </p>

            <h2>Disclaimer</h2>
            <p>
              This Site and its content are provided &quot;as is&quot; without warranties of any kind, express or implied. We do not guarantee that the Site will be uninterrupted, error-free, or secure at all times.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, AW Web Services shall not be liable for any indirect, incidental, or consequential damages arising from your use of this Site.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms are governed by the laws of Pakistan, without regard to conflict of law principles.
            </p>

            <h2>Contact Us</h2>
            <p className="mb-2">Questions about these Terms can be sent to:</p>
            <p className="mt-2 leading-relaxed">
              <strong>Email:</strong> <a href="mailto:bakarwebservices@gmail.com">bakarwebservices@gmail.com</a><br />
              <strong>Website:</strong> www.awweb.online
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
