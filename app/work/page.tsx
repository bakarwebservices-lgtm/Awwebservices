import type { Metadata } from 'next';
import React from 'react';
import JsonLd from '@/components/JsonLd';
import PageHead, { crumbSchema } from '@/components/PageHead';
import WorkGrid, { type WorkTile } from '@/components/WorkGrid';
import EndCta from '@/components/EndCta';
import { projects } from '@/data/projects';
import { liveWork, concepts } from '@/data/stores';

const DESC =
  'Live online stores we built for Pakistani and German brands, the systems behind them (profit engines, AI graders, estimating tools), and the free homepage mockups we make for new clients.';

export const metadata: Metadata = {
  title: 'Work: live stores, systems and mockups',
  description: DESC,
  alternates: { canonical: 'https://www.awweb.online/work' },
  openGraph: { title: 'Work | AW Web Services', description: DESC, url: 'https://www.awweb.online/work', type: 'website', images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'AW Web Services work' }] },
  twitter: { card: 'summary_large_image', title: 'Work | AW Web Services', description: DESC, images: ['/images/og.png'] },
};

const SYSTEMS = ['vortex-rings', 'css-kro', 'zn-enterprises', 'attireburg'];
const CONCEPT_CASES: Record<string, string> = { ventura: 'ventura-auto', swannah: 'swanah', gull: 'gull-flowers' };

export default function WorkIndexPage() {
  const tiles: WorkTile[] = [
    ...liveWork.map((w) => ({
      key: 'live-' + w.id, group: 'stores' as const, name: w.name, sub: `${w.domain} · ${w.niche}`,
      img: `/images/work/${w.id}-desktop.webp`, href: w.url, external: true, kind: 'Live',
    })),
    ...SYSTEMS.map((slug) => projects.find((p) => p.slug === slug)!).map((p) => ({
      key: 'sys-' + p.slug, group: 'systems' as const, name: p.title.split(' - ')[0], sub: `${p.title.split(' - ')[1] ?? p.category} · ${p.location ?? ''}`.replace(/ · $/, ''),
      img: p.screenshots[0] || p.heroImage, href: `/work/${p.slug}`, external: false, kind: 'Case study',
    })),
    ...concepts.map((c) => ({
      key: 'con-' + c.id, group: 'concepts' as const, name: c.name, sub: `${c.niche} · concept homepage`,
      img: `/images/work/${c.id}-desktop.webp`,
      href: CONCEPT_CASES[c.id] ? `/work/${CONCEPT_CASES[c.id]}` : c.url, external: !CONCEPT_CASES[c.id], kind: 'Concept',
    })),
  ];

  return (
    <>
      <JsonLd data={crumbSchema([{ name: 'Work', path: '/work' }])} />
      <PageHead
        crumbs={[{ name: 'Work' }]}
        label={`${liveWork.length} live · ${SYSTEMS.length} systems · ${concepts.length} mockups`}
        title={<>Work you can <span className="hl" data-paint>open right now.</span></>}
        lead="Live stores are real brands taking orders today. Systems are the tools behind a business. Mockups are free homepages we design for a brand before it pays."
      />
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <WorkGrid tiles={tiles} />
        </div>
      </section>
      <div style={{ height: 'clamp(80px, 10vw, 160px)' }} />
      <EndCta />
    </>
  );
}
