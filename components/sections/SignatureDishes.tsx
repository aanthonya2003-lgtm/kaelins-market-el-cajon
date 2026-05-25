'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import type { SignatureDish } from '@/types';

const DISHES: SignatureDish[] = [
  {
    name: 'Tortillas a Mano',
    sub: 'Hechas frescas todo el día',
    imgSrc: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=1600&q=85&auto=format&fit=crop',
    cultural: 'mexican',
    freshToday: true,
  },
  {
    name: 'Salsa Fresca',
    sub: 'Molcajete · Roja · Verde',
    imgSrc: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=1600&q=85&auto=format&fit=crop',
    cultural: 'mexican',
    freshToday: true,
  },
  {
    name: 'Carnitas Caseras',
    sub: 'Plato del día · Hot foods counter',
    imgSrc: 'https://images.unsplash.com/photo-1564767655658-4e6b365884ff?w=1600&q=85&auto=format&fit=crop',
    cultural: 'mexican',
    freshToday: true,
  },
  {
    name: 'Tabouleh',
    sub: 'Arabic deli · Made daily',
    imgSrc: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&q=85&auto=format&fit=crop',
    cultural: 'arabic',
    freshToday: true,
  },
  {
    name: 'Pan Dulce',
    sub: 'Panadería · Conchas · Orejas',
    imgSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=85&auto=format&fit=crop',
    cultural: 'mexican',
  },
  {
    name: 'Ceviche de Camarón',
    sub: 'Pescadería · Made-to-order',
    imgSrc: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=85&auto=format&fit=crop',
    cultural: 'mexican',
    freshToday: true,
  },
];

export function SignatureDishes() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-dish]', {
        yPercent: 18,
        opacity: 0,
        rotateZ: -2,
        stagger: motion.stagger.std,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
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
      data-section="Signature Dishes"
      className="relative bg-[var(--color-paper)] py-[var(--section-y)] overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -top-8 right-0 text-[22vw]">
        Sabores
      </span>

      <div className="container-max px-gutter mb-12 lg:mb-16 relative z-10">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mole)] mb-3">
          Made here · Hecho aquí
        </p>
        <h2 className="font-display text-[clamp(40px,7vw,112px)] leading-[0.92] tracking-[-0.025em] text-[var(--color-ink)] max-w-[14ch]">
          Sabores de <em className="italic text-[var(--color-saffron)]">Kaelin&rsquo;s</em>.
        </h2>
      </div>

      <div className="container-max grid grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[var(--color-ink)] relative z-10">
        {DISHES.map((d) => (
          <article
            key={d.name}
            data-dish
            className="relative aspect-[4/5] overflow-hidden group bg-[var(--color-cream)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.imgSrc}
              alt={d.name}
              className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/10 to-transparent" />

            {/* Fresh Today badge (scoped --color-fresh usage #1 per Edit 3) */}
            {d.freshToday && (
              <span className="absolute top-4 right-4 inline-flex items-center gap-2 bg-[var(--color-fresh)] text-[var(--color-ink)] px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)]" />
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase font-medium">
                  Fresh Today
                </span>
              </span>
            )}

            <div className="absolute bottom-0 left-0 p-5 lg:p-7">
              <h3
                className={`font-display text-[var(--color-cream)] text-[clamp(20px,2.4vw,36px)] leading-[1.02] ${
                  d.cultural === 'arabic' ? 'text-[var(--color-olive)]' : ''
                }`}
              >
                {d.name}
              </h3>
              <p
                className={`font-mono text-[10px] tracking-[0.16em] uppercase mt-2 ${
                  d.cultural === 'arabic'
                    ? 'text-[var(--color-maqam)]'
                    : 'text-[var(--color-cream)]/70'
                }`}
              >
                {d.sub}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
