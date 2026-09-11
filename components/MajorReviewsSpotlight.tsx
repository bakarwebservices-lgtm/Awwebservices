'use client';

import React, { useState } from 'react';

interface Review {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  highlight: string;
  quote: string;
}

const reviews: Review[] = [
  {
    id: 'css-kro',
    name: 'Sobaan Saeed',
    title: 'Founder & Lead Educator',
    company: 'CSS Kro',
    avatar: '/images/reviews/csskro.webp',
    highlight:
      'Working with Abubakar and his team under AW Web Services completely transformed how aspirants prepare for CSS examinations.',
    quote:
      'When we conceptualized CSS Kro, we needed to centralize 24 years of competitive exam archives and introduce instant, examiner-grade AI essay evaluation. Abubakar immediately understood the FPSC grading criteria, studied examiner rubrics, and engineered a custom evaluation pipeline that delivers actionable critiques in seconds rather than weeks of manual marking. What sets Abubakar apart is his genuine ownership—he treated CSS Kro like his own company, proactively optimizing workflows long after launch. We achieved our goals because of his dedication, and we will definitely continue working with him and his team on all future developments.',
  },
  {
    id: 'zn-enterprises',
    name: 'Saad Zaffar',
    title: 'CEO & Founder',
    company: 'ZN Enterprises',
    avatar: '/images/reviews/zn enterprises.jpeg',
    highlight:
      'Abubakar and his team at AW Web Services engineered an intelligent BOQ engine that slashed our project estimation cycle from days to minutes.',
    quote:
      'In the interior design industry, generating comprehensive Bills of Quantities meant manually calculating dimensions, material tiers, and supplier markups across tedious spreadsheets. Abubakar personally immersed himself in our internal formulas and built an automated multi-step intake wizard with a dynamic room-by-room pricing matrix that eliminated errors completely. The speed, attention to detail, and transparent communication from Abubakar and his team made this the smoothest tech partnership we have ever had. We will definitely work with Abubakar and AW Web Services on all our upcoming projects.',
  },
];

export default function MajorReviewsSpotlight() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = reviews[activeIdx];

  return (
    <section className="clean-review-section" aria-label="Featured Client Review">
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
                <span>{r.company}</span>
              </button>
            ))}
          </div>

          {/* Pure Written Quote with Highlight & Body */}
          <blockquote className="clean-review__quote">
            <span className="clean-review__quote-symbol">“</span>
            <p className="clean-review__highlight">{current.highlight}</p>
            <p className="clean-review__body">{current.quote}</p>
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
              <span className="clean-review__title">{current.title}, {current.company}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
