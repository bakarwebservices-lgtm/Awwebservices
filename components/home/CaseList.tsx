'use client';

/**
 * Systems we built, as a big type list. On desktop a framed preview follows the pointer and swaps image
 * per row; on touch screens each row shows its own image instead.
 */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { ProjectItem } from '@/data/projects';

export default function CaseList({ items }: { items: ProjectItem[] }) {
  const peek = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = peek.current;
    if (!el || !window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.14;
      cy += (y - cy) * 0.14;
      const tilt = Math.max(-8, Math.min(8, (x - cx) * 0.05));
      el.style.transform = `translate(${cx + 40}px, ${cy - 120}px) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <ul className="cases" onPointerLeave={() => setActive(-1)}>
        {items.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="case" onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(-1)}>
              <span className="case__tag">{p.category.split('·')[0].trim()}</span>
              <span className="case__title">{p.title.split(' - ')[0]}</span>
              <span className="case__sub">{p.metaDescription}</span>
              <span className="case__arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
              <span className="frame case__img">
                <img src={p.screenshots[0] || p.heroImage} alt="" loading="lazy" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={`peek ${active >= 0 ? 'is-on' : ''}`} ref={peek} aria-hidden="true">
        {items.map((p, i) => (
          <img key={p.slug} src={p.screenshots[0] || p.heroImage} alt="" className={i === active ? "is-on" : ""} />
        ))}
      </div>
    </>
  );
}
