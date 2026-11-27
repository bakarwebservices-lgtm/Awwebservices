'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface WorkTile {
  key: string;
  group: 'stores' | 'systems' | 'concepts';
  name: string;
  sub: string;
  img: string;
  href: string;
  external: boolean;
  kind: string;
}

const groups = [
  { id: 'all', label: 'Everything' },
  { id: 'stores', label: 'Live stores & sites' },
  { id: 'systems', label: 'Systems' },
  { id: 'concepts', label: 'Free mockups' },
] as const;

export default function WorkGrid({ tiles }: { tiles: WorkTile[] }) {
  const [g, setG] = useState<(typeof groups)[number]['id']>('all');
  const count = (id: string) => (id === 'all' ? tiles.length : tiles.filter((t) => t.group === id).length);

  return (
    <>
      <div className="filters" role="toolbar" aria-label="Filter work">
        {groups.map((x) => (
          <button key={x.id} className="chip" aria-pressed={g === x.id} onClick={() => setG(x.id)}>
            {x.label} <sup>{count(x.id)}</sup>
          </button>
        ))}
      </div>
      <div className="grid-work">
        {tiles.map((t) => {
          const inner = (
            <>
              <div className="frame">
                <div className="frame__bar"><i /><i /><i /><span>{t.sub.split(' · ')[0]}</span></div>
                <img src={t.img} alt={`${t.name}`} loading="lazy" width={1200} height={750} />
              </div>
              <div className="tile__cap">
                <div>
                  <h2 className="tile__name">{t.name}</h2>
                  <p className="tile__sub">{t.sub}</p>
                </div>
                <span className={`tile__kind ${t.group === 'stores' ? 'tile__kind--live' : t.group === 'concepts' ? 'tile__kind--concept' : ''}`}>{t.kind}</span>
              </div>
            </>
          );
          const cls = `tile ${g !== 'all' && t.group !== g ? 'is-hidden' : ''}`;
          return t.external ? (
            <a key={t.key} className={cls} href={t.href} target="_blank" rel="noopener noreferrer">{inner}</a>
          ) : (
            <Link key={t.key} className={cls} href={t.href}>{inner}</Link>
          );
        })}
      </div>
    </>
  );
}
