# Definition of Done — Kaelin's Market

> Standing rules. Every contributor (human or agent) must satisfy these before declaring a route, feature, or section "shipped." No exceptions.

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

## Reference: this rule was added because

Initial scaffold session listed `/weekly-ad`, `/departments`, `/loyalty`, `/about` in sitemap before they existed. Caught pre-deploy by Anthony. Sitemap had to be patched in commit `4538c08`. **Never again.**
