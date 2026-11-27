'use client';

/**
 * Site-wide motion: smooth scroll (Lenis, desktop pointer only), reveal-on-view for [data-rise] and the
 * emerald highlight paint ([data-paint]), and the word-by-word statement scrub ([data-scrub]).
 * Everything is skipped when the visitor asks for reduced motion.
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let lenis: Lenis | null = null;

export default function Motion() {
  const pathname = usePathname();

  // one-time: smooth scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;
    lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // per page: reveals
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const hero = document.querySelector('.hero');
    if (hero) document.fonts?.ready.then(() => requestAnimationFrame(() => hero.classList.add('is-ready')));

    const targets = document.querySelectorAll<HTMLElement>('[data-rise], [data-paint]');
    if (reduce) {
      targets.forEach((t) => t.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const delay = Number(el.dataset.delay || 0);
          window.setTimeout(() => el.classList.add('is-in'), delay);
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );
    targets.forEach((t) => io.observe(t));

    const triggers: ScrollTrigger[] = [];
    document.querySelectorAll<HTMLElement>('[data-scrub]').forEach((el) => {
      const words = Array.from(el.querySelectorAll<HTMLElement>('.w'));
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          end: 'bottom 52%',
          onUpdate: (st) => {
            const n = Math.round(st.progress * words.length);
            words.forEach((w, i) => w.classList.toggle('on', i < n));
          },
        }),
      );
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      io.disconnect();
      triggers.forEach((tr) => tr.kill());
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
