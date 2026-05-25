'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';

export function LoyaltyAppCardCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-loyalty]', {
        opacity: 0,
        y: 32,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.1,
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
      data-section="Loyalty"
      className="relative bg-[var(--color-saffron)] text-[var(--color-ink)] py-[var(--section-y-tight)] overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -bottom-6 -right-4 text-[26vw] text-[var(--color-ink)] opacity-[0.05]">
        AppCard
      </span>

      <div className="container-max px-gutter grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-8">
          <p data-loyalty className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink)]/60 mb-3">
            Loyalty · Lealtad
          </p>
          <h2
            data-loyalty
            className="font-display text-[clamp(36px,6vw,80px)] leading-[0.95] tracking-[-0.025em]"
          >
            Free to join. <em className="italic">Rewards that stack.</em>
          </h2>
          <p data-loyalty className="mt-6 max-w-[52ch] text-[var(--color-ink)]/80 text-[clamp(16px,1.3vw,20px)] leading-[1.55]">
            Sign up for AppCard at the register or online. Earn points on every visit, unlock
            members-only coupons, and get notified when your favorite items go on sale.
          </p>
        </div>
        <div data-loyalty className="lg:col-span-4 flex flex-col gap-3">
          <a
            href={BUSINESS.urls.appcard}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[var(--color-ink)] text-[var(--color-cream)] px-8 py-5 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-chile)] transition-colors duration-300"
          >
            Join AppCard →
          </a>
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className="inline-flex items-center justify-center gap-3 border border-[var(--color-ink)]/40 text-[var(--color-ink)] px-8 py-5 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors duration-300"
          >
            Ask in-store
          </a>
        </div>
      </div>
    </section>
  );
}
