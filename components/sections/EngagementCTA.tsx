'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';
import { EMAIL_VERIFIED, SMS_KEYWORD } from '@/lib/feature-flags';

/**
 * EngagementCTA — merged from Steal #3 (Northgate newsletter) + Steal #9 (Superior SMS).
 * Per Edit 4: ONE section, both paths, no redundancy.
 * Primary state = SMS (works day 1 because phone is verified).
 * When EMAIL_VERIFIED flips true, the email form slides in ABOVE the SMS CTA as an
 * additional option, not a replacement.
 */
export function EngagementCTA() {
  const root = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from('[data-cta-item]', {
        opacity: 0,
        y: 24,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
    },
    { scope: root }
  );

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_VERIFIED) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      // soft fail — user can still SMS
    }
  };

  return (
    <section
      ref={root}
      data-section="Engage"
      className="relative bg-[var(--color-chile)] text-[var(--color-cream)] py-[var(--section-y)] px-gutter overflow-hidden"
    >
      <span aria-hidden className="ghost-watermark absolute -top-6 -right-8 text-[24vw] text-[var(--color-cream)] opacity-[0.06]">
        Familia
      </span>

      <div className="container-max relative z-10 max-w-[820px] mx-auto text-center">
        <p data-cta-item className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-saffron)] mb-4">
          La Familia Kaelin&rsquo;s
        </p>
        <h2
          data-cta-item
          className="font-display text-[clamp(36px,6vw,80px)] leading-[0.95] tracking-[-0.025em]"
        >
          Weekly deals. Recipes. <em className="italic">24 horas antes.</em>
        </h2>

        {/* Email form — only when verified (Edit 4: slides in above SMS) */}
        {EMAIL_VERIFIED && !submitted && (
          <form
            data-cta-item
            onSubmit={handleEmailSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-2 max-w-[520px] mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 bg-[var(--color-cream)]/95 text-[var(--color-ink)] px-5 py-4 font-mono text-sm tracking-[0.04em] outline-none focus:bg-[var(--color-cream)] min-h-[48px]"
            />
            <button
              type="submit"
              className="bg-[var(--color-ink)] text-[var(--color-cream)] px-7 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-saffron)] hover:text-[var(--color-ink)] transition-colors duration-300 min-h-[48px]"
            >
              Subscribe
            </button>
          </form>
        )}

        {EMAIL_VERIFIED && submitted && (
          <p data-cta-item className="mt-10 font-display text-[clamp(22px,2vw,32px)] text-[var(--color-saffron)]">
            ¡Bienvenido a la familia! Check your inbox — first email within 24h.
          </p>
        )}

        {/* Divider between email + SMS (only when both visible) */}
        {EMAIL_VERIFIED && (
          <p data-cta-item className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-cream)]/50 my-8">
            or, no email needed —
          </p>
        )}

        {/* SMS (always live — day 1) */}
        {!EMAIL_VERIFIED && (
          <p data-cta-item className="mt-8 text-[var(--color-cream)]/80 max-w-[44ch] mx-auto text-[clamp(16px,1.3vw,20px)]">
            No app. No download. Just text.
          </p>
        )}
        <a
          data-cta-item
          href={`sms:${BUSINESS.phoneE164}?&body=${SMS_KEYWORD}`}
          className="mt-8 inline-flex items-center gap-3 bg-[var(--color-ink)] text-[var(--color-cream)] px-8 py-5 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-saffron)] hover:text-[var(--color-ink)] transition-colors duration-300"
        >
          Text &ldquo;{SMS_KEYWORD}&rdquo; to {BUSINESS.phone} →
        </a>
        <p data-cta-item className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-cream)]/60 mt-4">
          Standard message rates apply
        </p>
      </div>
    </section>
  );
}
