'use client';

import { useEffect, useState } from 'react';

export function ScrollProgressCounter() {
  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState('Mercado');

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
      setPct(p);

      // Determine current section by data-section attribute
      const sections = document.querySelectorAll<HTMLElement>('[data-section]');
      let current = 'Mercado';
      sections.forEach((s) => {
        const top = s.getBoundingClientRect().top;
        if (top < window.innerHeight / 2) {
          current = s.dataset.section ?? current;
        }
      });
      setLabel(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-[88px] right-[var(--gutter)] z-30 hidden md:flex flex-col items-end gap-0.5 pointer-events-none mix-blend-difference">
      <span className="font-mono text-[11px] tracking-[0.18em] text-white tabular-nums">
        {String(Math.floor(pct)).padStart(2, '0')}%
      </span>
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-saffron)]">
        {label}
      </span>
    </div>
  );
}
