'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';

const proofs = [
  { value: String(BUSINESS.founded), label: 'Year Founded', sub: 'First in El Cajon' },
  { value: `${BUSINESS.rating.value}\u2606`, label: `${BUSINESS.rating.count.toLocaleString()} Google Reviews`, sub: '4.4 average' },
  { value: `${BUSINESS.healthScore}/100`, label: 'Health Score', sub: 'County verified' },
  { value: '2', label: 'Cultures, one mercado', sub: 'Mexican · Arabic' },
  { value: '#1', label: 'Largest Butcher Shop', sub: 'In El Cajon' },
];

export function SocialProofStrip() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-proof]', {
        opacity: 0,
        y: 24,
        duration: motion.duration.standard,
        ease: 'expo.out',
        stagger: motion.stagger.std,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="Proof"
      className="relative bg-[var(--color-paper)] border-y border-[var(--color-line)] py-12 lg:py-16"
    >
      <div className="container-max px-gutter">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 lg:gap-x-10">
          {proofs.map((p) => (
            <li key={p.label} data-proof className="flex flex-col">
              <span className="font-display text-[clamp(34px,4vw,56px)] text-[var(--color-ink)] leading-[0.95] tracking-[-0.025em]">
                {p.value}
              </span>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink)] mt-2">
                {p.label}
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] mt-1">
                {p.sub}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
