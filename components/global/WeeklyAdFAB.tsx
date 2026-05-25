'use client';

import Link from 'next/link';
import { motion as fmotion } from 'framer-motion';
import { motion } from '@/lib/motion';

function getAdCopy() {
  const day = new Date().getDay(); // 0 Sun ... 1 Mon ... 2 Tue
  if (day === 1) return { line1: 'Nueva oferta', line2: 'Drops tomorrow' };
  return { line1: "This week\u2019s ad", line2: 'Updated Tuesdays' };
}

export function WeeklyAdFAB() {
  const copy = getAdCopy();
  return (
    <fmotion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: motion.duration.standard, ease: motion.ease.out }}
      className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8"
    >
      <Link
        href="/weekly-ad"
        className="group flex items-center gap-3 bg-[var(--color-chile)] text-[var(--color-cream)] px-5 py-4 lg:px-6 lg:py-5 shadow-[0_20px_50px_-12px_oklch(0.45_0.18_30/0.55)] hover:bg-[var(--color-ink)] transition-colors duration-300"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--color-saffron)] animate-pulse" />
        <div className="text-left">
          <p className="font-display text-base lg:text-lg leading-none">{copy.line1}</p>
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-80 mt-1">{copy.line2}</p>
        </div>
        <span aria-hidden className="text-xl transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </fmotion.div>
  );
}
