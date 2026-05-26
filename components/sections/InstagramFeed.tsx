'use client';

import useSWR from 'swr';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { INSTAGRAM_VERIFIED } from '@/lib/feature-flags';
import type { InstagramPost } from '@/types';

const fetcher = (u: string) => fetch(u).then((r) => r.json());

/**
 * InstagramFeed — LIVE-OR-INVISIBLE.
 *
 * Rule (per Anthony, post-sprint Fix 1): the feature flag must mean
 * INVISIBLE, not visible-but-grayed. This component returns null in every
 * case where the live feed cannot render real posts:
 *   - INSTAGRAM_VERIFIED feature flag is false (build-time intent)
 *   - data.blocked is true (runtime — token missing or API errored)
 *   - data has loaded but contains zero posts
 *
 * The hook order is preserved because INSTAGRAM_VERIFIED is a module-level
 * constant: if it's false, this component always returns null before any
 * hooks fire — which is consistent across all renders.
 */
export function InstagramFeed() {
  // Build-time short-circuit — component is invisible until handle is verified
  if (!INSTAGRAM_VERIFIED) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const root = useRef<HTMLElement>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSWR<{ posts: InstagramPost[]; blocked: boolean }>(
    '/api/instagram-feed',
    fetcher,
    { refreshInterval: 3_600_000 }
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  // Runtime checks: hide entirely if blocked or empty
  if (data?.blocked) return null;
  if (data !== undefined && data.posts.length === 0) return null;

  const posts = data?.posts ?? [];

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
            href="https://instagram.com/kaelinsmarket"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[var(--color-saffron)] text-[12px] tracking-[0.2em] uppercase hover:underline underline-offset-4 self-start md:self-end"
          >
            @kaelinsmarket ↗
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
          {posts.slice(0, 6).map((p) => (
            <a
              key={p.id}
              data-ig
              href={p.permalink}
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square block overflow-hidden bg-[var(--color-cream)]/[0.06]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.thumbnail_url ?? p.media_url}
                alt={p.caption?.slice(0, 80) ?? 'Instagram post'}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
