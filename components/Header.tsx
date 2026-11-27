'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WHATSAPP_INQUIRY_LINK, WHATSAPP_INTL, CONTACT_EMAIL } from '@/lib/siteConfig';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export function Mark({ sub = true }: { sub?: boolean }) {
  return (
    <span className="mark">
      <span className="mark__box" aria-hidden="true">AW</span>
      <span className="mark__name">
        AW Web Services
        {sub && <small>Digital agency · Lahore</small>}
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''}`}>
        <div className="wrap nav__in">
          <Link href="/" aria-label="AW Web Services, home">
            <Mark />
          </Link>
          <nav className="nav__links" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={active(l.href) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav__right">
            <a className="btn btn--sm nav__cta" href={WHATSAPP_INQUIRY_LINK} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
            <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} id="menu" aria-hidden={!open}>
        <nav aria-label="Mobile">
          <Link href="/" tabIndex={open ? 0 : -1}>Home</Link>
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} tabIndex={open ? 0 : -1}>
              {l.label} <small>0{i + 1}</small>
            </Link>
          ))}
        </nav>
        <div className="menu__foot">
          <a className="btn btn--emerald" href={WHATSAPP_INQUIRY_LINK} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            WhatsApp {WHATSAPP_INTL}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} tabIndex={open ? 0 : -1}>{CONTACT_EMAIL}</a>
        </div>
      </div>
    </>
  );
}
