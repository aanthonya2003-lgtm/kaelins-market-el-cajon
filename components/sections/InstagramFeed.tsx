'use client';

import useSWR from 'swr';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { INSTAGRAM_VERIFIED } from '@/lib/feature-flags';
import type { InstagramPost } from '@/types';

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export function InstagramFeed() {
  const root = useRef<HTMLElement>(null);
  const { data } = useSWR<{ posts: InstagramPost[]; blocked: boolean }>(
    '/api/instagram-feed',
    fetcher,
    { refreshInterval: 3_600_000 } // 1h
  );

  useGSAP(
    () => {
      gsap.from('[data-ig]', {
        opacity: 0,
        y: 24,
        duration: motion.duration.standard,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
    },
    { scope: root, dependencies: [data] }
  );

  const posts = data?.posts ?? [];
  const empty = !INSTAGRAM_VERIFIED || data?.blocked || posts.length === 0;

  return (
    <section
      ref={root}
      data-section="Instagram"
      className="relative bg-[var(--color-ink)] text-[var(--color-cream)] py-[var(--section-y)] px-gutter overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -top-6 -left-4 text-[20vw] text-[var(--color-cream)] opacity-[0.05]">
        Hoy
      </span>

      <div className="container-max relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-14">
          <h2 className="font-display text-[clamp(36px,6vw,96px)] leading-[0.92] tracking-[-0.025em]">
            <em className="italic text-[var(--color-saffron)]">Hoy</em> en el mercado
          </h2>
          <a
            href={INSTAGRAM_VERIFIED ? 'https://instagram.com/kaelinsmarket' : '#'}
            target={INSTAGRAM_VERIFIED ? '_blank' : undefined}
            rel="noreferrer"
            className="font-mono text-[var(--color-saffron)] text-[12px] tracking-[0.2em] uppercase hover:underline underline-offset-4 self-start md:self-end"
          >
            {INSTAGRAM_VERIFIED ? '@kaelinsmarket ↗' : '@kaelinsmarket — verifying'}
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
          {(empty ? Array(6).fill(null) : posts.slice(0, 6)).map((p: InstagramPost | null, i: number) => (
            <a
              key={p?.id ?? `placeholder-${i}`}
              data-ig
              href={p?.permalink ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square block overflow-hidden bg-[var(--color-cream)]/[0.06]"
            >
              {p ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.thumbnail_url ?? p.media_url}
                  alt={p.caption?.slice(0, 80) ?? `Kaelin's Market Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-ink)] via-[var(--color-cream)]/5 to-[var(--color-ink)] animate-pulse" />
              )}
            </a>
          ))}
        </div>

        {empty && (
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-cream)]/40 mt-6">
            ⚠︎ Live feed unlocks once Instagram handle is confirmed and access token is added.
          </p>
        )}
      </div>
    </section>
  );
}
