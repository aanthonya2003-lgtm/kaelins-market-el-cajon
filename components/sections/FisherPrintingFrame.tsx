import { BUSINESS } from '@/lib/business-data';

/**
 * Fisher Printing iframe — deterministic always-on fallback for the print-quality
 * weekly ad. Renders below the live RSS archive so that even when the WordPress
 * feed is empty/stale, shoppers still see the current paper ad layout.
 */
export function FisherPrintingFrame() {
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
          <a
            href={BUSINESS.urls.fisherPrintingFallback}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink)] hover:text-[var(--color-chile)] transition-colors"
          >
            Open in new tab ↗
          </a>
        </div>

        <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] w-full overflow-hidden border border-[var(--color-line)] bg-[var(--color-paper)]">
          <iframe
            src={BUSINESS.urls.fisherPrintingFallback}
            title="Kaelin's Market — weekly ad, print edition"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="mt-6 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-ink-soft)] max-w-[60ch]">
          Powered by Fisher Printing. Same prices, same items as our paper flyer
          mailed weekly to the neighborhood.
        </p>
      </div>
    </section>
  );
}
