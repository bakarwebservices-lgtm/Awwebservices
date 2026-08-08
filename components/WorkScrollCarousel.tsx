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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
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
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
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
          >
            <div className="work-card__img">
              <img src={project.heroImage} alt={`${project.title} Showcase`} draggable={false} />
              {project.tag && (
                <span className="portfolio-card__badge" style={{ zIndex: 5 }}>
                  {project.tag}
                </span>
              )}
            </div>
            <div className="work-card__overlay">
              <span className="work-card__tags">{project.category}</span>
              <h3>{project.title}</h3>
              <span className="work-card__link mt-1">View Case Study →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
