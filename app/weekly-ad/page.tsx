import type { Metadata } from 'next';
import { WeeklyAdHero } from '@/components/sections/WeeklyAdHero';
import { WeeklyAdArchive } from '@/components/sections/WeeklyAdArchive';
import { FisherPrintingFrame } from '@/components/sections/FisherPrintingFrame';
import { EngagementCTA } from '@/components/sections/EngagementCTA';
import { fetchWeeklyAd } from '@/lib/parse-rss';
import { BUSINESS } from '@/lib/business-data';

export const revalidate = 43200; // 12 hours

export const metadata: Metadata = {
  title: "Weekly Ad — Updated every Tuesday",
  description:
    "Kaelin's Market weekly specials. New ad every Tuesday at 6 AM. Mexican & Arabic groceries, fresh produce, butcher specials, hot food deals. El Cajon, CA.",
  alternates: {
    canonical: 'https://kaelins-market-el-cajon.vercel.app/weekly-ad',
  },
  openGraph: {
    title: "Kaelin's Market · This Week's Ad",
    description: 'Weekly specials updated every Tuesday at 6 AM.',
    url: 'https://kaelins-market-el-cajon.vercel.app/weekly-ad',
    type: 'website',
  },
};

/**
 * Builds SpecialAnnouncement JSON-LD entries from RSS posts.
 * Per sprint constraint: `expires` MUST be calculated as pubDate + 7 days.
 * If pubDate is unavailable or unparseable, OMIT expires entirely.
 */
function buildAnnouncementSchema(posts: Awaited<ReturnType<typeof fetchWeeklyAd>>) {
  return posts.slice(0, 3).map((post) => {
    const base: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'SpecialAnnouncement',
      name: post.title,
      text: post.description || post.title,
      url: post.link,
      category: 'https://schema.org/PriceReduction',
      announcementLocation: {
        '@type': 'GroceryStore',
        name: BUSINESS.name,
        '@id': 'https://kaelins-market-el-cajon.vercel.app/#store',
      },
    };

    if (post.pubDate) {
      const pub = new Date(post.pubDate);
      if (!Number.isNaN(pub.getTime())) {
        base.datePosted = pub.toISOString();
        const expires = new Date(pub.getTime() + 7 * 24 * 60 * 60 * 1000);
        base.expires = expires.toISOString();
      }
      // If pubDate exists but is unparseable, omit both fields per constraint
    }
    // If pubDate is missing entirely, omit datePosted + expires per constraint

    return base;
  });
}

export default async function WeeklyAdPage() {
  const posts = await fetchWeeklyAd(BUSINESS.urls.weeklyAdRSS);
  const featured = posts[0] ?? null;
  const archive = posts.slice(1, 8);
  const announcements = buildAnnouncementSchema(posts);

  return (
    <>
      {announcements.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(announcements) }}
        />
      )}
      <WeeklyAdHero featured={featured} totalPosts={posts.length} />
      {archive.length > 0 && <WeeklyAdArchive posts={archive} />}
      <FisherPrintingFrame />
      <EngagementCTA />
    </>
  );
}
