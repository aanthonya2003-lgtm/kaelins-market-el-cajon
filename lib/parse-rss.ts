/**
 * Kaelin's Market — Lightweight WordPress RSS Parser
 * Zero external dependencies. Parses /category/weekly-ad/feed/ from kaelinsmarket.com.
 * Falls back gracefully if upstream is unreachable.
 */

export type WeeklyAdPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl: string | null;
  guid: string;
};

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

function extractImage(content: string): string | null {
  // Prefer enclosure / media:content / first <img src>
  const enclosure = content.match(/<enclosure[^>]+url="([^"]+)"/i);
  if (enclosure) return enclosure[1];
  const mediaContent = content.match(/<media:content[^>]+url="([^"]+)"/i);
  if (mediaContent) return mediaContent[1];
  const imgTag = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgTag) return imgTag[1];
  return null;
}

export async function fetchWeeklyAd(rssUrl: string): Promise<WeeklyAdPost[]> {
  try {
    const res = await fetch(rssUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; KaelinsMarketBot/1.0; +https://kaelins-market-el-cajon.vercel.app)',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      next: { revalidate: 43200 }, // 12h
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return itemBlocks.slice(0, 8).map((block) => {
      const title = decodeEntities(extractTag(block, 'title'));
      const link = decodeEntities(extractTag(block, 'link'));
      const pubDate = extractTag(block, 'pubDate');
      const description = decodeEntities(extractTag(block, 'description')).replace(/<[^>]+>/g, '').slice(0, 220);
      const contentEncoded = extractTag(block, 'content:encoded') || extractTag(block, 'description') || block;
      const imageUrl = extractImage(contentEncoded);
      const guid = extractTag(block, 'guid') || link;
      return { title, link, pubDate, description, imageUrl, guid };
    });
  } catch (err) {
    console.error('[weekly-ad RSS] fetch failed:', err);
    return [];
  }
}
