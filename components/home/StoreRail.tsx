'use client';

/**
 * Live client stores. Desktop: the section pins and vertical scroll moves the rail sideways.
 * Touch / narrow screens: a native swipe rail with snap points.
 */
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { liveWork } from '@/data/stores';

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export default function StoreRail() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const items = liveWork.filter((w) => w.kind === 'store');

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const t = track.current!;
        rail.current!.classList.add('rail--pin');
        const dist = () => t.scrollWidth - window.innerWidth;
        const tween = gsap.to(t, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: rail.current,
            start: 'center center',
            end: () => '+=' + dist(),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (st) => {
              if (bar.current) bar.current.style.transform = `scaleX(${0.08 + st.progress * 0.92})`;
              if (count.current) count.current.textContent = String(Math.min(items.length, 1 + Math.floor(st.progress * items.length))).padStart(2, '0');
            },
          },
        });
        // a gentle lift on each frame as it crosses the centre
        t.querySelectorAll<HTMLElement>('.store__visual').forEach((v) => {
          gsap.fromTo(v, { rotate: 1.2, y: 16 }, {
            rotate: -1.2, y: -16, ease: 'none',
            scrollTrigger: { trigger: v, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          });
        });
        return () => rail.current?.classList.remove('rail--pin');
      });
    },
    { scope: root },
  );

  const onNativeScroll = () => {
    const r = rail.current;
    if (!r || r.classList.contains('rail--pin')) return;
    const p = r.scrollLeft / Math.max(1, r.scrollWidth - r.clientWidth);
    if (bar.current) bar.current.style.transform = `scaleX(${0.08 + p * 0.92})`;
    if (count.current) count.current.textContent = String(Math.min(items.length, 1 + Math.floor(p * (items.length - 0.01)))).padStart(2, '0');
  };

  return (
    <section className="section" ref={root} aria-labelledby="stores-title" style={{ paddingBottom: 'clamp(64px, 8vw, 120px)' }}>
      <div className="wrap stores-head">
        <div>
          <span className="label label--emerald">E-commerce</span>
          <h2 className="h2" id="stores-title" style={{ marginTop: 22 }}>
            Online stores we built. <span className="hl" data-paint>Open any.</span>
          </h2>
        </div>
        <p className="lead" style={{ maxWidth: '30ch' }}>Real brands taking orders today, on their own domains and their own hosting. No Shopify rent.</p>
      </div>

      <div className="rail" ref={rail} onScroll={onNativeScroll}>
        <div className="rail__track" ref={track}>
          {items.map((s) => (
            <a key={s.id} className="store" href={s.url} target="_blank" rel="noopener noreferrer">
              <div className="store__visual">
                <div className="frame">
                  <div className="frame__bar"><i /><i /><i /><span>{s.domain}</span></div>
                  <img src={`/images/work/${s.id}-desktop.webp`} alt={`${s.name} homepage`} width={1200} height={750} loading="lazy" />
                </div>
                <div className="store__phone">
                  <div className="phone"><img src={`/images/work/${s.id}-mobile.webp`} alt="" width={540} height={1168} loading="lazy" /></div>
                </div>
              </div>
              <div className="store__body">
                <div className="store__meta"><span>{s.niche}</span><i /><span>{s.country}</span></div>
                <h3 className="store__name">{s.name}</h3>
                <p className="store__line">{s.line}</p>
                <span className="store__url">Visit {s.domain} <Arrow /></span>
              </div>
            </a>
          ))}
          <div className="store store--end">
            <h3 className="h3">Want one for your brand?</h3>
            <Link className="link" href="/services/e-commerce">How our stores work</Link>
          </div>
        </div>
        <div className="wrap rail-foot">
          <div className="rail-count" aria-hidden="true">
            <span ref={count}>01</span>
            <span className="rail-count__bar"><i ref={bar} /></span>
            <span>{String(items.length).padStart(2, '0')}</span>
          </div>
          <span className="small muted rail-hint">Scroll to move sideways · tap a store to open it</span>
        </div>
      </div>
    </section>
  );
}
