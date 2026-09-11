'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MajorReviewItem {
  id: string;
  tag: string;
  badge: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  avatarUrl: string;
  rating: number;
  highlightHeading: string;
  paragraphs: string[];
  projectSlug: string;
  deliverable: string;
  keyMetric: string;
  metricLabel: string;
}

const majorReviews: MajorReviewItem[] = [
  {
    id: 'css-kro',
    tag: 'EdTech & AI Evaluation',
    badge: 'Verified Enterprise Client',
    clientName: 'Sobaan Saeed',
    clientRole: 'Founder & Lead Educator',
    companyName: 'CSS Kro',
    avatarUrl: '/images/reviews/csskro.webp',
    rating: 5,
    highlightHeading:
      'Working with Abubakar and his team under AW Web Services completely transformed how aspirants prepare for CSS exams.',
    paragraphs: [
      'When we conceptualized CSS Kro, our vision was ambitious: centralize 24 years of competitive exam archives and introduce instant, examiner-grade AI essay evaluation. Most developers we initially spoke with either didn’t grasp the academic nuance or tried pushing generic chatbot wrappers. From our very first technical session, Abubakar stood out completely. He took the time to study the FPSC grading criteria, understood examiner rubrics, and engineered a custom evaluation pipeline that delivers real, actionable essay critiques within seconds rather than weeks of manual marking.',
      'Abubakar and his team under AW Web Services worked tirelessly through complex architectural challenges, ensuring high concurrency, lightning-fast response times, and an intuitive, distraction-free interface for thousands of active students. What sets Abubakar apart isn’t just his elite technical and full-stack capabilities; it is his genuine ownership and personal investment in our project’s success. He treated CSS Kro as if it were his own company, proactively suggesting optimizations and refining user workflows long after initial delivery.',
      'Thanks to Abubakar and the AW Web Services team, we launched on schedule with zero downtime and received overwhelming praise from educators and aspirants nationwide. We consider Abubakar our long-term technology partner and will without hesitation work with him and his team on every future phase of CSS Kro.',
    ],
    projectSlug: 'css-kro',
    deliverable: 'AI Essay Scoring Engine & 24-Yr Archive',
    keyMetric: 'Instant Feedback',
    metricLabel: 'vs. 2+ Weeks Manual Marking',
  },
  {
    id: 'zn-enterprises',
    tag: 'Interior Architecture & Estimation',
    badge: 'Verified Enterprise Client',
    clientName: 'Saad Zaffar',
    clientRole: 'CEO & Founder',
    companyName: 'ZN Enterprises',
    avatarUrl: '/images/reviews/zn enterprises.jpeg',
    rating: 5,
    highlightHeading:
      'Abubakar and his team at AW Web Services engineered an intelligent BOQ engine that slashed our project estimation cycle from days to minutes.',
    paragraphs: [
      'In the interior architecture and design industry, generating comprehensive Bills of Quantities (BOQs) is traditionally painful and error-prone. For years, our team was buried under complex manual spreadsheets, calculating room dimensions, material tiers, labor rates, and supplier markups by hand. We urgently needed a custom AI-driven system tailored to our exact workflow, and Abubakar and his engineering team at AW Web Services delivered a solution that exceeded all our expectations.',
      'From day one, Abubakar personally immersed himself in our internal estimation formulas and material catalog. His team architected an automated multi-step client intake wizard paired with an AI-assisted room-by-room costing engine that produces itemized, production-ready proposals in real time. The precision and attention to detail that Abubakar brought to the table were truly extraordinary—he eliminated edge-case pricing errors and created a platform so intuitive that our estimation turnaround sped up tenfold.',
      'Collaborating with Abubakar and his team under AW Web Services has been an absolute pleasure. His transparency, constant communication, and commitment to delivering robust, production-grade software made this one of the smoothest tech partnerships we have ever had. We look forward to continuing our work with Abubakar and AW Web Services as we scale our operations.',
    ],
    projectSlug: 'zn-enterprises',
    deliverable: 'AI Room-by-Room BOQ Estimation Engine',
    keyMetric: '10x Faster',
    metricLabel: 'Automated BOQ Generation',
  },
];

