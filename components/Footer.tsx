import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <Link href="/" className="footer__logo">
              <img src="/images/logo.webp" alt="AW Web Services Logo" width={40} height={40} />
              <span>AW Web Services</span>
            </Link>
            <p className="footer__desc">
              Custom web development, digital marketing, and business workflow automation. Engineered for growth and built for ambitious brands.
            </p>
            <div className="footer__socials">
              <a href="mailto:bakarwebservices@gmail.com" className="footer__social-link" aria-label="Email Us">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Navigation</h4>
            <ul className="footer__links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Services</h4>
            <ul className="footer__links">
              <li><Link href="/services/e-commerce">E-Commerce Development</Link></li>
              <li><Link href="/services/business-automation">Business Automation</Link></li>
              <li><Link href="/services/website-design">Website Design</Link></li>
              <li><Link href="/services/digital-marketing">Digital Marketing</Link></li>
              <li><Link href="/services/virtual-assistance">Virtual Assistance</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Legal</h4>
            <ul className="footer__links">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} AW Web Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
