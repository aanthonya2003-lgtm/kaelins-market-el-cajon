# Definition of Done — Kaelin's Market

> Standing rules. Every contributor (human or agent) must satisfy these before declaring a route, feature, or section "shipped." No exceptions.

## Session Kickoff Rules

### Before writing ANY code in a new session

- [ ] **Verify current `next` pin is not on the CVE list.** Check https://nextjs.org/blog/ for any CVE bulletin published since the last commit to this repo. If the currently pinned version (`package.json` → `dependencies.next`) is flagged, bump to the patched version in the **first commit of the session**, before building anything else.
- [ ] **Verify current `react` + `react-dom` pins are still on a supported patch line** (check https://react.dev/blog/ for security advisories since last commit).
- [ ] If either bump is needed, also bump `eslint-config-next` to match the new `next` minor.
- [ ] Confirm `.npmrc` still contains `legacy-peer-deps=true` — required for React 19 to install with strict peers.
- [ ] Read `docs/DEFINITION_OF_DONE.md` (this file) — every session.
- [ ] Read the README "Unblock Checklist" — every session — and confirm which items have/haven't moved since last session.

### Reference: patch-hygiene precedent

Initial scaffold session pinned `next@15.3.2` which was the patched version at scaffold time. By the time of the second deploy, CVE-2025-66478 had been published flagging `15.3.2` as vulnerable. The CVE-patch happened reactively after build failure, costing one rebuild cycle. Adding this rule prevents the same lag at every session opening.

Reactive patches are documented in commit `be54fdf` (next 15.3.2 → 15.3.6).

## Route Shipping Rules

### When a new route is built this session

- [ ] **`public/sitemap.xml` updated in the SAME commit** with correct `<loc>`, `<changefreq>`, and `<priority>` for the new route
- [ ] Route entry is removed from "unbuilt" status in `README.md` if listed there
- [ ] Route returns HTTP 200 on local build (`npm run build` succeeds)
- [ ] Route is linked from somewhere navigable (nav, footer, or sibling section CTA)
- [ ] If route has its own JSON-LD, schema validates and uses only verified data

### When a route is removed or renamed

- [ ] `public/sitemap.xml` entry removed/renamed in same commit
- [ ] Any nav/footer links pointing to old path updated or 301-redirected via `next.config.ts`
- [ ] Search Console submitted for re-crawl (manual step, document in commit body)

### When a route is linked but NOT YET built

- [ ] **Route MUST NOT appear in `public/sitemap.xml`** — Google Search Console will flag soft-404s and that penalty sticks
- [ ] Surface the unbuilt route in `README.md` "Unblock Checklist" so it's visible
- [ ] Optional: nav link can stay (signals intent) but only if next sprint is committed to building it

## Cron Shipping Rules

### Plan-tier matrix — Vercel cron limits (current Hobby tier)

| Plan | Max crons | Max frequency per cron | Notes |
|---|---|---|---|
| **Hobby** (current) | **2 active** | **once per day** | Anything more frequent silently fails or blocks deploy |
| **Pro** | 40 | every minute | Required to re-enable `refresh-social-feed` (hourly) |
| **Enterprise** | 100 | every minute | Reserved |

### When adding a new cron

- [ ] **Frequency MUST be compatible with the current plan tier.** Hobby = daily or less. Pro = anything.
- [ ] If the new cron exceeds tier limits, do NOT add it to `vercel.json` — keep the route file as dormant code and add the cron entry to the README "Dormant crons" section with the upgrade trigger
- [ ] Authorization: every cron route MUST gate on `Bearer ${process.env.CRON_SECRET}` in production
- [ ] Add to README `Cron Schedule` section in the same commit
- [ ] Surface the upgrade trigger in README "Unblock Checklist" if it requires plan change

### When a cron's frequency requirement changes

- [ ] Check current plan tier first — `vercel teams ls` or dashboard
- [ ] If frequency now exceeds tier: move the cron from active to dormant, document the upgrade trigger
- [ ] If frequency now fits tier: move from dormant to active, update README in same commit

## Legal Display Rules

### Anything publicly displayed that claims a legal entity, ownership, year, or rating

- [ ] **Minimum TWO independent sources** required before shipping to a publicly-rendered surface (footer, About page, JSON-LD, OG meta)
- [ ] One source MUST be authoritative (government registry, BBB official record, owner-confirmed, or original source-of-record). Aggregators alone (Buzzfile, Yelp summary, ChatGPT, etc.) do not count as authoritative.
- [ ] Source URLs documented in `lib/business-data.ts` inline comments
- [ ] Re-verify each value at the start of every session for any business with active ownership changes

### Reference

- Initial scaffold pulled `Alpine Twisters Inc` from BBB alone (one source) and shipped it to the footer copyright. Re-verified later session against California Secretary of State + San Diego County Recorder FBN filing — value confirmed, but the single-source ship was below bar.

## Sitemap Priority Convention

| Priority | Use for |
|---|---|
| `1.0` | Homepage only |
| `0.9` | Highest-conversion page (weekly ad for grocery) |
| `0.8` | Primary content hub (departments, menu, services) |
| `0.7` | Conversion utility (loyalty, booking, contact) |
| `0.6` | Story / brand pages (about, careers) |
| `0.5` | Legal / utility (privacy, terms) |

## Changefreq Convention

| changefreq | Use for |
|---|---|
| `daily` | Homepage if it shows live feeds (RSS/social) |
| `weekly` | Homepage default + weekly ad + blog index |
| `monthly` | Static department + about + loyalty pages |
| `yearly` | Legal pages, T&Cs |

## Reference: rules added because

- **Sitemap rule** — Initial scaffold listed `/weekly-ad`, `/departments`, `/loyalty`, `/about` in sitemap before they existed. Caught pre-deploy by Anthony. Patched in commit `4538c08`.
- **Cron tier rule** — Initial `vercel.json` shipped 3 crons including an hourly `refresh-social-feed` that would have failed silently on Hobby tier. Caught pre-deploy by Anthony.
- **Session kickoff CVE rule** — `next@15.3.2` shipped clean at scaffold but CVE-2025-66478 was published before second deploy, requiring a reactive patch. Patched in commit `be54fdf`.
- **Legal display rule** — `Alpine Twisters Inc` shipped to the footer with only BBB as a single source. Re-verified against California SOS + SD County FBN later — value held — but the original ship was below verification bar.
