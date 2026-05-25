'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';

export function HeritageBlock() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-heritage-text]', {
        opacity: 0,
        y: 32,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
      gsap.fromTo(
        '[data-heritage-img]',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: motion.duration.epic,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 60%',
            toggleActions: SCROLL_TOGGLE,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="Heritage"
      className="relative bg-[var(--color-ink)] text-[var(--color-cream)] overflow-hidden py-[clamp(120px,18vh,240px)]"
    >
      <span
        aria-hidden
        className="absolute -top-8 -left-4 font-display text-[36vw] leading-none text-[var(--color-cream)]/[0.045] select-none pointer-events-none"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
      >
        {BUSINESS.founded}
      </span>

      <div className="relative container-max px-gutter grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-7">
          <p data-heritage-text className="font-mono text-[var(--color-saffron)] text-[11px] tracking-[0.22em] uppercase mb-8">
            Est. {BUSINESS.founded} · El Cajon, California
          </p>
          <h2
            data-heritage-text
            className="font-display text-[clamp(44px,8vw,140px)] leading-[0.9] tracking-[-0.03em]"
          >
            The first <em className="italic text-[var(--color-saffron)]">supermercado</em> El Cajon ever had.
          </h2>
          <p
            data-heritage-text
            className="mt-10 max-w-[54ch] text-[var(--color-cream)]/75 text-[clamp(17px,1.4vw,22px)] leading-[1.55] font-display-body"
          >
            Three generations. One family. Zero corporate ownership. We were stocking handmade tortillas
            and Arabic olive oil before either was trendy &mdash; and we&rsquo;ll be doing it long after.
          </p>
          <p data-heritage-text className="mt-6 text-[var(--color-cream)]/55 text-[14px] font-mono tracking-[0.06em]">
            Originally opened as <em>Kaelin&rsquo;s Valley Center</em>.
          </p>
        </div>

        <div data-heritage-img className="lg:col-span-5 relative aspect-[3/4] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=85&auto=format&fit=crop"
            alt="Kaelin's Market produce section"
            className="w-full h-full object-cover sepia-[0.15] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-[var(--color-ink)]/15 mix-blend-multiply" />
        </div>
      </div>
    </section>
  );
}
