'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion as fmotion } from 'framer-motion';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;
      const split = new SplitType(headlineRef.current, { types: 'words,chars' });

      gsap.set(split.chars, { opacity: 0, y: 60, rotateX: -30, transformPerspective: 1000 });

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: motion.duration.epic,
        ease: 'expo.out',
        stagger: motion.stagger.hero,
        delay: 0.4,
      });

      // Sub elements fade in
      gsap.from('[data-hero-sub]', {
        opacity: 0,
        y: 24,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.15,
        delay: 1.2,
      });

      // Parallax on scroll out
      gsap.to('[data-hero-content]', {
        yPercent: -12,
        opacity: 0.4,
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          toggleActions: SCROLL_TOGGLE,
        },
      });

      return () => {
        split.revert();
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="Hero"
      className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-[var(--color-ink)]"
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-[-5%] animate-kenburns">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, oklch(0.215 0.012 60 / 0.55) 0%, oklch(0.215 0.012 60 / 0.35) 40%, oklch(0.215 0.012 60 / 0.85) 100%), url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=2400&q=90&auto=format&fit=crop')",
          }}
        />
      </div>

      {/* Ghost watermark */}
      <span aria-hidden className="ghost-watermark absolute -bottom-12 -left-6 text-[40vw] text-[var(--color-cream)] opacity-[0.06] z-0">
        {BUSINESS.founded}
      </span>

      {/* Content */}
      <div data-hero-content className="relative z-10 h-full container-max px-gutter flex flex-col justify-end pb-[clamp(80px,12vh,160px)]">
        <p
          data-hero-sub
          className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--color-saffron)] mb-6"
        >
          EST. {BUSINESS.founded} · El Cajon, California
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[var(--color-cream)] text-[clamp(48px,11vw,180px)] leading-[0.9] tracking-[-0.03em] max-w-[14ch]"
        >
          El Cajon&rsquo;s <em className="italic text-[var(--color-saffron)]">original</em> mercado.
        </h1>

        <div data-hero-sub className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between max-w-5xl">
          <p className="max-w-[44ch] text-[var(--color-cream)]/80 text-[clamp(16px,1.4vw,22px)] leading-[1.5]">
            Mexican &amp; Arabic groceries. Handmade tortillas. Fresh salsa.
            The largest butcher shop in town — family-owned three generations.
          </p>
          <div className="flex gap-3">
            <a
              href="/weekly-ad"
              className="inline-flex items-center gap-3 bg-[var(--color-chile)] text-[var(--color-cream)] px-6 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)] transition-colors duration-300"
            >
              This Week&rsquo;s Ad →
            </a>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="inline-flex items-center gap-3 border border-[var(--color-cream)]/40 text-[var(--color-cream)] px-6 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)] transition-colors duration-300"
            >
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <fmotion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2, duration: 1 },
          y: { delay: 2.5, duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-cream)]/60">
          Scroll
        </span>
        <span className="block w-px h-10 bg-[var(--color-cream)]/40" />
      </fmotion.div>
    </section>
  );
}
