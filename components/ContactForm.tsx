'use client';

/**
 * Builds a WhatsApp message from the form and opens it, so the enquiry lands where we actually reply.
 * Nothing is stored or sent anywhere else.
 */
import React, { useState } from 'react';
import { services } from '@/data/services';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  const [link, setLink] = useState('');
  const [details, setDetails] = useState('');
  const [err, setErr] = useState('');

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setErr('Add your name so we know who we are talking to.');
    if (!details.trim()) return setErr('Tell us a line or two about the project.');
    setErr('');
    const lines = [
      `Hi AW Web Services, I'm ${name.trim()}.`,
      picked.length ? `Interested in: ${picked.join(', ')}.` : '',
      link.trim() ? `Our current site or Instagram: ${link.trim()}` : '',
      '',
      details.trim(),
    ].filter((l, i) => l || i === 3);
    window.open(`https://wa.me/923061513191?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <h2>Tell us about the project</h2>
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Ayesha Khan" />
      </div>
      <fieldset className="field">
        <legend>What do you need? Pick any</legend>
        <div className="pills">
          {services.map((s) => (
            <label key={s.slug}>
              <input type="checkbox" checked={picked.includes(s.short)} onChange={() => toggle(s.short)} />
              <span>{s.short}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="cf-link">Current website or Instagram <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></label>
        <input id="cf-link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="instagram.com/yourbrand" />
      </div>
      <div className="field">
        <label htmlFor="cf-details">What are you trying to get done?</label>
        <textarea id="cf-details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="We sell bedsheets on Instagram and want our own store with COD…" />
      </div>
      {err && <p className="form__err" role="alert">{err}</p>}
      <button className="btn btn--emerald" type="submit">Send on WhatsApp</button>
      <p className="form__note">Opens WhatsApp with your message ready to send. Nothing is saved on this site.</p>
    </form>
  );
}
