import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ posts: [], blocked: true, reason: 'token missing' });
  }
  const url = `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type,thumbnail_url&access_token=${token}&limit=6`;
  try {
    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (!r.ok) return NextResponse.json({ posts: [], blocked: true, reason: `status ${r.status}` });
    const data = await r.json();
    return NextResponse.json({ posts: data.data ?? [], blocked: false });
  } catch (err) {
    return NextResponse.json({ posts: [], blocked: true, reason: String(err) });
  }
}
