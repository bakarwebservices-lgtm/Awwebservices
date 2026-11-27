import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="wrap">
        <span className="label">Error 404</span>
        <h1 className="h1" style={{ marginTop: 24, maxWidth: '12ch' }}>
          This page moved out. <span className="hl">The rest is here.</span>
        </h1>
        <p className="lead" style={{ marginTop: 24 }}>The link may be old, or the page was renamed.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
          <Link href="/" className="btn">Back to home</Link>
          <Link href="/work" className="btn btn--line">See the work</Link>
        </div>
      </div>
    </section>
  );
}
