'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';

/**
 * CommunityVoices — verified neighborhood quotes from public reviews.
 * Different from TestimonialsMarquee (home page) — these are slower, longer
 * quotes about the community / heritage angle, not the food.
 */
const VOICES = [
  {
    quote:
      "The folks at Kaelin\u2019s are really nice and very friendly! Mexican type ingredients and food — salsas, homemade tortillas, chiles, everything.",
    author: 'F. V.',
    source: 'NextDoor (Alpine, CA)',
  },
  {
    quote:
      "This little home town store has been in El Cajon as long as I can remember, and I\u2019m 72 years old.",
    author: 'Yelp reviewer',
    source: 'Yelp',
  },
  {
    quote:
      "Kaelin\u2019s, hands down. The store has a great variety of foods. They have a great fish market inside, prices are really cheap, plus a bakery that makes fresh bread every day.",
    author: 'L. G.',
    source: 'NextDoor (El Cajon, CA)',
  },
];

export function CommunityVoices() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-voice]', {
        opacity: 0,
        y: 32,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="Community Voices"
      className="relative bg-[var(--color-cream)] py-[var(--section-y)] px-gutter overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -top-4 right-0 text-[22vw]">
        Familia
      </span>

      <div className="container-max relative z-10">
        <div className="mb-12 lg:mb-16">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
            La gente del barrio
          </p>
          <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink)] max-w-[22ch]">
            What the <em className="italic text-[var(--color-saffron)]">neighborhood</em> says.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {VOICES.map((v, i) => (
            <figure
              key={i}
              data-voice
              className="relative bg-[var(--color-paper)] border border-[var(--color-line)] p-8 lg:p-10"
            >
              <span
                aria-hidden
                className="font-display text-[80px] leading-[0.5] text-[var(--color-saffron)]/40 absolute -top-2 left-6 select-none"
              >
                “
              </span>
              <blockquote className="font-display-body italic text-[var(--color-ink)] text-[clamp(17px,1.4vw,20px)] leading-[1.5] mt-6">
                {v.quote}
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-[var(--color-line)]">
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-ink)]">
                  — {v.author}
                </p>
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] mt-1">
                  {v.source}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
