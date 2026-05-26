import type { Metadata } from 'next';
import { LoyaltyHero } from '@/components/sections/LoyaltyHero';
import { AppCardSteps } from '@/components/sections/AppCardSteps';
import { LoyaltyAppCardCTA } from '@/components/sections/LoyaltyAppCardCTA';
import { EngagementCTA } from '@/components/sections/EngagementCTA';
import { BUSINESS } from '@/lib/business-data';

export const metadata: Metadata = {
  title: 'AppCard Loyalty — Free Rewards Program',
  description:
    "Free to join. Earn points, unlock members-only coupons, and get sale alerts. Sign up at the register or online at Kaelin's Market.",
  alternates: { canonical: 'https://kaelins-market-el-cajon.vercel.app/loyalty' },
  openGraph: {
    title: "Kaelin's Market · AppCard Rewards",
    description: 'Free loyalty program. Points + members-only coupons + sale alerts.',
    type: 'website',
  },
};

const loyaltyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://kaelins-market-el-cajon.vercel.app/loyalty',
  url: 'https://kaelins-market-el-cajon.vercel.app/loyalty',
  name: "Kaelin's Market — AppCard Loyalty Program",
  description:
    "Free loyalty rewards program. Earn points on every visit, unlock members-only coupons, get notified when favorite items go on sale.",
  isPartOf: { '@id': 'https://kaelins-market-el-cajon.vercel.app/#store' },
  mainEntity: {
    '@type': 'GroceryStore',
    '@id': 'https://kaelins-market-el-cajon.vercel.app/#store',
    name: BUSINESS.name,
    makesOffer: {
      '@type': 'Offer',
      name: 'AppCard loyalty membership',
      description: 'Free to join. Points + coupons + sale alerts.',
      price: '0',
      priceCurrency: 'USD',
      url: BUSINESS.urls.appcard,
      availability: 'https://schema.org/InStock',
    },
  },
};

export default function LoyaltyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loyaltyJsonLd) }}
      />
      <LoyaltyHero />
      <AppCardSteps />
      <LoyaltyAppCardCTA />
      <EngagementCTA />
    </>
  );
}