export default function MajorReviewsSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeReview = majorReviews[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? majorReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === majorReviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="major-reviews-section" id="featured-client-spotlight">
      <div className="container">
        {/* Section Header */}
        <div className="major-reviews-head">
          <div>
            <div className="major-reviews-pill">
              <span className="major-reviews-pill__dot"></span>
              <span>Client Success Spotlight</span>
            </div>
            <h2 className="major-reviews-title">
              What Our <span className="gradient-text">Enterprise Partners</span> Say
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="major-reviews-nav">
            <div className="major-reviews-tabs">
              {majorReviews.map((review, idx) => (
                <button
                  key={review.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`major-reviews-tab ${idx === activeIndex ? 'active' : ''}`}
                  aria-label={`View review from ${review.clientName} at ${review.companyName}`}
                >
                  <span className="major-reviews-tab__num">0{idx + 1}</span>
                  <span className="major-reviews-tab__name">{review.companyName}</span>
                </button>
              ))}
            </div>

            <div className="major-reviews-arrows">
              <button
                onClick={handlePrev}
                className="major-reviews-arrow-btn"
                aria-label="Previous Review"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="major-reviews-counter">
                0{activeIndex + 1} <span className="text-muted">/ 0{majorReviews.length}</span>
              </span>
              <button
                onClick={handleNext}
                className="major-reviews-arrow-btn"
                aria-label="Next Review"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Full-Screen Spotlight Showcase Card */}
        <div className="major-review-showcase">
          <div className="major-review-card">
            {/* Left Sidebar: Client Profile & Deliverables */}
            <div className="major-review-profile">
              <div className="major-review-avatar-wrap">
                <img
                  src={activeReview.avatarUrl}
                  alt={`${activeReview.clientName} - ${activeReview.companyName}`}
                  className="major-review-avatar"
                />
                <div className="major-review-avatar-ring"></div>
                <div className="major-review-verified-badge" title="Verified Client">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>

              <div className="major-review-identity">
                <h3 className="major-review-name">{activeReview.clientName}</h3>
                <p className="major-review-role">{activeReview.clientRole}</p>
                <p className="major-review-company">{activeReview.companyName}</p>
              </div>

              <div className="major-review-meta-box">
                <div className="major-review-meta-item">
                  <span className="major-review-meta-label">Industry</span>
                  <span className="major-review-meta-val">{activeReview.tag}</span>
                </div>
                <div className="major-review-meta-item">
                  <span className="major-review-meta-label">System Delivered</span>
                  <span className="major-review-meta-val">{activeReview.deliverable}</span>
                </div>
                <div className="major-review-meta-item highlight">
                  <span className="major-review-meta-label">{activeReview.metricLabel}</span>
                  <span className="major-review-meta-val metric">{activeReview.keyMetric}</span>
                </div>
              </div>

              <Link
                href={`/work/${activeReview.projectSlug}`}
                className="major-review-case-link"
              >
                <span>Read Full Case Study</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right Side: Deep Review Story */}
            <div className="major-review-content">
              {/* Stars & Top Tag */}
              <div className="major-review-stars-row">
                <div className="major-review-stars" aria-label="5 out of 5 stars">
                  {'★'.repeat(activeReview.rating)}
                </div>
                <span className="major-review-badge-tag">{activeReview.badge}</span>
              </div>

              {/* Highlight Headline */}
              <blockquote className="major-review-headline">
                "{activeReview.highlightHeading}"
              </blockquote>

              {/* Long-Form Authentic Narrative */}
              <div className="major-review-text">
                {activeReview.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Bottom Signoff & Team Attribution */}
              <div className="major-review-footer">
                <div className="major-review-attribution">
                  <span className="attribution-label">Collaborated directly with:</span>
                  <span className="attribution-names">
                    <strong>Abubakar</strong> &amp; the AW Web Services Engineering Team
                  </span>
                </div>
                <div className="major-review-quote-watermark" aria-hidden="true">
                  ”
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
