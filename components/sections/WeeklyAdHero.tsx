'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';
import type { WeeklyAdPost } from '@/lib/parse-rss';

interface Props {
  featured: WeeklyAdPost | null;
  totalPosts: number;
}

/**
 * Returns the next Tuesday at 6:00 AM local time (when weekly ad refreshes).
 */
function nextTuesday6am(): Date {
  const now = new Date();
  const target = new Date(now);
  const dow = now.getDay(); // 0 Sun ... 2 Tue
  let daysUntilTue = (2 - dow + 7) % 7;
  // If it's Tuesday but past 6am, push to next week
  if (daysUntilTue === 0 && now.getHours() >= 6) daysUntilTue = 7;
  target.setDate(now.getDate() + daysUntilTue);
  target.setHours(6, 0, 0, 0);
  return target;
}

function formatCountdown(ms: number) {
  if (ms <= 0) return { d: '00', h: '00', m: '00' };
  const totalMinutes = Math.floor(ms / 60000);
  const d = Math.floor(totalMinutes / (60 * 24));
  const h = Math.floor((totalMinutes % (60 * 24)) / 60);
  const m = totalMinutes % 60;
  return {
    d: String(d).padStart(2, '0'),
    h: String(h).padStart(2, '0'),
    m: String(m).padStart(2, '0'),
  };
}

export function WeeklyAdHero({ featured, totalPosts }: Props) {
  const root = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [countdown, setCountdown] = useState(() => formatCountdown(nextTuesday6am().getTime() - Date.now()));

  useEffect(() => {
    const tick = () => setCountdown(formatCountdown(nextTuesday6am().getTime() - Date.now()));
    const id = setInterval(tick, 60_000); // update each minute
    return () => clearInterval(id);
  }, []);

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
      gsap.from('[data-hero-sub]', {
        opacity: 0,
        y: 20,
        duration: motion.duration.standard,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.6,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="Weekly Ad"
      className="relative min-h-[80vh] bg-[var(--color-cream)] pt-[120px] pb-[clamp(80px,12vh,160px)] px-gutter overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -top-4 -right-6 text-[32vw]">
        OFERTAS
      </span>

      <div className="container-max relative z-10">
        <p data-hero-sub className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--color-chile)] mb-6">
          This week / Esta semana
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[var(--color-ink)] text-[clamp(48px,10vw,160px)] leading-[0.92] tracking-[-0.03em] max-w-[16ch]"
        >
          The weekly ad. <em className="italic text-[var(--color-saffron)]">Always live.</em>
        </h1>

        <div data-hero-sub className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="text-[var(--color-ink-soft)] text-[clamp(17px,1.5vw,22px)] leading-[1.55] max-w-[52ch]">
              Pulled live from our weekly ad feed. Refreshed every Tuesday at 6&nbsp;AM —
              {totalPosts > 0
                ? ` showing ${totalPosts} of the most recent ads below.`
                : ' new ad drops shortly.'}
            </p>
            {featured?.title && (
              <div data-hero-sub className="mt-8 flex items-center gap-4 flex-wrap">
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[var(--color-chile)] text-[var(--color-cream)] px-6 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-ink)] transition-colors duration-300"
                >
                  View latest ad →
                </a>
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  className="inline-flex items-center gap-3 border border-[var(--color-ink)]/30 text-[var(--color-ink)] px-6 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors duration-300"
                >
                  Call {BUSINESS.phone}
                </a>
              </div>
            )}
          </div>

          {/* Countdown ribbon */}
          <div data-hero-sub className="lg:col-span-5 bg-[var(--color-ink)] text-[var(--color-cream)] p-7 lg:p-9">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-saffron)] mb-4">
              Next ad drops in
            </p>
            <div className="flex items-end gap-4 tabular-nums">
              <div>
                <span className="font-display text-[clamp(40px,5vw,72px)] leading-none">{countdown.d}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase ml-1 opacity-70">d</span>
              </div>
              <span className="font-display text-[clamp(40px,5vw,72px)] leading-none opacity-40">:</span>
              <div>
                <span className="font-display text-[clamp(40px,5vw,72px)] leading-none">{countdown.h}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase ml-1 opacity-70">h</span>
              </div>
              <span className="font-display text-[clamp(40px,5vw,72px)] leading-none opacity-40">:</span>
              <div>
                <span className="font-display text-[clamp(40px,5vw,72px)] leading-none">{countdown.m}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase ml-1 opacity-70">m</span>
              </div>
            </div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-cream)]/50 mt-6">
              Tuesdays · 6:00 AM · Pacific
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
