import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import PageHead, { crumbSchema } from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import { WHATSAPP_INQUIRY_LINK, WHATSAPP_INTL, CONTACT_EMAIL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Contact: start a project',
  description: 'Get in touch with AW Web Services to discuss your custom web development, e-commerce platform, business automation, or Meta ads management project.',
  alternates: {
    canonical: 'https://www.awweb.online/contact',
  },
  openGraph: {
    title: 'Contact Us | Request a Consultation | AW Web Services',
    description: 'Get in touch with AW Web Services to discuss your custom web development, e-commerce platform, business automation, or Meta ads management project.',
    url: 'https://www.awweb.online/contact',
    type: 'website',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'Contact AW Web Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Request a Consultation | AW Web Services',
    description: 'Start your web development, e-commerce, or automation project with AW Web Services.',
    images: ['/images/hero.webp'],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={crumbSchema([{ name: 'Contact Us', path: '/contact' }])} />
      <PageHead
        crumbs={[{ name: 'Contact' }]}
        label="Start a project"
        title={<>Tell us what you&rsquo;re <span className="hl" data-paint>building.</span></>}
        lead="WhatsApp is the fastest way to reach us. The form below writes the message for you."
      />
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap contact">
          <div className="channels">
            <a href={WHATSAPP_INQUIRY_LINK} target="_blank" rel="noopener noreferrer"><span>WhatsApp · fastest</span><b>{WHATSAPP_INTL}</b></a>
            <a href={`mailto:${CONTACT_EMAIL}`}><span>Email</span><b>{CONTACT_EMAIL}</b></a>
            <div><span>Hours</span><b>Mon–Sat, 9 am – 7 pm PKT</b></div>
            <div><span>Based in</span><b>Lahore, Pakistan. Working worldwide.</b></div>
          </div>
          <ContactForm />
        </div>
      </section>
      <div style={{ height: 'clamp(80px, 10vw, 160px)' }} />
    </>
  );
}
