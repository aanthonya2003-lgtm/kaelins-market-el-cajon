# Kaelin's Market - El Cajon, CA

> El Cajon's first supermarket. Family-owned since 1958. Mexican & Arabic mercado.

Built by Weblove Elite. Next.js 15.5.18 + React 19.0.6 + Tailwind 4.1.5 + GSAP + Lenis + Framer Motion.

## Live

- **Vercel:** https://kaelins-market-el-cajon.vercel.app
- **Custom domain:** TBD (legacy WordPress remains live at kaelinsmarket.com)
- **Legacy site:** https://kaelinsmarket.com

## Stack

- Next.js 15.5.18 (App Router) + React 19.0.6 + TypeScript strict
- Tailwind CSS v4.1.5 (OKLCH color system, @theme tokens)
- GSAP 3.12.5 + @gsap/react + ScrollTrigger + SplitType
- Lenis 1.1.20 (smooth scroll, ticker-synced with GSAP)
- Framer Motion 11.18.2
- Resend 4.x (stubbed - awaiting verified email)
- SWR 2.x

## Iron Laws Enforced

1. No verified email = no form page. All form pages are phone CTAs until owner email is verified.
2. Every site ships with crons. vercel.json includes the cron jobs allowed by the current plan tier.
3. Bidirectional animations. once: true is BANNED.
4. 100dvh on hero, never 100vh.
5. Cron schedules respect Vercel plan limits. See docs/DEFINITION_OF_DONE.md for tier matrix.
6. Patch-hygiene check at every session kickoff. See docs/DEFINITION_OF_DONE.md.
7. Legal claims require 2+ sources, one authoritative. See docs/DEFINITION_OF_DONE.md.
8. Feature flags mean INVISIBLE, not visible-but-grayed. Unverified social handles, IG feeds, etc., are removed from render entirely. No "verifying" placeholders ship to users.

## Routes

```
/                  Home (10-section composition)
/weekly-ad         Live WP REST API feed + lightbox JPG viewer + Fisher Printing iframe (graceful fallback)
/departments       7 bilingual department details + sticky anchor index + CollectionPage JSON-LD
/about             Heritage hero + sourced timeline + owner-quote placeholder + community voices
/loyalty           AppCard hero + 3-step explainer + WebPage+Offer JSON-LD
```

All routes ship with: dedicated JSON-LD, mobile-first layout, bidirectional GSAP animations, ghost watermarks where applicable.

## Home page sections (in render order - per ROI funnel)

1. Hero - SplitText reveal, Ken Burns loop, 100dvh
2. SocialProofStrip - 1958 + 4.4 stars + 93/100 health
3. WeeklyAdEmbed - WordPress RSS auto-feed + Fisher Printing iframe fallback (position 3 per ROI)
4. DepartmentsGrid - bilingual labels (Spanish + Arabic)
5. SignatureDishes - Sabores de Kaelin's - 6 named items
6. HeritageBlock - 1958 typography block
7. LoyaltyAppCardCTA - AppCard signup
8. InstagramFeed - LIVE-OR-INVISIBLE (only renders when handle confirmed + token live)
9. TestimonialsMarquee - dual-row, real reviews
10. EngagementCTA - merged SMS + email form

## Weekly Ad Data Pipeline

Primary source: **WordPress REST API** (returns featured image URLs reliably):
```
https://kaelinsmarket.com/wp-json/wp/v2/posts?categories=13&per_page=8&_embed=wp:featuredmedia
```

Fallback: WordPress RSS feed (kept for resilience; lib/parse-rss.ts retains the parser).

When WP REST returns featured images, the archive grid cards open a full-screen lightbox showing the raw JPG. Tap outside the image or press Escape to close. Secondary "View on kaelinsmarket.com" link is available in the lightbox but is NOT the primary tap target.

## Text DEALS SMS CTA - Desktop Behavior (Intentional)

The "Text DEALS to (619) 440-1423" CTA in EngagementCTA uses an `sms:` href.

- **iOS:** Opens Messages with the recipient and body pre-filled. Works as designed.
- **Android:** Opens default SMS app with recipient and body pre-filled. Works as designed.
- **Desktop Chrome/Firefox/Safari:** No SMS handler is registered. Clicking the button silently does nothing.

This is **intentional**. The CTA is mobile-first by design — SMS conversions only happen on phones, and 90%+ of grocery site mobile traffic is mobile. Desktop users see the same button as a brand cue but are not the target audience for the conversion. No fallback is needed.

## Cron Schedule (Hobby-plan compliant)

```
/api/cron/refresh-weekly-ad      Tue 06:00 UTC   (weekly ad refresh)
/api/cron/health-check           Daily 08:00 UTC (link integrity)
```

**Dormant** (route file exists but not scheduled - requires Vercel Pro upgrade):

```
/api/cron/refresh-social-feed    Hourly          (re-enable on Pro)
```

Plus GitHub Action refresh-instagram-token.yml runs every 55 days (see docs/CI_WORKFLOWS.md).

## Setup

```bash
npm install --legacy-peer-deps
npm run dev
```

## Required Vercel Environment Variables

Add these in Vercel dashboard -> project -> Settings -> Environment Variables:

```
CRON_SECRET             (generate: openssl rand -hex 32)
NEXT_PUBLIC_URL         https://kaelins-market-el-cajon.vercel.app
RESEND_API_KEY          (only after owner email verified)
RESEND_TO_EMAIL         (only after owner email verified)
INSTAGRAM_ACCESS_TOKEN  (only after IG handle verified)
FB_PAGE_ACCESS_TOKEN    (only after FB page verified)
FB_PAGE_ID              (only after FB page verified)
```

## Unblock Checklist

- [ ] Owner email - unblocks contact form, catering, jobs, newsletter
- [ ] Instagram handle confirmation + token - flips INSTAGRAM_VERIFIED flag, makes feed render (currently invisible per Iron Law #8)
- [ ] Facebook page vanity URL - flips FACEBOOK_VERIFIED flag, adds link to footer (currently hidden per Iron Law #8)
- [ ] **Vercel Pro upgrade** - REQUIRED before re-enabling hourly `refresh-social-feed` cron. Trigger: at least one social handle (IG or FB) verified AND owner approves the plan-tier cost.
- [ ] Domain decision - deploy stays at *.vercel.app until owner approves cutover
- [ ] GitHub Actions workflows - paste from docs/CI_WORKFLOWS.md via web UI (token scope limitation)
- [ ] **Alpine Twisters Inc incorporation year** - placeholder in /about timeline. Pull from California Secretary of State business search OR owner-confirm before adding date.
- [ ] **Owner quote for /about** - placeholder shipped. Awaits Hani Garmo confirmation.
- [ ] **Tier 1 photography session** - retainer pitch in docs/RETAINER_PHOTOGRAPHY.md. Unlocks 21+ department photos + storefront + owner portrait in one shoot.

## Build by

**Weblove Elite** - elite AI web agency execution engine.
