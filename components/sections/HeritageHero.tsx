'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';

export function HeritageHero() {
  const root = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;
      const split = new SplitType(headlineRef.current, { types: 'words,chars' });
      gsap.set(split.chars, { opacity: 0, y: 60, rotateX: -25, transformPerspective: 1000 });
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: motion.duration.epic,
        ease: 'expo.out',
        stagger: motion.stagger.hero,
        delay: 0.3,
      });
      gsap.from('[data-heritage-hero-sub]', {
        opacity: 0,
        y: 20,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.12,
        delay: 0.9,
      });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="Heritage Hero"
      className="relative bg-[var(--color-ink)] text-[var(--color-cream)] pt-[140px] pb-[clamp(120px,20vh,260px)] px-gutter overflow-hidden"
    >
      <span
        aria-hidden
        className="absolute -top-12 -left-8 font-display text-[50vw] leading-none text-[var(--color-cream)]/[0.04] select-none pointer-events-none"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
      >
        {BUSINESS.founded}
      </span>

      <div className="container-max relative z-10">
        <p data-heritage-hero-sub className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--color-saffron)] mb-8">
          Est. {BUSINESS.founded} · El Cajon, California
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[clamp(48px,9vw,140px)] leading-[0.9] tracking-[-0.03em] max-w-[22ch]"
        >
          Three generations.{' '}
          <em className="italic text-[var(--color-saffron)]">One family.</em>{' '}
          Zero corporate ownership.
        </h1>

        <p data-heritage-hero-sub className="mt-12 max-w-[60ch] text-[var(--color-cream)]/80 text-[clamp(17px,1.5vw,22px)] leading-[1.55] font-display-body">
          We opened as <em>Kaelin&rsquo;s Valley Center</em> in 1958 — the
          first supermarket El Cajon ever had. Same address. Same family ownership
          model. New name. Two cultures now, instead of one.
        </p>
      </div>
    </section>
  );
}
