import React from 'react';
import Link from 'next/link';

export interface Crumb { name: string; href?: string }

/** Inner-page header: breadcrumbs, a label, one big title, a lead line. */
export default function PageHead({ crumbs, label, title, lead, children }: { crumbs: Crumb[]; label?: string; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <React.Fragment key={c.name}>
              <span aria-hidden="true">/</span>
              {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </React.Fragment>
          ))}
        </nav>
        {label && <p className="label" style={{ marginTop: 40 }}>{label}</p>}
        <h1 className="h1" style={label ? { marginTop: 20 } : undefined}>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function crumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `https://www.awweb.online${it.path}`,
    })),
  };
}
