import type { Metadata } from 'next';
import { HeritageHero } from '@/components/sections/HeritageHero';
import { HeritageTimeline } from '@/components/sections/HeritageTimeline';
import { OwnerQuote } from '@/components/sections/OwnerQuote';
import { CommunityVoices } from '@/components/sections/CommunityVoices';
import { LoyaltyAppCardCTA } from '@/components/sections/LoyaltyAppCardCTA';
import { EngagementCTA } from '@/components/sections/EngagementCTA';
import { BUSINESS } from '@/lib/business-data';

export const metadata: Metadata = {
  title: "About — El Cajon's First Supermarket Since 1958",
  description:
    "Family-owned three generations. First supermarket in El Cajon. Mexican and Arabic groceries under one roof. Est. 1958 at 1435 E Main St.",
  alternates: { canonical: 'https://kaelins-market-el-cajon.vercel.app/about' },
  openGraph: {
    title: "About Kaelin's Market · Since 1958",
    description:
      'Three generations. One family. Zero corporate ownership. The story of the first supermarket in El Cajon.',
    type: 'website',
  },
};

/**
 * About-page JSON-LD.
 * Notes per sprint constraints:
 * - `foundingDate` uses 1958 (sourced from kaelinsmarket.com/about-us)
 * - `legalName` cites Alpine Twisters Inc (CA Sec of State + SD County FBN filing, two sources)
 * - NO incorporation year shipped — year unverified per Anthony's hard constraint
 * - NO `founder` field shipped — no two-source-verified founder name available
 */
const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://kaelins-market-el-cajon.vercel.app/about',
  url: 'https://kaelins-market-el-cajon.vercel.app/about',
  mainEntity: {
    '@type': 'GroceryStore',
    '@id': 'https://kaelins-market-el-cajon.vercel.app/#store',
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    legalName: BUSINESS.legalName,
    foundingDate: String(BUSINESS.founded),
    description:
      "Family owned and operated since 1958. The first supermarket in El Cajon. Mexican and Arabic groceries under one roof at 1435 E Main St.",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <HeritageHero />
      <HeritageTimeline />
      <OwnerQuote />
      <CommunityVoices />
      <LoyaltyAppCardCTA />
      <EngagementCTA />
    </>
  );
}
