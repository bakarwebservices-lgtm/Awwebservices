'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/data/projects';

interface WorkScrollCarouselProps {
  projects: ProjectItem[];
}

export default function WorkScrollCarousel({ projects }: WorkScrollCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isDraggingRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    isDraggingRef.current = false;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 6) {
      isDraggingRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      isDraggingRef.current = false;
    }
  };

  return (
    <div className="work-scroll-container">
      {/* Mobile Swipe Cue */}
      <div className="work-scroll__hint-bar">
        <span className="work-scroll__hint-pill">
          <span className="work-scroll__hint-dot"></span>
          Swipe to explore projects
          <span className="work-scroll__hint-arrow">→</span>
        </span>
      </div>

      <div
        className="work-scroll"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isMouseDown ? 'grabbing' : 'grab' }}
      >
        <div className="work-scroll__track">
          {projects.map((project) => (
            <Link
              href={`/work/${project.slug}`}
              key={project.slug}
              className="work-card"
              draggable={false}
              onClick={handleCardClick}
            >
              <div className="work-card__img">
                <img
                  src={project.heroImage}
                  alt={`${project.title} Showcase`}
                  draggable={false}
                  loading="lazy"
                />
                {project.status && (
                  <span className="work-card__status-pill">
                    <span className="live-dot"></span>
                    {project.status}
                  </span>
                )}
              </div>
              <div className="work-card__overlay">
                <div className="work-card__meta">
                  <span className="work-card__tags">{project.category}</span>
                  {project.client && (
                    <span className="work-card__client-pill">{project.client}</span>
                  )}
                </div>
                <h3>{project.title}</h3>
                <div className="work-card__action">
                  <span className="work-card__link">View Case Study</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
