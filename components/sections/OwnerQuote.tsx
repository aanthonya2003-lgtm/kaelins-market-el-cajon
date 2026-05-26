'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';

/**
 * OWNER QUOTE BLOCK
 *
 * STANDING INSTRUCTION (per Anthony, sprint kickoff):
 *   - This component ships with a clearly visible placeholder state
 *   - HTML comment marker is present below for grep-ability at handoff
 *   - Visible in-UI state reads "Quote from the Garmo family — coming soon"
 *   - DO NOT write any fictional, assumed, or AI-generated owner voice
 *   - Flip to a real quote ONLY after Hani Garmo (or current ownership) confirms
 *     the exact text in writing
 */
export function OwnerQuote() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-owner-quote-item]', {
        opacity: 0,
        y: 24,
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
      data-section="Owner Quote"
      className="relative bg-[var(--color-paper)] py-[var(--section-y)] px-gutter overflow-hidden"
    >
      {/* OWNER QUOTE: awaiting Hani Garmo confirmation */}
      <div className="container-max max-w-[820px] mx-auto text-center">
        <p data-owner-quote-item className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-6">
          From the family
        </p>

        <div
          data-owner-quote-item
          className="relative border-2 border-dashed border-[var(--color-ink)]/15 bg-[var(--color-cream)] p-8 lg:p-14"
        >
          <span
            aria-hidden
            className="font-display text-[120px] leading-[0.5] text-[var(--color-saffron)]/40 absolute -top-2 left-6 select-none"
          >
            “
          </span>

          <p className="font-display italic text-[var(--color-ink-soft)] text-[clamp(22px,2.6vw,36px)] leading-[1.3] mt-6">
            Quote from the Garmo family &mdash; coming soon.
          </p>

          <p className="mt-8 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)]">
            ⚠︎ Placeholder · awaiting owner confirmation
          </p>

          <p className="mt-3 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)]/70 max-w-[48ch] mx-auto">
            We never publish words attributed to people they aren&rsquo;t verified to have said.
            This block fills in when the owner provides the exact text.
          </p>
        </div>
      </div>
    </section>
  );
}
