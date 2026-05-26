'use client';

import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '@/lib/business-data';

/**
 * Fisher Printing iframe — graceful degradation.
 *
 * Fisher Ads is served from unified.fisherads.com which may load over HTTP
 * (mixed content blocked by browsers) or return X-Frame-Options: DENY,
 * causing the iframe to fail silently.
 *
 * Behavior:
 *   - On mount: render iframe with onLoad/onError handlers + 5s timeout
 *   - If onLoad fires before timeout: keep iframe visible
 *   - If onError fires OR timeout elapses with no onLoad: swap to styled
 *     CTA button linking out in a new tab
 */
export function FisherPrintingFrame() {
  const [state, setState] = useState<'loading' | 'loaded' | 'failed'>('loading');
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stateRef.current === 'loading') setState('failed');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      data-section="Fisher Print"
      className="relative bg-[var(--color-cream)] py-[var(--section-y)] overflow-hidden"
    >
      <div className="container-max px-gutter">
        <div className="mb-10 lg:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
              Print edition / Edición impresa
            </p>
            <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink)] max-w-[22ch]">
              The full ad, <em className="italic text-[var(--color-saffron)]">page-for-page.</em>
            </h2>
          </div>
          {state !== 'failed' && (
            <a
              href={BUSINESS.urls.fisherPrintingFallback}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink)] hover:text-[var(--color-chile)] transition-colors"
            >
              Open in new tab ↗
            </a>
          )}
        </div>

        {state === 'failed' ? (
          <a
            href={BUSINESS.urls.fisherPrintingFallback}
            target="_blank"
            rel="noreferrer"
            className="group block aspect-[16/10] sm:aspect-[16/9] w-full bg-[var(--color-ink)] text-[var(--color-cream)] flex items-center justify-center hover:bg-[var(--color-chile)] transition-colors duration-300"
          >
            <div className="text-center px-8 max-w-[40ch]">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-saffron)] mb-4">
                External viewer
              </p>
              <p className="font-display text-[clamp(28px,3.5vw,52px)] leading-[1.1]">
                View full ad at Fisher Printing{' '}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </p>
              <p className="mt-6 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-cream)]/60">
                Opens in a new tab · same prices as our paper flyer
              </p>
            </div>
          </a>
        ) : (
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] w-full overflow-hidden border border-[var(--color-line)] bg-[var(--color-paper)]">
            <iframe
              src={BUSINESS.urls.fisherPrintingFallback}
              title="Kaelin's Market — weekly ad, print edition"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setState('loaded')}
              onError={() => setState('failed')}
            />
            {state === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-paper)] pointer-events-none">
                <div className="w-8 h-8 border-2 border-[var(--color-ink)]/20 border-t-[var(--color-chile)] rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}

        <p className="mt-6 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-ink-soft)] max-w-[60ch]">
          Powered by Fisher Printing. Same prices, same items as our paper flyer
          mailed weekly to the neighborhood.
        </p>
      </div>
    </section>
  );
}
