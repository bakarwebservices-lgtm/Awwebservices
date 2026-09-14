# awweb.online — Full Technical SEO Audit

Audited live on production. Overall foundation from the earlier rebuild is genuinely solid — real routes, unique metadata per page, sitemap, robots.txt, structured URL hierarchy. This audit found the issues sitting on top of that foundation, ranked by real impact.

**Reality check before the fixes:** "getting to the top" of Google for competitive terms takes months, not weeks, even with a perfect technical setup — ranking depends heavily on backlinks and content depth too, not just technical SEO. This audit fixes what's actually broken or weak right now. It won't put you at #1 by itself, but it removes things that were actively working against you.

---

## P1 — Critical, fix first

### 1. www / non-www canonical conflict (the biggest issue found)

- [ ] **The site inconsistently mixes `www.awweb.online` and `awweb.online`.**
  - The sitemap lists non-www URLs: `https://awweb.online/...`
  - Canonical tags on every page also point to non-www: `https://awweb.online/...`
  - But **every internal link** (nav, footer, buttons) points to the **www** version: `https://www.awweb.online/...`
  - And the site actually **resolves and serves pages on www** — visiting the non-www canonical URL redirects to www.
- [ ] **Why this matters:** a canonical tag is supposed to point to the final, real URL of a page. Right now every page's canonical points to a URL that immediately redirects elsewhere. This sends Google a contradictory signal about which version is authoritative, which can split ranking signals or slow indexing.
- [ ] **Fix — pick ONE version and use it everywhere.** Recommend `https://www.awweb.online` since that's what's already serving and what all internal links use:
  - Update `SITE_URL` constant to `https://www.awweb.online`
  - Regenerate canonical tags from that constant
  - Regenerate `sitemap.ts` to output www URLs
  - Confirm `robots.ts` sitemap reference also uses www
  - Confirm the actual redirect in Vercel goes non-www → www (one direction only, not both)

### 2. Duplicate site name in page titles

- [ ] Case study page titles currently render as: `"Vortex Rings — Real-Time COD Profit Engine | Case Study | AW Web Services | AW Web Services"` — the site name appears twice.
- [ ] This is almost certainly a Next.js metadata template appending the suffix twice — check `generateMetadata()` on `/work/[slug]/page.tsx` for a title that already includes "AW Web Services" being passed into a root layout `title.template` that appends it again.
- [ ] Check all dynamic `[slug]` pages (`/work/*` and `/services/*`) for the same bug, not just the one checked here.

### 3. Leftover fake testimonials on the homepage

- [ ] The homepage testimonials carousel still shows quotes attributed to **"D.K., Operations Manager, Swift Logistics"** and **"L.T., Director, Apex Consulting"** — these were the placeholder companies removed from the `/work` case studies earlier, but they were never removed from this separate testimonials section.
- [ ] Since these aren't real clients, these quotes need to come out (or be replaced with real testimonials from Vortex Rings, Attireburg, ZN Enterprises, or CSS Kro if you have actual quotes from them beyond what's already used in the CSS Kro case study).

---

## P2 — Important, fix soon

### 4. Image filenames with spaces

- [ ] Screenshot images on case study pages have raw filenames with spaces, e.g. `Screenshot 2026-07-18 121042.png`.
- [ ] Spaces in URLs get encoded as `%20`, which is messy and unprofessional in shared links, and filenames like this carry zero SEO value (Google does weight descriptive filenames somewhat).
- [ ] Rename to something like `vortex-rings-admin-dashboard.png`, `vortex-rings-postex-sync.png`, etc. — descriptive, hyphenated, no spaces. Update the data file references to match.

### 5. Homepage video weight (Core Web Vitals check needed)

- [ ] Homepage loads two video files directly (`hero-section.mp4`, `hero-section-2.0.mp4`). Videos are common Core Web Vitals killers if not properly optimized (compressed, lazy-loaded below the fold, correct `preload` attribute).
- [ ] Run the homepage through **PageSpeed Insights** (pagespeed.web.dev) and check the actual score — if it's poor, especially on mobile, that directly hurts ranking since Core Web Vitals is a confirmed Google ranking factor.

### 6. Confirm structured data is actually present

- [ ] JSON-LD (`Organization`, `BreadcrumbList`, `Service`, `CreativeWork` schemas) was part of the original build spec, but isn't reliably visible through a standard fetch since it's a hidden script tag. **Manually verify**: View Page Source (not just Inspect Element) on the homepage and a `/work/[slug]` page, search for `application/ld+json`, confirm it's actually there and populated with real data, not empty objects.
- [ ] Once confirmed present, run the homepage and one case study through **Google's Rich Results Test** (search.google.com/test/rich-results) to confirm no errors.

---

## P3 — Worth doing, not urgent

### 7. Content depth

- [ ] `/blog` still has no posts. This remains the long-term lever for ranking on specific search terms (e.g. "COD e-commerce Pakistan," "PostEx integration") — not urgent today, but nothing here compounds until it starts.

### 8. Backlinks

- [ ] None currently in place. Getting listed on Clutch/GoodFirms, and asking Vortex Rings/Attireburg/ZN Enterprises/CSS Kro for a small "Built by AW Web Services" footer credit/link, is still outstanding from the original roadmap.

### 9. Google Business Profile

- [ ] Still not set up, per the original roadmap. Free, helps local Pakistan visibility, unrelated to the technical fixes above.

---

## Suggested order to hand this to your agent

1. Fix #1 (www/non-www) first — this is the one actively confusing Google right now
2. Fix #2 (duplicate title bug) — quick, isolated fix
3. Fix #3 (fake testimonials) — needs your decision on replacement content, not just code
4. Then #4 and #5
5. #6 is a verification step you do yourself, not a code change
6. #7–9 are the longer-term roadmap items, unchanged from before
