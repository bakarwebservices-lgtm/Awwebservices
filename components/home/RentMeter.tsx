'use client';

/**
 * "How long will you sell online?" Drag the years and watch Shopify rent pile up against a store you own.
 * Shopify side: Rs 11,000 a month, the middle of the Rs 10–12k a plan plus apps typically costs in Pakistan
 * (sales playbook). We never show our own price here: that goes out after the free mockup.
 */
import React, { useEffect, useRef, useState } from 'react';

const MONTHLY = 11000;
const fmt = (n: number) => 'Rs ' + Math.round(n).toLocaleString('en-PK');

function useTween(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 500);
      const e = 1 - Math.pow(1 - p, 3);
      const v = a + (value - a) * e;
      setShown(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return shown;
}

export default function RentMeter() {
  const [years, setYears] = useState(3);
  const rent = MONTHLY * 12 * years;
  const shown = useTween(rent);
  const max = MONTHLY * 12 * 10;

  return (
    <div className="rent__panel">
      <div className="rent__q">
        <label htmlFor="years">How long will you sell online?</label>
        <span className="rent__years" aria-live="polite">{years} {years === 1 ? 'year' : 'years'}</span>
      </div>
      <input
        id="years"
        className="rent__range"
        type="range"
        min={1}
        max={10}
        step={1}
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
      />
      <div className="rent__ticks" aria-hidden="true">
        <span>1</span><span>5</span><span>10 yrs</span>
      </div>

      <div className="rent__row">
        <span className="small" style={{ color: 'var(--on-ink-2)' }}>Shopify plan + apps, paid every month</span>
        <span className="rent__num">{fmt(shown)}</span>
        <div className="rent__bar"><i style={{ width: `${(rent / max) * 100}%` }} /></div>
      </div>
      <div className="rent__row">
        <span className="small" style={{ color: 'var(--on-ink-2)' }}>Your own AW store, after you pay once</span>
        <span className="rent__num rent__num--own">Rs 0 / month</span>
        <div className="rent__bar"><i style={{ width: '0%' }} /></div>
      </div>
      <p className="rent__fine">
        Shopify figure: about Rs 10,000–12,000 a month for a plan and the apps a Pakistani COD store needs. Your store runs on
        your own free hosting account, so there is no monthly rent to us or anyone else.
      </p>
    </div>
  );
}
