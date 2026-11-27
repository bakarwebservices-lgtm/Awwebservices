import type { Metadata, Viewport } from 'next';
import React from 'react';
import Script from 'next/script';
import { Bricolage_Grotesque, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import StickyWhatsApp from '@/components/StickyWhatsApp';
import Motion from '@/components/Motion';
import '@/css/chat-widget.css';
import '@/css/site.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--ff-display',
  display: 'swap',
});
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--ff-body', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#F6F2EA',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.awweb.online'),
  title: {
    default: 'AW Web Services | Websites, e-commerce, marketing & automation',
    template: '%s | AW Web Services',
  },
  description:
    'AW Web Services is a Lahore digital agency: custom websites, e-commerce stores, Meta ads, business automation and virtual assistance, built for growth and fully owned by you.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.awweb.online',
    siteName: 'AW Web Services',
    title: 'AW Web Services | Websites, e-commerce, marketing & automation',
    description: 'Custom websites, online stores, Meta ads and automation, fully owned by you.',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'AW Web Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AW Web Services | Websites, e-commerce, marketing & automation',
    description: 'Custom websites, online stores, Meta ads and automation.',
    images: ['/images/og.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png' }],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZGX1HSL9P2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZGX1HSL9P2');
          `}
        </Script>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
        <StickyWhatsApp />
        <Motion />
      </body>
    </html>
  );
}
