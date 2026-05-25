'use client';

import type { Testimonial } from '@/types';

// Sourced from Yelp/Google/NextDoor public reviews verified during research pass.
// Trimmed and attributed by reviewer first name + last initial only.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Shrimp and octopus ceviche off the hook. Great price too! Good prices on produce. Friendly staff, big selection.',
    author: 'Wanderer S.',
    source: 'Yelp',
    rating: 5,
  },
  {
    quote:
      'Once again we have to say how much we like Kaelin\u2019s hot food counter, especially the rotisserie chickens — so much better than Costco.',
    author: 'Mel M.',
    source: 'Yelp',
    rating: 5,
  },
  {
    quote:
      'We ordered carnitas from them for a large family gathering, and they were on time, courteous, and made sure everything was hot. The price is reasonable too!',
    author: 'D. M.',
    source: 'Yelp',
    rating: 5,
  },
  {
    quote:
      'The folks at Kaelin\u2019s are really nice and very friendly! Mexican type ingredients and food — salsas, homemade tortillas, chiles, everything.',
    author: 'F. V.',
    source: 'NextDoor',
    rating: 5,
  },
  {
    quote:
      'Luv ethnic grocery stores and this is a 2-for. Mexican and Mediterranean. If you\u2019re looking for a variety of hummus or freshly made salsa — Kaelin\u2019s has it.',
    author: 'Mel M.',
    source: 'Yelp',
    rating: 5,
  },
  {
    quote:
      'Good and decently priced. Not overpriced like most Mexican stores in San Diego. The food has always been fresh and we\u2019ve enjoyed it.',
    author: 'Aaron T.',
    source: 'Google',
    rating: 5,
  },
  {
    quote:
      'Kaelin\u2019s, hands down. The store has a great variety of foods. They have a great fish market inside, prices are really cheap, plus a bakery that makes fresh bread every day.',
    author: 'L. G.',
    source: 'NextDoor',
    rating: 5,
  },
];

function Row({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: 'normal' | 'reverse';
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`flex gap-6 ${
        direction === 'normal' ? 'animate-marquee' : 'animate-marquee-reverse'
      } w-max`}
    >
      {doubled.map((t, i) => (
        <figure
          key={`${t.author}-${i}`}
          className="shrink-0 w-[320px] md:w-[420px] lg:w-[500px] bg-[var(--color-paper)] border border-[var(--color-line)] p-7 lg:p-9"
        >
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-chile)]">
            {t.source} · {'★'.repeat(t.rating ?? 5)}
          </span>
          <blockquote className="font-display-body text-[var(--color-ink)] text-[17px] lg:text-[19px] leading-[1.5] mt-4">
            “{t.quote}”
          </blockquote>
          <figcaption className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] mt-5">
            — {t.author}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function TestimonialsMarquee() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const top = TESTIMONIALS.slice(0, half);
  const bottom = TESTIMONIALS.slice(half);

  return (
    <section
      data-section="Testimonials"
      className="relative bg-[var(--color-cream)] py-[var(--section-y)] overflow-hidden"
    >
      <div className="container-max px-gutter mb-12 lg:mb-16">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-chile)] mb-3">
          La gente dice / The neighborhood says
        </p>
        <h2 className="font-display text-[clamp(40px,7vw,112px)] leading-[0.92] tracking-[-0.025em] text-[var(--color-ink)] max-w-[18ch]">
          Not our words. <em className="italic text-[var(--color-saffron)]">Theirs.</em>
        </h2>
      </div>

      <div className="space-y-6 lg:space-y-8">
        <Row items={top} direction="normal" />
        <Row items={bottom} direction="reverse" />
      </div>
    </section>
  );
}
