'use client';

import { useEffect, useState } from 'react';

/** Live Lahore time, so overseas clients know when we're awake. */
export default function Clock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi' });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="hero__clock">{t || '--:--'}</span>;
}
