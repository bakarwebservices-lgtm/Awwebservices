'use client';

import React, { useRef, useState } from 'react';

export interface ReviewItem {
  stars: string;
  quote: string;
  author: string;
  role: string;
}

const reviewsData: ReviewItem[] = [
  {
    stars: '★★★★★',
    quote: '"AW Web Services transformed our COD operations completely. The PostEx courier sync and real-time profit tracking eliminated hours of spreadsheet reconciliation."',
    author: 'Vortex Rings Team',
    role: 'Wearable Tech Brand (Pakistan)',
  },
  {
    stars: '★★★★★',
    quote: '"Professional, responsive, and incredibly skilled. The custom apparel storefront they built has given us effortless scaling and complete data ownership."',
    author: 'Attireburg Team',
    role: 'Luxury Fashion Brand',
  },
  {
    stars: '★★★★★',
    quote: '"Abubakar and his team engineered an intelligent BOQ engine that slashed our project estimation cycle from days to minutes. Outstanding technical execution."',
    author: 'Saad Zaffar',
    role: 'CEO & Founder, ZN Enterprises',
  },
  {
    stars: '★★★★★',
    quote: '"The AI essay evaluation pipeline they engineered evaluates FPSC exam rubrics in seconds rather than weeks. Abubakar treated our product like his own."',
    author: 'Dr. Bilal',
    role: 'Academic Director, CSS Kro',
  },
];

export default function ReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsMouseDown(false);
  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="reviews-scroll"
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isMouseDown ? 'grabbing' : 'grab' }}
    >
      <div className="reviews-scroll__track">
        {reviewsData.map((item, idx) => (
          <blockquote key={idx} className="testimonial testimonial--card">
            <div className="testimonial__stars">{item.stars}</div>
            <p>{item.quote}</p>
            <footer>
              <strong>{item.author}</strong>
              <span>{item.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
