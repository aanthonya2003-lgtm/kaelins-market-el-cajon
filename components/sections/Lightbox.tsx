'use client';

import { useEffect } from 'react';

interface Props {
  src: string | null;
  alt: string;
  caption?: string;
  postLink?: string;
  onClose: () => void;
}

/**
 * Lightbox — full-screen overlay for the weekly ad JPG.
 * - Tap/click outside the image closes
 * - Escape key closes
 * - Body scroll locked while open
 * - Secondary "View on kaelinsmarket.com" link does NOT capture primary tap
 * - Returns null if no src (caller controls visibility)
 */
export function Lightbox({ src, alt, caption, postLink, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Weekly ad — ${alt}`}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[var(--color-ink)]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-[fadeIn_180ms_ease-out]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[88vh] object-contain cursor-default shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Close button */}
      <button
        aria-label="Close lightbox"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[var(--color-saffron)] transition-colors duration-200 text-2xl leading-none"
      >
        ×
      </button>

      {/* Caption + secondary post link */}
      {(caption || postLink) && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-[90vw] text-center pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          {caption && (
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-cream)]/80">
              {caption}
            </p>
          )}
          {postLink && (
            <a
              href={postLink}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto inline-block mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-saffron)] hover:text-[var(--color-cream)] transition-colors underline underline-offset-4"
              onClick={(e) => e.stopPropagation()}
            >
              View on kaelinsmarket.com ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
