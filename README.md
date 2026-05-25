# Kaelin's Market - El Cajon, CA

> El Cajon's first supermarket. Family-owned since 1958. Mexican & Arabic mercado.

Built by Weblove Elite. Next.js 15.3.2 + React 19 + Tailwind 4.1.5 + GSAP + Lenis + Framer Motion.

## Live

- **Vercel:** _import this repo at vercel.com/new - auto-deploys in ~90s_
- **Custom domain:** TBD (legacy WordPress remains live at kaelinsmarket.com)
- **Legacy site:** https://kaelinsmarket.com

## Stack

- Next.js 15.3.2 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4.1.5 (OKLCH color system, @theme tokens)
- GSAP 3.12.5 + @gsap/react + ScrollTrigger + SplitType
- Lenis 1.1.20 (smooth scroll, ticker-synced with GSAP)
- Framer Motion 11.18.2
- Resend 4.x (stubbed - awaiting verified email)
- SWR 2.x

## Iron Laws Enforced

1. No verified email = no form page. All form pages are phone CTAs until owner email is verified.
2. Every site ships with crons. vercel.json includes 3 cron jobs.
3. Bidirectional animations. once: true is BANNED.
4. 100dvh on hero, never 100vh.

## Sections (in render order - per ROI funnel)

1. Hero - SplitText reveal, Ken Burns loop, 100dvh
2. SocialProofStrip - 1958 + 4.4 stars + 93/100 health
3. WeeklyAdEmbed - WordPress RSS auto-feed + Fisher Printing iframe fallback (position 3 per ROI)
4. DepartmentsGrid - bilingual labels (Spanish + Arabic)
5. SignatureDishes - Sabores de Kaelin's - 6 named items
6. HeritageBlock - 1958 typography block
7. LoyaltyAppCardCTA - AppCard signup
8. InstagramFeed - live, behind feature flag
9. TestimonialsMarquee - dual-row, real reviews
10. EngagementCTA - merged SMS + email form

## Cron Schedule

```
/api/cron/refresh-weekly-ad      Tue 06:00 UTC   (weekly ad)
/api/cron/refresh-social-feed    Every hour      (social)
/api/cron/health-check           Daily 08:00 UTC (link integrity)
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
- [ ] Instagram handle confirmation + token - unlocks live feed
- [ ] Facebook page vanity URL - replaces numeric URL, satisfies QC #20
- [ ] Domain decision - deploy stays at *.vercel.app until owner approves cutover
- [ ] GitHub Actions workflows - paste from docs/CI_WORKFLOWS.md via web UI (token scope limitation)

## Build by

**Weblove Elite** - elite AI web agency execution engine.
