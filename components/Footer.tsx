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
              <a
                href="https://wa.me/923061513191?text=Hi%20AW%20Web%20Services,%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link footer__social-link--whatsapp"
                aria-label="Chat with us on WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.647.766 5.114 2.088 7.206L3 30.5l7.538-1.556A13.435 13.435 0 0016 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.57c-2.317 0-4.48-.65-6.33-1.78l-.454-.277-4.47.923.94-4.354-.303-.482A11.002 11.002 0 014.93 16c0-6.104 4.966-11.07 11.07-11.07 6.104 0 11.07 4.966 11.07 11.07 0 6.104-4.966 11.07-11.07 11.07zm6.074-8.293c-.333-.167-1.97-.972-2.276-1.083-.306-.111-.528-.167-.75.167-.222.333-.861 1.083-1.056 1.306-.194.222-.389.25-.722.083-.333-.167-1.406-.518-2.678-1.653-.99-.882-1.658-1.972-1.852-2.305-.194-.333-.02-.513.146-.679.15-.15.333-.389.5-.583.167-.194.222-.333.333-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.806-1.028-2.472-.27-.648-.546-.56-.75-.57-.194-.01-.417-.013-.639-.013-.222 0-.583.083-.889.417-.306.333-1.167 1.139-1.167 2.778 0 1.639 1.194 3.222 1.361 3.444.167.222 2.35 3.589 5.694 5.033.795.344 1.417.55 1.9.704.798.254 1.525.218 2.1.133.642-.095 1.97-.806 2.25-1.583.278-.778.278-1.444.194-1.583-.083-.139-.306-.222-.639-.389z"/>
                </svg>
              </a>
              <a href="mailto:bakarwebservices@gmail.com" className="footer__social-link" aria-label="Email Us">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
            <a
              href="https://wa.me/923061513191?text=Hi%20AW%20Web%20Services,%20I%20would%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__whatsapp-pill"
            >
              <span className="footer__whatsapp-dot"></span>
              <span>WhatsApp: +92 306 1513191</span>
            </a>
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
