'use client';

import React, { useRef } from 'react';
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

  // Focus on top 4 premier case studies for a decisive "1, 2, 3, 4" flow
  const displayProjects = projects.slice(0, 4);
  const totalCards = displayProjects.length;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cardElements.length < 2) return;

      // Set initial positions: Card 0 is active, subsequent cards wait below
      gsap.set(cardElements[0], { y: '0%', scale: 1, rotation: 0, opacity: 1 });
      for (let i = 1; i < cardElements.length; i++) {
        gsap.set(cardElements[i], { y: '100%', scale: 1, rotation: 0, opacity: 1 });
      }

      // Timing architecture: Generous HOLD so each card rests peacefully at full size,
      // followed by a smooth TRANSITION to the next card.
      const HOLD = 1.2;
      const TRANS = 1.0;
      const totalDuration = HOLD + (cardElements.length - 1) * (TRANS + HOLD);

      // Compute precise magnetic snap points at the center of each card's resting hold
      const snapPoints: number[] = [0];
      for (let i = 1; i < cardElements.length - 1; i++) {
        const centerTime = HOLD + (i - 1) * (TRANS + HOLD) + TRANS + HOLD * 0.5;
        snapPoints.push(centerTime / totalDuration);
      }
      snapPoints.push(1);

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * cardElements.length * 1.15}`,
          pin: true,
          scrub: 0.8,
          pinSpacing: true,
          anticipatePin: 1,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.35, max: 0.65 },
            delay: 0.08,
            ease: 'power2.out',
          },
        },
      });

      let currentTime = HOLD;

      for (let i = 0; i < cardElements.length - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];

        if (!currentCard || !nextCard) continue;

        // Current card gently settles back into the stack without getting dark or blank
        scrollTimeline.to(
          currentCard,
          {
            scale: 0.92,
            rotation: 2,
            opacity: 0.9,
            duration: TRANS,
            ease: 'power1.inOut',
          },
          currentTime
        );

        // Next card slides in smoothly from below to take center stage
        scrollTimeline.to(
          nextCard,
          {
            y: '0%',
            duration: TRANS,
            ease: 'power1.inOut',
          },
          currentTime
        );

        // Advance time through the transition PLUS the subsequent card's full hold period
        currentTime += TRANS + HOLD;
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
      <div className="sticky-cards-viewport">
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
              {/* Background Mockup Image (eagerly preloaded so zero flash/blank occurs) */}
              <div className="sticky-project-card__media">
                <img
                  src={project.heroImage}
                  alt={`${project.title} Showcase`}
                  className="sticky-project-card__img"
                  loading="eager"
                  decoding="async"
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
