import React from 'react';
import Link from 'next/link';
import { WHATSAPP_LINK } from '@/lib/siteConfig';

const MOCKUP_LINK = `${WHATSAPP_LINK}?text=${encodeURIComponent('Hi AW, I would like a free homepage mockup for my brand.')}`;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function EndCta({ title }: { title?: React.ReactNode }) {
  return (
    <section className="end" aria-labelledby="end-title">
      <div className="wrap">
        <h2 className="end__title" id="end-title">
          {title ?? (<>Let&rsquo;s build <span className="hl" data-paint>yours.</span></>)}
        </h2>
        <div className="end__row">
          <p className="lead">
            Message us on WhatsApp with your Instagram or current site. You get a straight answer, and a free mockup if it&rsquo;s a fit.
          </p>
          <div className="end__actions">
            <a className="btn" href={MOCKUP_LINK} target="_blank" rel="noopener noreferrer">WhatsApp 0306 1513191 <Arrow /></a>
            <Link className="btn btn--line" href="/contact">Other ways</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
