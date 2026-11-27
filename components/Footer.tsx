import React from 'react';
import Link from 'next/link';
import { Mark } from '@/components/Header';
import { WHATSAPP_INQUIRY_LINK, WHATSAPP_INTL, CONTACT_EMAIL } from '@/lib/siteConfig';
import { services } from '@/data/services';
import { liveWork } from '@/data/stores';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__brand">
            <Link href="/" aria-label="AW Web Services, home"><Mark /></Link>
            <p>Websites, online stores, Meta ads and automation for growing businesses. Custom-built, and fully yours.</p>
          </div>
          <div>
            <h4>Talk</h4>
            <ul>
              <li><a href={WHATSAPP_INQUIRY_LINK} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_INTL}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
              <li><a href="https://www.facebook.com/awwebservices" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/awwebservices" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.short}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Live work</h4>
            <ul>
              {liveWork.slice(0, 6).map((w) => (
                <li key={w.id}><a href={w.url} target="_blank" rel="noopener noreferrer">{w.name}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot__big" aria-hidden="true">Own it.</div>
        <div className="foot__bottom">
          <span>© {new Date().getFullYear()} AW Web Services · Lahore, Pakistan</span>
          <span>
            <Link href="/privacy-policy">Privacy</Link> &nbsp;·&nbsp; <Link href="/terms-of-service">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
