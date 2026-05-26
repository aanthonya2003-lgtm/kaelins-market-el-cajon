'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion } from '@/lib/motion';

export function DepartmentsPageHero() {
  const root = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;
      const split = new SplitType(headlineRef.current, { types: 'words,chars' });
      gsap.set(split.chars, { opacity: 0, y: 40, rotateX: -20, transformPerspective: 1000 });
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: motion.duration.epic,
        ease: 'expo.out',
        stagger: motion.stagger.hero,
        delay: 0.2,
      });
      gsap.from('[data-dept-hero-sub]', {
        opacity: 0,
        y: 16,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.12,
        delay: 0.7,
      });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="Departments Hero"
      className="relative bg-[var(--color-cream)] pt-[140px] pb-[clamp(80px,14vh,160px)] px-gutter overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -top-12 -right-8 text-[36vw]">
        Mercado
      </span>

      <div className="container-max relative z-10">
        <p data-dept-hero-sub className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--color-chile)] mb-6">
          Departamentos /{' '}
          <span dir="rtl" className="font-arabic text-[var(--color-maqam)]">
            {'\u0627\u0644\u0623\u0642\u0633\u0627\u0645'}
          </span>
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[var(--color-ink)] text-[clamp(48px,10vw,160px)] leading-[0.92] tracking-[-0.03em] max-w-[16ch]"
        >
          Two cultures. <em className="italic text-[var(--color-saffron)]">One mercado.</em>
        </h1>

        <p data-dept-hero-sub className="mt-10 max-w-[58ch] text-[var(--color-ink-soft)] text-[clamp(17px,1.5vw,22px)] leading-[1.55] font-display-body">
          Seven departments, two cuisines, three generations of one family.
          Tortillas pressed by hand. Halal cuts kept distinct. Conchas in the morning,
          khubz in the afternoon. Welcome.
        </p>
      </div>
    </section>
  );
}
