'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectItem } from '@/data/projects';

interface StickyProjectCardsProps {
  projects: ProjectItem[];
}

export default function StickyProjectCards({ projects }: StickyProjectCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Use top 5 featured projects for a focused, punchy deck experience
  const displayProjects = projects.slice(0, 5);
  const totalCards = displayProjects.length;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cardElements.length < 2) return;

      // Set initial positions
      gsap.set(cardElements[0], { y: '0%', scale: 1, rotation: 0, opacity: 1 });
      for (let i = 1; i < cardElements.length; i++) {
        gsap.set(cardElements[i], { y: '100%', scale: 1, rotation: 0, opacity: 1 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * (cardElements.length - 0.5)}`,
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.min(
              cardElements.length - 1,
              Math.floor(progress * cardElements.length)
            );
            setActiveCardIndex(newIndex);
          },
        },
      });

      for (let i = 0; i < cardElements.length - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;

        if (!currentCard || !nextCard) continue;

        // Current card shrinks, rotates slightly, and gets an elegant subtle depth dim
        scrollTimeline.to(
          currentCard,
          {
            scale: 0.76,
            rotation: 4,
            filter: 'brightness(0.65)',
            duration: 1,
            ease: 'none',
          },
          position
        );

        // Next card slides in from the bottom
        scrollTimeline.to(
          nextCard,
          {
            y: '0%',
            duration: 1,
            ease: 'none',
          },
          position
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <div className="sticky-cards-section" ref={containerRef}>
      {/* Sticky Deck Viewport */}
      <div className="sticky-cards-viewport">
        {/* Progress Tracker Pill */}
        <div className="sticky-cards__progress-pill">
          <span className="sticky-cards__pulse-dot"></span>
          <span>
            Project {activeCardIndex + 1} of {totalCards}
          </span>
          <span className="sticky-cards__scroll-hint">| Scroll to explore</span>
        </div>

        {/* Card Stage Container */}
        <div className="sticky-cards-stage">
          {displayProjects.map((project, i) => (
            <div
              key={project.slug}
              className="sticky-project-card"
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ zIndex: i + 1 }}
            >
              {/* Background Mockup Image */}
              <div className="sticky-project-card__media">
                <img
                  src={project.heroImage}
                  alt={`${project.title} Showcase`}
                  className="sticky-project-card__img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="sticky-project-card__overlay"></div>
              </div>

              {/* Card Content Overlay */}
              <div className="sticky-project-card__content">
                {/* Top Meta Bar */}
                <div className="sticky-project-card__top">
                  <div className="sticky-project-card__tags">
                    <span className="sticky-project-card__cat-badge">{project.category}</span>
                    {project.status && (
                      <span className="sticky-project-card__status-badge">
                        <span className="live-dot"></span>
                        {project.status}
                      </span>
                    )}
                  </div>
                  {project.client && (
                    <span className="sticky-project-card__client">{project.client}</span>
                  )}
                </div>

                {/* Bottom Details & CTA */}
                <div className="sticky-project-card__bottom">
                  <h3 className="sticky-project-card__title">{project.title}</h3>
                  <p className="sticky-project-card__desc">{project.metaDescription}</p>

                  <div className="sticky-project-card__footer">
                    <div className="sticky-project-card__pills">
                      {project.builtWith.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="sticky-project-card__tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/work/${project.slug}`}
                      className="btn btn--primary btn--sm sticky-project-card__btn"
                    >
                      <span>View Case Study</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
