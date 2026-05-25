'use client';

import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useSWR from 'swr';
import Link from 'next/link';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';
import type { WeeklyAdPost } from '@/lib/parse-rss';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function WeeklyAdEmbed() {
  const root = useRef<HTMLElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const { data, error, isLoading } = useSWR<{ posts: WeeklyAdPost[]; ok: boolean }>('/api/weekly-ad', fetcher, {
    refreshInterval: 43_200_000, // 12h
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if ((data && (!data.ok || data.posts.length === 0)) || error) {
      setShowFallback(true);
    }
  }, [data, error]);

  useGSAP(
    () => {
      gsap.from('[data-ad-item]', {
        opacity: 0,
        y: 30,
        duration: motion.duration.standard,
        ease: 'expo.out',
        stagger: motion.stagger.std,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
    },
    { scope: root, dependencies: [data] }
  );

  return (
    <section
      ref={root}
      data-section="Weekly Ad"
      className="relative bg-[var(--color-cream)] py-[var(--section-y)] overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -top-4 right-4 text-[24vw]">
        OFERTAS
      </span>

      <div className="container-max px-gutter relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
              This week · Esta semana
            </p>
            <h2 className="font-display text-[clamp(40px,7vw,112px)] leading-[0.92] tracking-[-0.025em] text-[var(--color-ink)] max-w-[16ch]">
              The weekly ad. <em className="italic text-[var(--color-saffron)]">Always live.</em>
            </h2>
          </div>
          <Link
            href="/weekly-ad"
            className="inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.16em] uppercase text-[var(--color-ink)] hover:text-[var(--color-chile)] transition-colors duration-300 self-start"
          >
            See full ad <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-[var(--color-ink)]/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* RSS posts grid */}
        {!isLoading && data?.ok && data.posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.posts.slice(0, 3).map((post) => (
              <a
                key={post.guid}
                data-ad-item
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-[4/5] block overflow-hidden bg-[var(--color-ink)]"
              >
                {post.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-chile)] to-[var(--color-mole)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-saffron)] mb-2">
                    {post.pubDate ? new Date(post.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'New'}
                  </p>
                  <h3 className="font-display text-[var(--color-cream)] text-[clamp(20px,2.4vw,30px)] leading-[1.05]">
                    {post.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Fisher Printing fallback */}
        {showFallback && (
          <div data-ad-item>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-soft)] mb-4">
              Live preview · Fisher Printing fallback
            </p>
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--color-line)]">
              <iframe
                src={BUSINESS.urls.fisherPrintingFallback}
                title="Kaelin's Market Weekly Ad"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
