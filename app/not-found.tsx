import Link from 'next/link';
import { BUSINESS } from '@/lib/business-data';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-gutter text-center">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-4">
        404 · No encontrado
      </p>
      <h1 className="font-display text-[clamp(48px,8vw,120px)] leading-[0.92] tracking-[-0.025em] text-[var(--color-ink)] max-w-[18ch]">
        Lost in the <em className="italic text-[var(--color-saffron)]">mercado.</em>
      </h1>
      <p className="mt-8 text-[var(--color-ink-soft)] max-w-[40ch]">
        That aisle doesn&rsquo;t exist. Try the weekly ad or call us — we can probably find what you need.
      </p>
      <div className="mt-10 flex gap-3">
        <Link
          href="/"
          className="bg-[var(--color-chile)] text-[var(--color-cream)] px-7 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-ink)] transition-colors"
        >
          Back home
        </Link>
        <a
          href={`tel:${BUSINESS.phoneE164}`}
          className="border border-[var(--color-ink)]/30 text-[var(--color-ink)] px-7 py-4 font-mono tracking-[0.14em] text-sm uppercase hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors"
        >
          {BUSINESS.phone}
        </a>
      </div>
    </div>
  );
}
