'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const currentTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    setTheme(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="header" id="header">
        <div className="header__inner container">
          <Link href="/" className="header__logo" onClick={closeMenu}>
            <img src="/images/logo.webp" alt="AW Web Services Logo" width={36} height={36} />
            <span>AW<span className="header__logo-accent">.</span></span>
          </Link>

          <nav className="header__nav" id="mainNav">
            <Link href="/" className={isActive('/') && pathname === '/' ? 'is-active' : ''}>Home</Link>
            <Link href="/services" className={isActive('/services') ? 'is-active' : ''}>Services</Link>
            <Link href="/work" className={isActive('/work') ? 'is-active' : ''}>Work</Link>
            <Link href="/about" className={isActive('/about') ? 'is-active' : ''}>About</Link>
            <Link href="/contact" className={isActive('/contact') ? 'is-active' : ''}>Contact</Link>
            <Link href="/blog" className={isActive('/blog') ? 'is-active' : ''}>Blog</Link>
          </nav>

          <div className="header__actions">
            <button
              className="theme-toggle-btn"
              aria-label="Toggle dark and light theme"
              title="Toggle theme"
              onClick={toggleTheme}
            >
              <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
              <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>

            <Link href="/contact" className="btn btn--primary btn--sm header__cta">
              <span>Start a Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              className={`header__burger ${mobileMenuOpen ? 'is-active' : ''}`}
              id="burger"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu is-open" id="mobileMenu">
          <nav className="mobile-menu__nav">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/services" onClick={closeMenu}>Services</Link>
            <Link href="/work" onClick={closeMenu}>Work</Link>
            <Link href="/about" onClick={closeMenu}>About</Link>
            <Link href="/contact" onClick={closeMenu}>Contact</Link>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
          </nav>
          <Link href="/contact" className="btn btn--primary" onClick={closeMenu}>Start a Project</Link>
        </div>
      )}
    </>
  );
}
