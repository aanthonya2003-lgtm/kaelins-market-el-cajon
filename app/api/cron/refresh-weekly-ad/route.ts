import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  try {
    revalidatePath('/api/weekly-ad');
    revalidatePath('/weekly-ad');
    revalidatePath('/');
    const base = process.env.NEXT_PUBLIC_URL ?? 'https://kaelins-market-el-cajon.vercel.app';
    await fetch(`${base}/api/weekly-ad`, { cache: 'no-store' });
    return NextResponse.json({ ok: true, refreshed: ['/api/weekly-ad', '/weekly-ad', '/'], at: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
