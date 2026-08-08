import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: '404 — Page Not Found | AW Web Services',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <section className="page-hero text-center py-24">
      <div className="container max-w-2xl">
        <p className="eyebrow text-red-500 font-semibold mb-2">404 Error</p>
        <h1 className="page-hero__title text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="page-hero__subtitle text-lg text-muted mb-8">
          The page you requested could not be found. It might have been moved, renamed, or no longer exists.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/" className="btn btn--primary btn--lg">
            <span>Return to Homepage</span>
          </Link>
          <Link href="/contact" className="btn btn--ghost btn--lg">
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
