'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';

/**
 * Timeline data — strictly source-cited.
 *
 * SPRINT CONSTRAINT ENFORCED:
 * - The Alpine Twisters Inc incorporation year is NOT shipped. Anthony's rule:
 *   "Year TBD — confirmed legal entity Alpine Twisters Inc dba Kaelin's Market"
 *   placeholder until verified from a primary source.
 * - No fabricated milestones. Every year is sourced or marked TBD.
 */
const MILESTONES = [
  {
    year: '1958',
    title: "Kaelin's Valley Center opens",
    body: "The first supermarket in El Cajon, California. Same address we're at today: 1435 E Main St.",
    source: 'kaelinsmarket.com/about-us',
    verified: true,
  },
  {
    year: 'TBD',
    title: 'Incorporated as Alpine Twisters Inc',
    body: 'Legal entity Alpine Twisters Inc dba Kaelin\u2019s Market — confirmed via California Secretary of State + San Diego County FBN filing. Incorporation year placeholder pending primary-source verification.',
    source: 'CA Secretary of State + SD County Recorder',
    verified: false,
    unverifiedNote: 'Year requires owner confirmation or CA SOS business search',
  },
  {
    year: 'Today',
    title: 'Mexican + Arabic groceries under one roof',
    body: "Tortillas pressed by hand. Halal selection in the carnicer\u00eda. Pan dulce and khubz baked the same morning. Largest butcher shop in El Cajon. 4.4 stars across 2,762 Google reviews. 93/100 health score.",
    source: 'Google + Yelp + County Health',
    verified: true,
  },
];

export function HeritageTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-milestone]', {
        opacity: 0,
        x: -40,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
      gsap.from('[data-timeline-line]', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: motion.duration.epic * 1.5,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="Timeline"
      className="relative bg-[var(--color-cream)] py-[var(--section-y)] px-gutter overflow-hidden"
    >
      <div className="container-max relative">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
          La historia / The timeline
        </p>
        <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink)] max-w-[20ch] mb-16 lg:mb-20">
          What got us <em className="italic text-[var(--color-saffron)]">here.</em>
        </h2>

        <div className="relative grid lg:grid-cols-12 gap-8">
          {/* Vertical line */}
          <div
            data-timeline-line
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--color-ink)]/15 lg:left-[calc(25%-1px)]"
          />

          <div className="lg:col-span-12 space-y-16 lg:space-y-24">
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                data-milestone
                className="relative grid lg:grid-cols-12 gap-6 lg:gap-12 items-start pl-12 lg:pl-0"
              >
                {/* Year marker (mobile inline, desktop in column) */}
                <div className="lg:col-span-3 relative">
                  {/* Bullet on the line */}
                  <span
                    aria-hidden
                    className={`absolute -left-12 lg:-left-0 lg:right-0 top-2 w-[10px] h-[10px] rounded-full ${
                      m.verified ? 'bg-[var(--color-chile)]' : 'bg-[var(--color-saffron)] ring-2 ring-[var(--color-ink)]/20'
                    }`}
                    style={{ left: '-2.25rem' }}
                  />
                  <p
                    className={`font-display text-[clamp(28px,3vw,48px)] leading-none tracking-[-0.025em] ${
                      m.verified ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]/55'
                    }`}
                  >
                    {m.year}
                  </p>
                  {!m.verified && (
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--color-saffron)] mt-2">
                      Verifying
                    </p>
                  )}
                </div>

                <div className="lg:col-span-8">
                  <h3 className="font-display text-[clamp(22px,2.2vw,32px)] leading-[1.15] text-[var(--color-ink)]">
                    {m.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-[var(--color-ink)] text-[clamp(15px,1.2vw,18px)] leading-[1.6] font-display-body">
                    {m.body}
                  </p>
                  {m.unverifiedNote && (
                    <p className="mt-3 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] italic">
                      {m.unverifiedNote}
                    </p>
                  )}
                  <p className="mt-4 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] opacity-70">
                    Source: {m.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
