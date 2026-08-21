import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeScript from '@/components/ThemeScript';
import ChatWidget from '@/components/ChatWidget';
import '@/css/style.css';
import '@/css/chat-widget.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://awweb.online'),
  title: {
    default: 'AW Web Services — Digital Agency for Ambitious Brands',
    template: '%s | AW Web Services',
  },
  description: 'Custom web development, digital marketing, e-commerce, and business automation. We craft digital experiences that captivate, convert, and scale.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://awweb.online',
    siteName: 'AW Web Services',
    title: 'AW Web Services — Digital Agency for Ambitious Brands',
    description: 'Custom web development, digital marketing, e-commerce, and business automation. We craft digital experiences that captivate, convert, and scale.',
    images: [
      {
        url: '/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'AW Web Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AW Web Services — Digital Agency for Ambitious Brands',
    description: 'Custom web development, digital marketing, e-commerce, and business automation.',
    images: ['/images/hero.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZGX1HSL9P2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZGX1HSL9P2');
          `}
        </Script>
        <ThemeScript />
        <div className="noise" aria-hidden="true"></div>
        <div className="mesh-bg" aria-hidden="true">
          <div className="mesh-orb mesh-orb--1"></div>
          <div className="mesh-orb mesh-orb--2"></div>
          <div className="mesh-orb mesh-orb--3"></div>
        </div>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
