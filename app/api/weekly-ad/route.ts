import { NextResponse } from 'next/server';
import { fetchWeeklyAd } from '@/lib/parse-rss';
import { BUSINESS } from '@/lib/business-data';

export const revalidate = 43200; // 12 hours
export const dynamic = 'force-static';

export async function GET() {
  try {
    const posts = await fetchWeeklyAd(BUSINESS.urls.weeklyAdRSS);
    return NextResponse.json(
      { ok: posts.length > 0, posts, source: BUSINESS.urls.weeklyAdRSS },
      { headers: { 'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400' } }
    );
  } catch (err) {
    console.error('[api/weekly-ad] failed:', err);
    return NextResponse.json({ ok: false, posts: [], error: String(err) }, { status: 200 });
  }
}
