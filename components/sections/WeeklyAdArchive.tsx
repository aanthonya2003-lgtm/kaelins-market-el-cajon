'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { Lightbox } from './Lightbox';
import type { WeeklyAdPost } from '@/lib/parse-rss';

interface Props {
  posts: WeeklyAdPost[];
}

export function WeeklyAdArchive({ posts }: Props) {
  const root = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? posts[activeIdx] : null;

  useGSAP(
    () => {
      gsap.from('[data-archive-item]', {
        opacity: 0,
        y: 32,
        duration: motion.duration.standard,
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
    <>
      <section
        ref={root}
        data-section="Archive"
        className="relative bg-[var(--color-paper)] py-[var(--section-y)] overflow-hidden"
      >
        <div className="container-max px-gutter">
          <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
                Recent weeks / Semanas pasadas
              </p>
              <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink)] max-w-[20ch]">
                <em className="italic text-[var(--color-saffron)]">Missed</em> last week&rsquo;s deals?
              </h2>
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)]">
              {posts.length} {posts.length === 1 ? 'archived ad' : 'archived ads'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {posts.map((post, i) => {
              const hasImage = !!post.imageUrl;
              const commonClass =
                'group relative aspect-[3/4] block overflow-hidden bg-[var(--color-ink)]';
              const dateLabel = post.pubDate
                ? new Date(post.pubDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : null;

              if (hasImage) {
                return (
                  <button
                    key={post.guid}
                    type="button"
                    data-archive-item
                    onClick={() => setActiveIdx(i)}
                    className={`${commonClass} text-left cursor-zoom-in`}
                    aria-label={`Open weekly ad image — ${dateLabel ?? post.title}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageUrl!}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                      {dateLabel && (
                        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-saffron)] mb-2">
                          {dateLabel}
                        </p>
                      )}
                      <h3 className="font-display text-[var(--color-cream)] text-[clamp(18px,1.8vw,24px)] leading-[1.1]">
                        {post.title}
                      </h3>
                    </div>
                  </button>
                );
              }

              // Fallback: no image — gradient card linking to WordPress post in new tab
              return (
                <a
                  key={post.guid}
                  data-archive-item
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className={commonClass}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-mole)] via-[var(--color-chile)] to-[var(--color-ink)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    {dateLabel && (
                      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-saffron)] mb-2">
                        {dateLabel}
                      </p>
                    )}
                    <h3 className="font-display text-[var(--color-cream)] text-[clamp(18px,1.8vw,24px)] leading-[1.1]">
                      {post.title}
                    </h3>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Lightbox
        src={active?.imageUrl ?? null}
        alt={active?.title ?? 'Weekly ad'}
        caption={
          active?.pubDate
            ? new Date(active.pubDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : undefined
        }
        postLink={active?.link}
        onClose={() => setActiveIdx(null)}
      />
    </>
  );
}
