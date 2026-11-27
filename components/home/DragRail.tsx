'use client';

/**
 * A rail you can grab and throw with a mouse (with momentum), and swipe natively on touch.
 * Cards tilt slightly with the drag speed.
 */
import React, { useEffect, useRef } from 'react';

export default function DragRail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false, startX = 0, startLeft = 0, lastX = 0, v = 0, raf = 0, moved = false;
    const cards = () => el.querySelectorAll<HTMLElement>('.concept');
    const setTilt = (deg: number) => cards().forEach((c) => (c.style.transform = `rotate(${deg}deg)`));

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false;
      startX = lastX = e.clientX; startLeft = el.scrollLeft; v = 0;
      cancelAnimationFrame(raf);
      el.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
      v = e.clientX - lastX; lastX = e.clientX;
      setTilt(Math.max(-4, Math.min(4, -v * 0.25)));
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove('is-dragging');
      const glide = () => {
        v *= 0.94;
        el.scrollLeft -= v;
        setTilt(Math.max(-4, Math.min(4, -v * 0.25)));
        if (Math.abs(v) > 0.4) raf = requestAnimationFrame(glide); else setTilt(0);
      };
      raf = requestAnimationFrame(glide);
    };
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('click', onClick, true);
    el.addEventListener('dragstart', (e) => e.preventDefault());
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('click', onClick, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="drag" ref={ref} role="region" aria-label={label} tabIndex={0}>
      <div className="drag__track">{children}</div>
    </div>
  );
}
