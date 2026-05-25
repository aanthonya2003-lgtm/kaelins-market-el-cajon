'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion as fmotion, AnimatePresence } from 'framer-motion';
import { motion } from '@/lib/motion';
import { BUSINESS } from '@/lib/business-data';

const LINKS = [
  { href: '/departments', label: 'Departments' },
  { href: '/loyalty', label: 'AppCard' },
  { href: '/about', label: 'Since 1958' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <fmotion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: motion.duration.cinematic, ease: motion.ease.out }}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-[var(--color-cream)]/90 backdrop-blur-xl border-b border-[var(--color-line)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max flex items-center justify-between px-gutter h-[72px]">
        <Link
          href="/"
          className="font-display text-2xl text-[var(--color-ink)] tracking-[-0.02em] leading-none"
        >
          Kaelin&rsquo;s<span className="text-[var(--color-chile)]">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            href="/weekly-ad"
            className="group inline-flex items-center gap-2 bg-[var(--color-chile)] text-[var(--color-cream)] px-5 py-2.5 hover:bg-[var(--color-ink)] transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-saffron)] animate-pulse" />
            <span className="font-mono text-[12px] tracking-[0.16em] uppercase">Weekly Ad</span>
          </Link>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[12px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className="font-mono text-[12px] tracking-[0.16em] uppercase text-[var(--color-ink)] hover:text-[var(--color-chile)] transition-colors"
          >
            {BUSINESS.phone}
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`block w-6 h-[1px] bg-[var(--color-ink)] transition-transform duration-300 ${
              open ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1px] bg-[var(--color-ink)] transition-opacity duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1px] bg-[var(--color-ink)] transition-transform duration-300 ${
              open ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <fmotion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: motion.duration.fast, ease: motion.ease.out }}
            className="md:hidden bg-[var(--color-cream)] border-b border-[var(--color-line)]"
          >
            <div className="px-gutter py-6 flex flex-col gap-4">
              <Link
                href="/weekly-ad"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-chile)] text-[var(--color-cream)] px-5 py-3.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-saffron)] animate-pulse" />
                <span className="font-mono text-[12px] tracking-[0.16em] uppercase">Weekly Ad</span>
              </Link>
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm tracking-[0.16em] uppercase text-[var(--color-ink)] py-2"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="font-mono text-sm tracking-[0.16em] uppercase text-[var(--color-chile)] py-2"
              >
                {BUSINESS.phone}
              </a>
            </div>
          </fmotion.div>
        )}
      </AnimatePresence>
    </fmotion.header>
  );
}
