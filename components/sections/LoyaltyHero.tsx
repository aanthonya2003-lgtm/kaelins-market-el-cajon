'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';

export function LoyaltyHero() {
  const root = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;
      const split = new SplitType(headlineRef.current, { types: 'words,chars' });
      gsap.set(split.chars, { opacity: 0, y: 50, rotateX: -20, transformPerspective: 1000 });
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: motion.duration.epic,
        ease: 'expo.out',
        stagger: motion.stagger.hero,
        delay: 0.3,
      });
      gsap.from('[data-loyalty-hero-sub]', {
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
      data-section="Loyalty Hero"
      className="relative bg-[var(--color-saffron)] text-[var(--color-ink)] pt-[140px] pb-[clamp(96px,16vh,180px)] px-gutter overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -top-8 -right-6 text-[34vw] text-[var(--color-ink)] opacity-[0.06]">
        AppCard
      </span>

      <div className="container-max relative z-10">
        <p data-loyalty-hero-sub className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--color-ink)]/60 mb-6">
          Lealtad / Loyalty
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[clamp(48px,10vw,160px)] leading-[0.92] tracking-[-0.03em] max-w-[16ch]"
        >
          Free to join. <em className="italic">Rewards that stack.</em>
        </h1>

        <p data-loyalty-hero-sub className="mt-10 max-w-[58ch] text-[var(--color-ink)]/85 text-[clamp(17px,1.5vw,22px)] leading-[1.55] font-display-body">
          AppCard is the loyalty program we use to thank you for shopping with us.
          Earn points on every visit, unlock members-only coupons, and get a heads-up
          when your favorite items go on sale.
        </p>

        <div data-loyalty-hero-sub className="mt-10 flex flex-wrap gap-3">
          <a
            href={BUSINESS.urls.appcard}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[var(--color-ink)] text-[var(--color-cream)] px-7 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-chile)] transition-colors duration-300"
          >
            Join AppCard →
          </a>
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className="inline-flex items-center gap-3 border border-[var(--color-ink)]/40 text-[var(--color-ink)] px-7 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors duration-300"
          >
            Ask in store
          </a>
        </div>
      </div>
    </section>
  );
}
