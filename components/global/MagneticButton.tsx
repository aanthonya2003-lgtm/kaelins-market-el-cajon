'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as = 'button',
  href,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return; // disable on touch
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out' });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  if (as === 'a') {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  if (as === 'div') {
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={className} onClick={onClick}>
        {children}
      </div>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
