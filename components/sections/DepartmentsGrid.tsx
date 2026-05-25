'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import type { Department } from '@/types';

const DEPARTMENTS: Department[] = [
  {
    en: 'Tortillería',
    es: 'Tortillería',
    desc: 'Made by hand. All day, every day.',
    imgSrc: 'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=1600&q=85&auto=format&fit=crop',
    cultural: 'mexican',
    inStock: true,
  },
  {
    en: 'Carnicería',
    es: 'Carnicería',
    ar: 'لحوم',
    desc: 'Largest butcher in El Cajon. Mexican cuts + halal selection.',
    imgSrc: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=85&auto=format&fit=crop',
    cultural: 'shared',
    inStock: true,
  },
  {
    en: 'Panadería',
    es: 'Panadería',
    ar: 'مخبز',
    desc: 'Conchas, pan dulce, khubz arabi. Baked fresh daily.',
    imgSrc: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?w=1600&q=85&auto=format&fit=crop',
    cultural: 'shared',
    inStock: true,
  },
  {
    en: 'Produce & Dairy',
    es: 'Frutas y Verduras',
    ar: 'خضار',
    desc: 'Local · seasonal · stacked high · priced for the neighborhood.',
    imgSrc: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=85&auto=format&fit=crop',
    cultural: 'shared',
    inStock: true,
  },
  {
    en: 'Hot Foods',
    es: 'Comida Caliente',
    ar: 'المطبخ',
    desc: 'Carnitas · barbacoa · shawarma · rotisserie chicken.',
    imgSrc: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=85&auto=format&fit=crop',
    cultural: 'shared',
    inStock: true,
  },
  {
    en: 'Dulcería',
    es: 'Dulcería',
    desc: 'Piñatas. Mexican candy. Arabic sweets. Quinceañera essentials.',
    imgSrc: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=1600&q=85&auto=format&fit=crop',
    cultural: 'mexican',
    inStock: true,
  },
];

export function DepartmentsGrid() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-dept]', {
        opacity: 0,
        y: 40,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: motion.stagger.std,
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
      data-section="Departments"
      className="relative bg-[var(--color-cream)] py-[var(--section-y)]"
    >
      <div className="container-max px-gutter mb-12 lg:mb-16">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
          Departamentos / <span dir="rtl" className="font-arabic text-[var(--color-maqam)]">الأقسام</span>
        </p>
        <h2 className="font-display text-[clamp(40px,7vw,112px)] leading-[0.92] tracking-[-0.025em] text-[var(--color-ink)] max-w-[18ch]">
          Two cultures. <em className="italic text-[var(--color-saffron)]">One mercado.</em>
        </h2>
      </div>

      <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {DEPARTMENTS.map((d) => (
          <Link
            key={d.en}
            data-dept
            href={`/departments#${d.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="relative aspect-[5/6] overflow-hidden group border-r border-b border-[var(--color-line)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.imgSrc}
              alt={d.en}
              className="w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/0 to-transparent" />

            {/* In-stock dot (scoped --color-fresh usage #2 per Edit 3) */}
            {d.inStock && (
              <span
                className="absolute top-5 left-5 inline-flex items-center gap-2"
                aria-label="In stock today"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-fresh)] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-cream)]/90">
                  In stock
                </span>
              </span>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 flex justify-between items-end text-[var(--color-cream)]">
              <div className="max-w-[80%]">
                <h3 className="font-display text-[clamp(26px,3vw,44px)] leading-[1]">{d.es}</h3>
                <p className="text-[var(--color-cream)]/75 text-[13px] lg:text-sm mt-2 leading-[1.45]">
                  {d.desc}
                </p>
              </div>
              {d.ar && (
                <span
                  dir="rtl"
                  className="font-arabic text-[clamp(20px,2.4vw,32px)] text-[var(--color-maqam)] flex-shrink-0"
                >
                  {d.ar}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
