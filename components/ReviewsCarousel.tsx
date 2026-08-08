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
    quote: '"AW Web Services transformed our online presence completely. Our inquiries increased significantly within months!"',
    author: 'Abdul Muiz',
    role: 'CEO, Vortex Rings',
  },
  {
    stars: '★★★★★',
    quote: '"Professional, responsive, and incredibly talented. The e-commerce platform they set up has been flawless."',
    author: 'Sameed Tehami',
    role: 'Founder, Attireburg',
  },
  {
    stars: '★★★★★',
    quote: '"Our social media engagement tripled. We\'re seeing consistent growth in our customer base. Highly recommend!"',
    author: 'Maria',
    role: 'Marketing Director, ZN Enterprises Co.',
  },
  {
    stars: '★★★★★',
    quote: '"Responsive, creative, and deliver on time. Our new website has received so many compliments from clients."',
    author: 'Sobaan Saeed',
    role: 'Owner, CSSKro',
  },
  {
    stars: '★★★★★',
    quote: '"They automated our business processes, saving countless hours each week. The ROI has been incredible."',
    author: 'David Kim',
    role: 'Operations Manager, Swift Logistics',
  },
  {
    stars: '★★★★★',
    quote: '"Their virtual assistance service has been invaluable. They\'ve become an essential part of our daily team operations."',
    author: 'Lisa Thompson',
    role: 'Director, Apex Consulting',
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
