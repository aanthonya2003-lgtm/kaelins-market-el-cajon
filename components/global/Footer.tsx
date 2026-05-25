import Link from 'next/link';
import { BUSINESS } from '@/lib/business-data';
import { FACEBOOK_VERIFIED, INSTAGRAM_VERIFIED, FACEBOOK_NUMERIC_URL } from '@/lib/feature-flags';

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-cream)]">
      <div className="container-max px-gutter py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-[clamp(36px,4vw,56px)] leading-[0.95] tracking-[-0.025em]">
              Kaelin&rsquo;s<span className="text-[var(--color-chile)]">.</span>
            </h3>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-saffron)] mt-3">
              EST. {BUSINESS.founded} · El Cajon
            </p>
            <p className="mt-6 text-[var(--color-cream)]/70 max-w-[42ch] text-[15px] leading-[1.6]">
              {BUSINESS.alternateName}. Family-owned three generations. Mexican &amp; Arabic groceries under one roof at
              {' '}
              <span className="text-[var(--color-cream)]">{BUSINESS.address.street}</span>.
            </p>
          </div>

          {/* Visit */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-cream)]/50 mb-4">
              Visit
            </p>
            <address className="not-italic space-y-3 text-[15px]">
              <a
                href={BUSINESS.urls.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[var(--color-saffron)] transition-colors"
              >
                {BUSINESS.address.street}<br />
                {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
              </a>
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="block font-mono tracking-[0.06em] hover:text-[var(--color-saffron)] transition-colors"
              >
                {BUSINESS.phone}
              </a>
            </address>

            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-cream)]/50 mt-8 mb-3">
              Hours
            </p>
            <p className="text-[15px]">
              Mon&ndash;Sun<br />
              7:00&nbsp;AM &ndash; 9:00&nbsp;PM
            </p>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-cream)]/50 mb-4">
              Shop
            </p>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/weekly-ad" className="hover:text-[var(--color-saffron)] transition-colors">Weekly Ad</Link></li>
              <li><Link href="/departments" className="hover:text-[var(--color-saffron)] transition-colors">Departments</Link></li>
              <li><Link href="/loyalty" className="hover:text-[var(--color-saffron)] transition-colors">AppCard</Link></li>
              <li><Link href="/about" className="hover:text-[var(--color-saffron)] transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-cream)]/50 mb-4">
              Connect
            </p>
            <ul className="space-y-2.5 text-[15px]">
              {FACEBOOK_VERIFIED ? (
                <li>
                  <a href={FACEBOOK_NUMERIC_URL} target="_blank" rel="noreferrer" className="hover:text-[var(--color-saffron)] transition-colors">
                    Facebook
                  </a>
                </li>
              ) : (
                <li className="text-[var(--color-cream)]/40 font-mono text-[11px] tracking-[0.14em] uppercase">
                  Facebook — verifying
                </li>
              )}
              {INSTAGRAM_VERIFIED ? (
                <li>
                  <a href="https://instagram.com/kaelinsmarket" target="_blank" rel="noreferrer" className="hover:text-[var(--color-saffron)] transition-colors">
                    Instagram
                  </a>
                </li>
              ) : (
                <li className="text-[var(--color-cream)]/40 font-mono text-[11px] tracking-[0.14em] uppercase">
                  Instagram — verifying
                </li>
              )}
              <li>
                <a href={BUSINESS.urls.yelp} target="_blank" rel="noreferrer" className="hover:text-[var(--color-saffron)] transition-colors">
                  Yelp
                </a>
              </li>
              <li>
                <a href={BUSINESS.urls.appcard} target="_blank" rel="noreferrer" className="hover:text-[var(--color-saffron)] transition-colors">
                  AppCard
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-20 pt-8 border-t border-[var(--color-cream)]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-cream)]/40">
            © {new Date().getFullYear()} {BUSINESS.legalName} dba {BUSINESS.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-cream)]/40">
            {BUSINESS.firstSupermarketClaim}
          </p>
        </div>
      </div>
    </footer>
  );
}
