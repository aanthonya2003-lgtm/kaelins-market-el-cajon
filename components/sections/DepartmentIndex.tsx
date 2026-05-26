'use client';

import { useEffect, useRef, useState } from 'react';
import type { DepartmentDetailData } from '@/lib/department-data';

interface Props {
  departments: DepartmentDetailData[];
}

/**
 * Sticky horizontal anchor nav. Tracks active section via IntersectionObserver.
 * Bidirectional — highlights update on scroll up + scroll down.
 */
export function DepartmentIndex({ departments }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(departments[0]?.slug ?? null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const slug = (visible[0].target as HTMLElement).dataset.deptSlug;
          if (slug) setActiveSlug(slug);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75] }
    );

    const els = document.querySelectorAll<HTMLElement>('[data-dept-slug]');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [departments]);

  // Auto-scroll active pill into view in nav
  useEffect(() => {
    if (!navRef.current || !activeSlug) return;
    const target = navRef.current.querySelector<HTMLAnchorElement>(`a[href="#${activeSlug}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeSlug]);

  return (
    <nav
      aria-label="Departments"
      className="sticky top-[72px] z-30 bg-[var(--color-cream)]/95 backdrop-blur-xl border-y border-[var(--color-line)]"
    >
      <div
        ref={navRef}
        className="container-max px-gutter overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        <ul className="flex gap-1 py-3 min-w-max">
          {departments.map((d) => {
            const isActive = activeSlug === d.slug;
            return (
              <li key={d.slug}>
                <a
                  href={`#${d.slug}`}
                  className={`inline-flex items-center px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                    isActive
                      ? 'bg-[var(--color-ink)] text-[var(--color-cream)]'
                      : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {d.es}
                  {d.ar && (
                    <span dir="rtl" className={`font-arabic ml-2 ${isActive ? 'text-[var(--color-saffron)]' : 'text-[var(--color-maqam)]'}`}>
                      {d.ar}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
