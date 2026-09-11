'use client';

import React, { useState } from 'react';

interface Review {
  id: string;
  name: string;
  title: string;
  avatar: string;
  quote: string;
}

const reviews: Review[] = [
  {
    id: 'css-kro',
    name: 'Sobaan Saeed',
    title: 'Founder, CSS Kro',
    avatar: '/images/reviews/csskro.webp',
    quote:
      'Working with Abubakar and his team under AW Web Services completely transformed how aspirants prepare for CSS examinations. When we conceptualized CSS Kro, we needed to centralize 24 years of competitive exam archives and introduce instant, examiner-grade AI essay evaluation. Most developers we initially spoke with couldn’t grasp the academic nuance or tried pushing generic chatbot wrappers. Abubakar immediately understood the FPSC grading criteria, studied examiner rubrics, and engineered a custom evaluation pipeline that delivers real, actionable critiques in seconds rather than weeks of manual marking. He and his team worked tirelessly through concurrency and latency challenges, delivering a seamless, distraction-free interface for thousands of active students. What sets Abubakar apart is his genuine ownership—he treated CSS Kro like his own company and proactively optimized user workflows. We achieved our goals because of his dedication, and we will definitely continue working with him and his team on all future developments.',
  },
  {
    id: 'zn-enterprises',
    name: 'Saad Zaffar',
    title: 'CEO, ZN Enterprises',
    avatar: '/images/reviews/zn enterprises.jpeg',
    quote:
      'Abubakar and his team at AW Web Services engineered an intelligent BOQ engine that slashed our project estimation cycle from days to minutes. In the interior design industry, generating comprehensive Bills of Quantities meant manually calculating dimensions, material tiers, and supplier markups across tedious spreadsheets. Abubakar personally immersed himself in our internal formulas and material catalog, architecting an automated multi-step client intake wizard paired with an AI-assisted room-by-room costing engine that produces itemized, production-ready proposals in real time. The precision, speed, and attention to detail that Abubakar brought were extraordinary. Collaborating with Abubakar and his team has been an absolute pleasure—his constant communication and commitment to robust software made this one of the smoothest tech partnerships we have ever had. We will definitely work with Abubakar and AW Web Services on all our upcoming projects.',
  },
];

export default function MajorReviewsSpotlight() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = reviews[activeIdx];

  return (
    <section className="clean-review-section" aria-label="Client Review">
      <div className="container">
        <div className="clean-review">
          {/* Subtle switcher tabs */}
          <div className="clean-review__nav">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setActiveIdx(i)}
                className={`clean-review__btn ${i === activeIdx ? 'is-active' : ''}`}
                aria-label={`View review from ${r.name}`}
              >
                <span>{r.name}</span>
              </button>
            ))}
          </div>

          {/* Pure Written Quote */}
          <blockquote className="clean-review__quote">
            <span className="clean-review__quote-symbol">“</span>
            <p>{current.quote}</p>
          </blockquote>

          {/* Small circle at the bottom with name & title */}
          <div className="clean-review__author">
            <img
              src={current.avatar}
              alt={current.name}
              className="clean-review__avatar"
            />
            <div className="clean-review__info">
              <strong className="clean-review__name">{current.name}</strong>
              <span className="clean-review__title">{current.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
