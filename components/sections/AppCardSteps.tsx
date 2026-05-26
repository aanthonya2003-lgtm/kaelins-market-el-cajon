'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, SCROLL_TOGGLE } from '@/lib/motion';

const STEPS = [
  {
    n: '01',
    title: 'Sign up',
    body:
      'Free at the register — takes 30 seconds. Or sign up online before your next visit. Just give us your phone number and your name.',
    note: 'Your phone is your card. No plastic to lose.',
  },
  {
    n: '02',
    title: 'Scan at checkout',
    body:
      'Tell the cashier your phone number, or scan the AppCard barcode in the app. Points add up automatically on every visit.',
    note: 'Works on every transaction, every department.',
  },
  {
    n: '03',
    title: 'Unlock rewards',
    body:
      'Members-only coupons drop into your account. Get sale alerts on items you buy regularly. Redeem points for discounts at the register.',
    note: "We'll never email you unless you opt in.",
  },
];

export function AppCardSteps() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-step]', {
        opacity: 0,
        y: 32,
        duration: motion.duration.cinematic,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
      gsap.from('[data-step-line]', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: motion.duration.epic,
        ease: 'expo.inOut',
        stagger: 0.2,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 60%',
          toggleActions: SCROLL_TOGGLE,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-section="How It Works"
      className="relative bg-[var(--color-cream)] py-[var(--section-y)] px-gutter overflow-hidden"
    >
      <div className="container-max">
        <div className="mb-16 lg:mb-20">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
            Cómo funciona / How it works
          </p>
          <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink)] max-w-[20ch]">
            Three steps. <em className="italic text-[var(--color-saffron)]">No fine print.</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((s, i) => (
            <div key={s.n} data-step className="relative">
              {/* Number + line */}
              <div className="flex items-center gap-6 mb-8">
                <span className="font-display text-[clamp(48px,5vw,72px)] leading-none text-[var(--color-chile)]">
                  {s.n}
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    data-step-line
                    aria-hidden
                    className="hidden lg:block flex-1 h-px bg-[var(--color-ink)]/15"
                  />
                )}
              </div>

              <h3 className="font-display text-[clamp(24px,2.4vw,36px)] leading-[1.1] text-[var(--color-ink)]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-[36ch] text-[var(--color-ink)] text-[clamp(15px,1.2vw,17px)] leading-[1.55] font-display-body">
                {s.body}
              </p>
              <p className="mt-4 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)]">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
