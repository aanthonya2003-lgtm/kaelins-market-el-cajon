import { NextResponse } from 'next/server';
import { BUSINESS } from '@/lib/business-data';

export const runtime = 'nodejs';

const CRITICAL_LINKS = [
  BUSINESS.urls.legacy,
  BUSINESS.urls.appcard,
  BUSINESS.urls.weeklyAdPage,
  BUSINESS.urls.weeklyAdRSS,
  BUSINESS.urls.fisherPrintingFallback,
  BUSINESS.urls.yelp,
];

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const results = await Promise.allSettled(
    CRITICAL_LINKS.map(async (url) => {
      try {
        const r = await fetch(url, {
          method: 'HEAD',
          headers: { 'User-Agent': 'KaelinsMarketHealthCheck/1.0' },
          signal: AbortSignal.timeout(8000),
        });
        return { url, status: r.status, ok: r.ok };
      } catch (err) {
        return { url, status: 0, ok: false, error: String(err) };
      }
    })
  );
  const summary = results.map((r) => (r.status === 'fulfilled' ? r.value : r.reason));
  const allOk = summary.every((s: { ok?: boolean }) => s?.ok);
  return NextResponse.json({ ok: allOk, checks: summary, at: new Date().toISOString() });
}
