/**
 * Kaelin's Market — Weekly Ad fetcher
 *
 * PRIMARY: WordPress REST API (returns featured image URLs reliably)
 *   https://kaelinsmarket.com/wp-json/wp/v2/posts?categories=13&_embed=wp:featuredmedia
 *
 * FALLBACK: WordPress RSS feed (kept for resilience if REST API is down)
 *   https://kaelinsmarket.com/category/weekly-ad/feed/
 *
 * Note: file name retained as parse-rss.ts to minimize import churn across the codebase.
 */

export type WeeklyAdPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl: string | null;
  guid: string;
};

// =====================================================================
// WordPress REST API — PRIMARY SOURCE
// =====================================================================

const WP_REST_ENDPOINT =
  'https://kaelinsmarket.com/wp-json/wp/v2/posts?categories=13&per_page=8&_embed=wp:featuredmedia';

interface WpEmbeddedMedia {
  source_url?: string;
  media_details?: {
    sizes?: {
      full?: { source_url?: string };
      large?: { source_url?: string };
    };
  };
}

interface WpPost {
  id: number;
  date: string;
  link: string;
  title?: { rendered?: string };
  _embedded?: { 'wp:featuredmedia'?: WpEmbeddedMedia[] };
}

function toWeeklyAdPost(p: WpPost): WeeklyAdPost {
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  // Prefer full-size source_url; fall back to media_details.sizes.full.source_url
  const imageUrl =
    media?.source_url ??
    media?.media_details?.sizes?.full?.source_url ??
    media?.media_details?.sizes?.large?.source_url ??
    null;
  const title = decodeEntities(p.title?.rendered ?? 'Weekly Ad');
  return {
    title,
    link: p.link,
    pubDate: p.date ? new Date(p.date).toUTCString() : '',
    description: '',
    imageUrl,
    guid: p.link,
  };
}

async function fetchFromRestApi(): Promise<WeeklyAdPost[]> {
  const res = await fetch(WP_REST_ENDPOINT, {
    headers: {
      Accept: 'application/json',
      'User-Agent':
        'Mozilla/5.0 (compatible; KaelinsMarketBot/1.0; +https://kaelins-market-el-cajon.vercel.app)',
    },
    next: { revalidate: 43200 }, // 12h
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`WP REST API status ${res.status}`);
  const posts = (await res.json()) as WpPost[];
  return posts.map(toWeeklyAdPost);
}

// =====================================================================
// RSS PARSING — FALLBACK ONLY
// =====================================================================

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201c')
    .replace(/&#8221;/g, '\u201d')
    .replace(/&#8230;/g, '\u2026')
    .replace(/&nbsp;/g, ' ');
}

function extractTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(re);
  if (!match) return '';
  return match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

/**
 * Extract image URL from a single <item>...</item> block.
 * Priority order (per sprint constraint):
 *   1. <enclosure url="...">  — WordPress attaches featured image here
 *   2. First <img src="..."> inside <content:encoded> or <description>
 *   3. <media:content url="...">
 */
function extractImage(itemBlock: string): string | null {
  // Priority 1: <enclosure>
  const enclosure = itemBlock.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (enclosure) return enclosure[1];

  // Priority 2: First <img> inside content:encoded or description
  const contentMatch =
    itemBlock.match(/<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i) ||
    itemBlock.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
  if (contentMatch) {
    const content = contentMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
    const img = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (img) return img[1];
  }

  // Priority 3: <media:content>
  const media = itemBlock.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (media) return media[1];

  return null;
}

async function fetchFromRss(rssUrl: string): Promise<WeeklyAdPost[]> {
  const res = await fetch(rssUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; KaelinsMarketBot/1.0; +https://kaelins-market-el-cajon.vercel.app)',
      Accept: 'application/rss+xml, application/xml, text/xml',
    },
    next: { revalidate: 43200 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`RSS status ${res.status}`);
  const xml = await res.text();
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return itemBlocks.slice(0, 8).map((block) => {
    const title = decodeEntities(extractTag(block, 'title'));
    const link = decodeEntities(extractTag(block, 'link'));
    const pubDate = extractTag(block, 'pubDate');
    const description = decodeEntities(extractTag(block, 'description'))
      .replace(/<[^>]+>/g, '')
      .slice(0, 220);
    const imageUrl = extractImage(block);
    const guid = extractTag(block, 'guid') || link;
    return { title, link, pubDate, description, imageUrl, guid };
  });
}

// =====================================================================
// PUBLIC ENTRY — tries REST first, falls back to RSS, finally empty array
// =====================================================================

export async function fetchWeeklyAd(rssUrl: string): Promise<WeeklyAdPost[]> {
  try {
    const restPosts = await fetchFromRestApi();
    if (restPosts.length > 0) return restPosts;
  } catch (err) {
    console.warn('[weekly-ad] WP REST API failed, falling back to RSS:', err);
  }

  try {
    return await fetchFromRss(rssUrl);
  } catch (err) {
    console.error('[weekly-ad] RSS fallback also failed:', err);
    return [];
  }
}
