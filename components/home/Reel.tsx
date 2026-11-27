'use client';

/**
 * The hero's drifting line of real client stores on phones. It drifts on its own, speeds up with the
 * page scroll (and reverses when scrolling up), and slows to a crawl under the pointer.
 */
import React, { useEffect, useRef } from 'react';
import { liveWork, concepts } from '@/data/stores';

export default function Reel() {
  const track = useRef<HTMLDivElement>(null);
  const live = liveWork.map((w) => ({ id: w.id, name: w.name, url: w.url, cap: w.domain }));
  const demo = concepts.filter((c) => c.id !== 'arena').map((c) => ({ id: c.id, name: c.name, url: c.url, cap: 'Concept · ' + c.niche }));
  // interleave live work with concepts so the line shows range, not just stores
  const items = live.flatMap((l, i) => (demo[i] ? [l, demo[i]] : [l])).concat(demo.slice(live.length));
  const loop = [...items, ...items];

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0;
    let half = el.scrollWidth / 2;
    let speed = 0.45;
    let target = 0.45;
    let boost = 0;
    let lastY = window.scrollY;
    let raf = 0;
    let visible = true;

    const onScroll = () => {
      const y = window.scrollY;
      boost += (y - lastY) * 0.12;
      lastY = y;
    };
    const onResize = () => (half = el.scrollWidth / 2);
    const enter = () => (target = 0.08);
    const leave = () => (target = 0.45);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      speed += (target - speed) * 0.06;
      boost *= 0.9;
      x -= speed + boost;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    raf = requestAnimationFrame(frame);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="reel" aria-label="Websites and stores we have built">
      <div className="reel__track" ref={track}>
        {loop.map((s, i) => (
          <a
            key={s.id + i}
            className="reel__item"
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden={i >= items.length}
            tabIndex={i >= items.length ? -1 : 0}
          >
            <div className="phone">
              <img src={`/images/work/${s.id}-mobile.webp`} alt={i < items.length ? `${s.name} on a phone` : ''} width={540} height={1168} loading={i < 5 ? 'eager' : 'lazy'} />
            </div>
            <div className="reel__cap">
              <b>{s.name}</b>
              <span>{s.cap}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
