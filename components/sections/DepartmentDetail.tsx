'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';
import type { DepartmentDetailData } from '@/lib/department-data';

interface Props {
  department: DepartmentDetailData;
  index: number;
}

export function DepartmentDetail({ department, index }: Props) {
  const root = useRef<HTMLElement>(null);
  const isAlt = index % 2 === 1; // alternate left/right layouts
  const arabicAccent = department.cultural === 'arabic' || department.ar;

  useGSAP(
    () => {
      gsap.from('[data-dept-text]', {
        opacity: 0,
        y: 24,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
      gsap.fromTo(
        '[data-dept-image]',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: motion.duration.epic,
          ease: 'expo.inOut',
          stagger: 0.1,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 65%',
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
      id={department.slug}
      data-section={department.en}
      data-dept-slug={department.slug}
      className={`relative py-[var(--section-y)] px-gutter overflow-hidden ${
        index % 2 === 0 ? 'bg-[var(--color-cream)]' : 'bg-[var(--color-paper)]'
      }`}
    >
      <div className="container-max grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Text column */}
        <div className={`lg:col-span-5 ${isAlt ? 'lg:order-2' : ''}`}>
          <p data-dept-text className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
            {String(index + 1).padStart(2, '0')} / 0{DEPARTMENT_COUNT}
          </p>

          <h2
            data-dept-text
            className={`font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink)] ${
              arabicAccent ? '' : ''
            }`}
          >
            {department.es}
          </h2>
          {department.ar && (
            <p
              data-dept-text
              dir="rtl"
              className="font-arabic text-[clamp(28px,3vw,44px)] text-[var(--color-maqam)] mt-2"
            >
              {department.ar}
            </p>
          )}

          <p data-dept-text className="font-mono text-[12px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] mt-6">
            {department.descShort}
          </p>

          <div data-dept-text className="mt-8 space-y-4 max-w-[52ch]">
            {department.descLong.map((p, i) => (
              <p key={i} className="font-display-body text-[var(--color-ink)] text-[clamp(16px,1.3vw,19px)] leading-[1.6]">
                {p}
              </p>
            ))}
          </div>

          {/* Highlights */}
          <div data-dept-text className="mt-10">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)] mb-4">
              What we&rsquo;re known for
            </p>
            <ul className="space-y-2.5">
              {department.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-[15px] text-[var(--color-ink)]">
                  <span
                    aria-hidden
                    className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      arabicAccent ? 'bg-[var(--color-maqam)]' : 'bg-[var(--color-chile)]'
                    }`}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Badges */}
          {(department.hasHalal || department.hasMadeToOrder) && (
            <div data-dept-text className="mt-8 flex flex-wrap gap-2">
              {department.hasMadeToOrder && (
                <span className="inline-flex items-center gap-2 bg-[var(--color-fresh)]/0 border border-[var(--color-ink)]/20 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink)]">
                  Made to order
                </span>
              )}
              {department.hasHalal && (
                <span className="inline-flex items-center gap-2 bg-[var(--color-olive)] text-[var(--color-cream)] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase">
                  Halal selection
                </span>
              )}
            </div>
          )}

          {/* CTAs */}
          <div data-dept-text className="mt-10 flex flex-wrap gap-3">
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="inline-flex items-center gap-3 bg-[var(--color-ink)] text-[var(--color-cream)] px-6 py-3.5 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-chile)] transition-colors duration-300"
            >
              Call {BUSINESS.phone}
            </a>
            <a
              href={BUSINESS.urls.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-[var(--color-ink)]/30 text-[var(--color-ink)] px-6 py-3.5 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors duration-300"
            >
              Visit in store →
            </a>
          </div>

          {/* Source citations */}
          {department.sourceClaims && department.sourceClaims.length > 0 && (
            <div data-dept-text className="mt-10 pt-6 border-t border-[var(--color-line)]">
              {department.sourceClaims.map((claim, i) => (
                <p key={i} className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-soft)] italic mb-2">
                  &ldquo;{claim.text}&rdquo; <span className="not-italic ml-2 opacity-70">— {claim.source}</span>
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Image column */}
        <div className={`lg:col-span-7 ${isAlt ? 'lg:order-1' : ''}`}>
          <div className="grid grid-cols-2 gap-2">
            {department.images.slice(0, 3).map((img, i) => (
              <div
                key={i}
                data-dept-image
                className={`relative overflow-hidden bg-[var(--color-ink)] ${
                  i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const DEPARTMENT_COUNT = 7;
