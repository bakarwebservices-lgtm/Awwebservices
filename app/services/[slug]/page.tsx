import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import PageHead from '@/components/PageHead';
import EndCta from '@/components/EndCta';
import RentMeter from '@/components/home/RentMeter';
import StoreRail from '@/components/home/StoreRail';
import { storeFeatures } from '@/data/stores';
import { projects } from '@/data/projects';
import { services } from '@/data/services';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: 'Service Not Found | AW Web Services',
    };
  }

  const url = `https://www.awweb.online/services/${service.slug}`;

  return {
    title: service.title,
    description: service.metaDescription,
    keywords: [service.primaryKeyword, ...service.longTailKeywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} | AW Web Services`,
      description: service.metaDescription,
      url: url,
      type: 'website',
      images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | AW Web Services`,
      description: service.metaDescription,
      images: ['/images/hero.webp'],
    },
  };
}

export default function DynamicServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.awweb.online' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.awweb.online/services' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://www.awweb.online/services/${service.slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'AW Web Services',
      url: 'https://www.awweb.online',
    },
    areaServed: 'Worldwide',
    termsOfService: 'https://www.awweb.online/terms-of-service',
  };

  const others = services.filter((s) => s.slug !== service.slug);
  const isStore = service.slug === 'e-commerce';
  const related = projects.filter((p) => !p.tag && (
    (service.slug === 'business-automation' && ['vortex-rings', 'zn-enterprises', 'css-kro'].includes(p.slug)) ||
    (service.slug === 'website-design' && ['css-kro', 'zn-enterprises'].includes(p.slug)) ||
    (service.slug === 'e-commerce' && ['attireburg', 'vortex-rings'].includes(p.slug))
  ));

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />

      <PageHead
        crumbs={[{ name: 'Services', href: '/services' }, { name: service.short }]}
        label={service.title}
        title={service.heading}
        long
        lead={service.intro}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
          <a className="btn btn--emerald" href={`https://wa.me/923061513191?text=${encodeURIComponent(`Hi AW Web Services, I'm interested in ${service.title}.`)}`} target="_blank" rel="noopener noreferrer">Talk on WhatsApp</a>
          <Link className="btn btn--line" href="/work">See related work</Link>
        </div>
      </PageHead>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap svc-detail">
          <aside>
            <span className="label">What we handle</span>
            <h2 className="h3" style={{ marginTop: 20, maxWidth: '16ch' }}>Everything from the first call to the handover.</h2>
          </aside>
          <ul className="ticks">
            {service.whatWeHandle.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap">
          <div className="callout">
            <span className="label" style={{ color: 'var(--emerald-light)' }}>Why it matters</span>
            <p style={{ marginTop: 20 }}>{service.whyItMatters}</p>
          </div>
        </div>
      </section>

      {isStore && (
        <>
          <section className="section section--paper2" aria-labelledby="feat-title">
            <div className="wrap feat">
              <div className="feat__aside">
                <span className="label">In every store</span>
                <h2 className="h2" id="feat-title" style={{ marginTop: 22 }}>Built in, <span className="hl" data-paint>not bolted on.</span></h2>
                <p className="lead">What Pakistani COD brands actually need, already there on day one. No app store to shop in for the basics.</p>
              </div>
              <ul className="feat__list">
                {storeFeatures.map((f) => <li key={f.title}><h3>{f.title}</h3><p>{f.text}</p></li>)}
              </ul>
            </div>
          </section>
          <section className="section section--ink" aria-labelledby="rent-title">
            <div className="wrap rent">
              <div>
                <span className="label" style={{ color: 'var(--emerald-light)' }}>Do the maths</span>
                <h2 className="h2" id="rent-title" style={{ marginTop: 22 }}>Rent adds up. <span className="hl hl--light" data-paint>Owning</span> doesn&rsquo;t.</h2>
                <p className="lead" style={{ marginTop: 28 }}>A Shopify plan plus the apps a COD store needs costs about Rs 1.3 lakh a year, for as long as you sell. Slide to see where that goes.</p>
              </div>
              <RentMeter />
            </div>
          </section>
          <StoreRail />
        </>
      )}

      {related.length > 0 && (
        <section className="section--tight">
          <div className="wrap">
            <span className="label">Related case studies</span>
            <div className="grid-work" style={{ marginTop: 32 }}>
              {related.map((p) => (
                <Link key={p.slug} className="tile" href={`/work/${p.slug}`}>
                  <div className="frame"><img src={p.screenshots[0] || p.heroImage} alt={p.title} loading="lazy" /></div>
                  <div className="tile__cap"><div><h3 className="tile__name">{p.title.split(' - ')[0]}</h3><p className="tile__sub">{p.title.split(' - ')[1]}</p></div><span className="tile__kind">Case study</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section--tight">
        <div className="wrap">
          <span className="label">Also from us</span>
          <nav className="svc" aria-label="Other services" style={{ marginTop: 28 }}>
            <ul>
              {others.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>
                    <span className="svc__name">{s.short}</span>
                    <span className="svc__desc">{s.oneLine}</span>
                    <span className="svc__go">Details →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <div style={{ height: 'clamp(60px, 8vw, 120px)' }} />
      <EndCta />
    </>
  );
}
