import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;
  if (!token || !pageId) {
    return NextResponse.json({ posts: [], blocked: true, reason: 'token or page id missing' });
  }
  const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=id,message,permalink_url,full_picture,created_time&access_token=${token}&limit=6`;
  try {
    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (!r.ok) return NextResponse.json({ posts: [], blocked: true, reason: `status ${r.status}` });
    const data = await r.json();
    return NextResponse.json({ posts: data.data ?? [], blocked: false });
  } catch (err) {
    return NextResponse.json({ posts: [], blocked: true, reason: String(err) });
  }
}
