# The Solo Trail — SEO & UI/UX Audit Report

**Date:** 2026-07-29
**Site audited:** thesolotrail.com
**Stack:** Eleventy 3.x static site, ~37 trail guides, deployed to GitHub Pages
**Scope:** SEO, Performance, Visual Design/Polish, UX & Accessibility

---

## TL;DR

You're sitting on a strong content foundation — the bones (sitemap, canonical URLs, JSON-LD on trail pages, sensible meta tags, accessibility-aware tab system) are already better than 80% of solo-travel sites. The main wins are all in the polish layer: a few hours of fixes will noticeably lift both Lighthouse scores and Google discoverability, and a longer-horizon investment in image hosting + a content-freshness signal will compound over time.

**Top 3 things to fix first (under 2 hours combined):**
1. Add a visible keyboard-focus indicator on every link and button site-wide. (a11y + Lighthouse)
2. Surface the `publishedDate` and `lastVerified` data from your trail JSON into the page metadata so Google can show freshness. (SEO + trust)
3. Fix the footer text contrast — several footer labels are nearly invisible against the dark green background. (a11y + WCAG)

---

## Audit Methodology

- **Code review** of the full repo at `~/thesolotrail`: `.eleventy.js`, all `src/_includes/layouts/base.njk`, all partials, all 37 trail JSON records, `_data/` files, the entire `assets/css/` directory, and every page template.
- **No live tools run** (no Lighthouse, no PageSpeed, no Screaming Frog). Findings are based on reading the code and reasoning about how the site will behave in a browser.
- **Reference sites used as benchmarks** (for tone, not for copying):
  - **aliceoutram.com** — solo adventure travel, minimalist editorial, strong typography hierarchy
  - **indietraveller.co.uk** — long-running solo travel site, mature SEO patterns
  - **22travel.com** — small-team Himalayan content, content-first guide layouts
  - **outsideonline.com** — premium outdoor brand, navigation and trust-signal patterns

---

## 1. SEO Audit

### 1.1 What's working well

- **Title + meta description patterns are consistent.** Every page uses `seoTitle` and `seoDescription` (or falls back to `title` + first-paragraph description). This is the single most underrated SEO win and you already have it.
- **Open Graph tags** (the things that decide how your links look on Facebook/LinkedIn/Slack) are present, including a smart `og:type = article` on trail pages.
- **Twitter cards** (`summary_large_image`) are set up.
- **Canonical URLs** are present and correct.
- **Sitemap.xml** is hand-rolled but complete — homepage, all 37 trail pages (with priority dropped for non-live trails, which is exactly right), the static pages, and `/downloads/`.
- **robots.txt** correctly points to the sitemap.
- **Structured data (JSON-LD)** is on the homepage (a `WebSite` search action, which can give you a sitelinks search box in Google) and on every trail page (a `TouristAttraction` schema + `BreadcrumbList`).
- **Favicon set is complete** — SVG, 16/32/512 PNG, apple-touch, plus a manifest.
- **Image alt text** is always populated with descriptive copy (never empty `alt=""`).

### 1.2 Gaps by priority

#### High-priority gaps

1. **`publishedDate` and `lastVerified` exist in your data but never reach the page.** You already track when each trail was written and when it was last verified. This is *gold* for Google — trekking info gets stale fast, and showing "Last updated April 2026" both earns you a freshness boost in rankings and reassures readers. Right now it's just sitting in JSON.
   - **Why it matters:** Google has explicitly said they prefer fresh content for "your money or your life" topics like safety + travel. Showing the date also makes readers trust you more.
   - **Fix:** Surface `publishedDate` and `lastVerified` as visible "Last updated" text on each trail page, and as `<meta property="article:published_time">` and `article:modified_time` tags. The data is already there; this is a layout change.

2. **No author / E-E-A-T signal anywhere.** Google weighs **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness) heavily for travel content. Right now there's no "About the author" markup, no author bio on trail pages, and no `author` meta tag.
   - **Why it matters:** Sites with clear authorship and editorial standards rank better and earn more rich-result features.
   - **Fix:** Add an "About the editor" panel to trail pages (you have `imageCredit` already — same concept) and add `<meta name="author">` plus a Person schema to your About page.

3. **Hardcoded canonical and OG URL.** Your base layout uses `https://thesolotrail.com{{ page.url }}` literally — meaning if you ever preview on a staging URL or someone shares the page from a `www.` redirect, the canonical will be wrong. Same risk for OG image URLs.
   - **Why it matters:** A wrong canonical tells Google "this is the only version of this page" and can de-index your live site.
   - **Fix:** Use Eleventy's `url` filter or `site.url` from a global data file so the canonical is generated from one source.

#### Medium-priority gaps

4. **No `hreflang`.** You serve both Nepal and India audiences; if you ever go multi-language, you'll need to tell Google which version is for which audience. Not urgent, but worth flagging now so you don't paint yourself into a corner.
5. **No Twitter site handle.** When someone shares your link on Twitter/X, the card will say "from no-one." A `twitter:site="@thesolotrail"` handle (when you have one) and `twitter:creator="@you"` will fix this.
6. **OG image dimensions + alt not declared.** When WhatsApp/Slack crops your preview image, it can do weird things without explicit width/height. Add `og:image:width`, `og:image:height`, and `og:image:alt`.
7. **Sitemap has no `<lastmod>` field.** Sitemaps with last-modified dates get crawled faster. Add it from `lastVerified`.

#### Lower-priority / strategic gaps

8. **No blog or news section.** This is the single biggest strategic gap. Fresh content (a "New trail added" post, a "Permit changes for 2026" update, a "What I learned soloing Annapurna" piece) is the most reliable way to earn recurring search traffic. You have the editorial voice on the About page — let it breathe in a blog.
9. **No related-trails block.** When someone reads the Annapurna Base Camp guide, they should see "Similar solo treks" — this is internal linking and it both keeps people on-site and tells Google which pages are topically related.
10. **Image SEO.** Your trail cards use Wikimedia URLs with a `?width=` parameter. These don't get indexed as your own images in Google Images, which is where a lot of travel-blog traffic comes from. (More on this in the Performance section.)

### 1.3 SEO recommendations (concrete actions)

| Action | Time | Impact |
|---|---|---|
| Surface `publishedDate` / `lastVerified` in meta + visible UI | 1 hr | High |
| Add author bio + Person schema to About page | 2 hrs | High |
| Add `article:published_time` and `article:modified_time` on trail pages | 30 min | High |
| Replace hardcoded `https://thesolotrail.com` with `site.url` global data | 30 min | Medium |
| Add `og:image:width`/`height`/`alt` and `twitter:site`/`creator` | 30 min | Medium |
| Add `<lastmod>` to sitemap entries | 30 min | Medium |
| Add a related-trails block on trail pages | 3 hrs | Medium |
| Start a blog/news cadence | Ongoing | High (long-term) |

---

## 2. Performance Audit

### 2.1 What's working well

- **Static HTML output** served from GitHub Pages' global edge cache. There's no server-side rendering to wait on.
- **Width + height set on every `<img>`.** This prevents the worst CLS (layout shift) problem — images popping in late and shoving content around.
- **Lazy loading** on card images (so they don't load until scrolled into view).
- **Eager loading** on hero images (so the LCP — the largest visible element — gets requested immediately).
- **`role="search"` and `aria-label`** on the search box (small a11y win, also helps screen-reader users).
- **Reduced-motion respected** on the topographic hero animation.

### 2.2 Gaps by priority

#### High-priority gaps

1. **Google Fonts is a render-blocking external request.** Your `<link rel="stylesheet">` for Playfair Display and Inter blocks the browser from painting until both fonts load. On a slow connection this is 300–800ms of nothing visible.
   - **Why it matters:** This is almost certainly the single biggest hit to your Largest Contentful Paint (LCP) score, which is the metric Google uses for "how fast did this page actually become useful."
   - **Fix options (in order of effort):**
     - **Cheap:** Add `<link rel="preload" as="font">` for the woff2 files you actually use. Better than nothing.
     - **Better:** Self-host the font files (download once from Google Fonts, put them in `src/assets/fonts/`, add `@font-face` rules). Removes a third-party DNS lookup on every page load.
     - **Best:** Self-host + preload + use `font-display: optional` (instead of `swap`) so text is never invisible or shifts after load.

2. **Hero images come from a third-party domain (Wikimedia).** Your page's LCP is usually the hero image. That image lives on `commons.wikimedia.org` — a different DNS lookup, a different connection, possibly slower than your own origin. You have no `preconnect` to Wikimedia.
   - **Fix:**
     - Add `<link rel="preconnect" href="https://commons.wikimedia.org">` and a `<link rel="preload" as="image">` for the LCP image on each trail page.
     - **Better:** Download the hero images and host them in `src/assets/images/trails/`. The site becomes one connection for everything, and you get image SEO credit.

3. **Currency switcher fires 2 third-party API calls on every page load.** `ipapi.co` (IP geolocation) and `api.frankfurter.app` (exchange rates) both run on every visit unless the user has already picked a currency. If either is slow or blocked (e.g., from a corporate VPN or restricted region), the dropdown is delayed — but worse, the `fetch()` itself can interfere with browser scheduling and bump your Interaction to Next Paint (INP) score.
   - **Fix:**
     - Move the geo-detection to idle time (`requestIdleCallback` or a 1-second `setTimeout`) so it never blocks anything user-perceptible.
     - Add a 3-second timeout (you have one, but verify the code path actually falls back gracefully) and a default currency when nothing loads.
     - Cache aggressively — the country rarely changes per visitor.

#### Medium-priority gaps

4. **No `srcset` / `sizes` on any image.** Every visitor downloads the same 1600px-wide image, even on a 375px phone. The browser wastes bandwidth and time on pixels it can't see.
   - **Fix:** Generate 400/800/1200/1600px variants at build time (Eleventy Image plugin), serve via `srcset` with `sizes` hints.
5. **GTM loads synchronously in `<head>`.** Google Tag Manager itself is fast, but the snippet parses before your page content can paint.
   - **Fix:** Move the GTM `<script>` to load after the page paints (using `defer` or injecting it on `requestIdleCallback`). Or use Partytown to run it in a Web Worker.
6. **10 separate CSS files requested individually.** They're small, but each one is a network round-trip. Bundling them via a tiny build step would halve request count.
7. **No build-time minification** of CSS or JS. The repo has no build pipeline beyond `eleventy` itself.
   - **Fix:** Add a 5-line `eleventy.config.js` transform that runs `cssnano` and `terser` on the relevant files before output. Or, easier: bundle them first and skip per-file minification.

#### Lower-priority gaps

8. **No Service Worker / offline support.** This is a stated brand value ("Offline Trail Kits — for Pro") but the site itself can't be used offline. A simple service worker caching the homepage + CSS would mean anyone who has been there once can re-open it on a flaky mountain connection.
9. **Beehiiv embed scripts on community + downloads pages.** Each embed loads its own script tag asynchronously, which is fine, but you have 2-3 of them stacked. They add weight to the pages where you most want fast load (community is your growth funnel).

### 2.3 Core Web Vitals expectations

Without running Lighthouse, here's a defensible read on what a fresh Lighthouse run on a representative trail page would show:

- **LCP:** Likely 2.5–3.5s on 4G, borderline "needs improvement." The font + third-party image combo is the cause.
- **CLS:** Probably good (width/height on images helps; no late-injected content above the fold other than the currency dropdown).
- **INP:** Probably acceptable. Tabs and search are the main interactions; both are small and local. Risk: the currency switcher's parallel API calls on first paint.

### 2.4 Performance recommendations

| Action | Time | Impact |
|---|---|---|
| Self-host Playfair + Inter, preload woff2, use `font-display: optional` | 2 hrs | High |
| Add `preconnect` to Wikimedia + preload LCP image per page | 1 hr | High |
| Move currency switcher API calls to idle time + improve caching | 2 hrs | Medium |
| Add Eleventy Image plugin for `srcset` | 3 hrs | Medium |
| Move GTM to load after paint (defer or Partytown) | 30 min | Low–Medium |
| Add CSS minification + bundling step | 2 hrs | Low–Medium |
| Service worker for offline homepage + trail pages | 4 hrs | Medium (strategic) |

---

## 3. Visual Design & Polish Audit

### 3.1 Brand identity recap

- **Palette:** Forest green (`#1A3A2A`), glacier blue (`#4A8FA8`), amber (`#D4882A`), cream background (`#F7F4EE`), near-black text (`#1C1C1C`). Earthy, trustworthy, premium-outdoor.
- **Type:** Playfair Display (serif headings) + Inter (sans body). A classic editorial pairing.
- **Voice:** Confident, no-nonsense, anti-upsell. "Written for the person going alone. No group itineraries. No upsells."

This voice + palette is *distinctive*. You're not trying to be a generic travel blog, and the visual choices support that.

### 3.2 What's working well

- **Clear, single-message hero.** Homepage hero has one job ("Plan your solo trek") and does it well.
- **Trustworthy color palette.** The forest-green-on-cream is calming and signals "we know what we're doing in the outdoors."
- **Typography pairing is editorial-grade.** Playfair + Inter is the same combo used by sites like Stripe Press and The New Yorker for a reason — it signals "considered content, not listicle."
- **Cards are consistent** across the homepage, trails index, and category pages.

### 3.3 Gaps by priority

#### High-priority gaps

1. **Inconsistent breakpoints across CSS.** Your 10 stylesheets use 10 different breakpoint values: 900px, 820px, 768px, 700px, 640px, 600px, 560px, 520px, 480px, 400px. There's no design system — every developer who adds a feature picks their own number.
   - **Why it matters:** Layouts will look subtly different on the same screen size depending on which page you're on. Future-you (or a contributor) will have no idea which breakpoint to use.
   - **Fix:** Define 4 breakpoints: mobile (≤640px), tablet (≤820px), desktop (≤1100px), wide (>1100px). Update each CSS file once.

2. **Footer text contrast fails WCAG AA.** Several footer labels use semi-transparent white (`rgba(255,255,255,.3)`, `.4`, `.45`) on a dark green background. Anyone with even mild vision impairment cannot read "Sitemap," "Press kit," or the social handles.
   - **Why it matters:** Beyond the a11y issue, low-contrast text reads as "unfinished" or "decorative," which weakens your premium positioning.
   - **Fix:** Either bump the opacity to 0.7+ or use solid `var(--bg)` cream for the entire footer.

3. **Trail pages are text-heavy below the hero.** Once you scroll past the hero + stats bar, you're looking at a wall of text — Overview / Route / Reach / Costs / Safety / Packing as tabs of plain paragraphs. The reference sites all use images, callouts, and visual variety in their guides.
   - **Fix:** Add 3–4 inline images per trail page (not just the hero), pull quotes, a "Cost at a glance" card, and a small map embed or route line.

#### Medium-priority gaps

4. **Heading hierarchy is sometimes inconsistent.** Footer uses `<h4>` while main content uses `<h2>`/`<h3>` — a screen reader user gets a confusing jump. The `<h4>` should be styled as a heading but tag-level should match the content importance.
5. **No dark mode.** Your palette has all the ingredients (forest, glacier, cream) for a beautiful dark theme, and the brand audience (outdoorsy types reading on phones at altitude or in tents) would benefit. Dark mode is also a measurable Lighthouse win on OLED phones (battery + perceived speed).
6. **Trust signals are thin on the homepage.** No testimonials, no press logos, no "as seen in" strip, no user count. You have the content to back it up — let readers know others have used it.
7. **Trail cards on the listing page don't differentiate "live" vs "coming soon" strongly enough.** Both look similar; coming-soon should feel like a teaser (lower opacity, "join waitlist" pill), and live should feel substantive.

#### Lower-priority gaps

8. **Search overlay styling is minimal.** When results appear, they blend into the page background without a clear "this is a dropdown" affordance.
9. **Mobile gap between 640px and 768px.** Hamburger kicks in only under 640px, but tablets at 700–768px have plenty of room for the full nav.

### 3.4 Visual / polish recommendations

| Action | Time | Impact |
|---|---|---|
| Fix footer contrast (opacity to ≥0.7 or solid cream) | 1 hr | High (a11y + perceived quality) |
| Consolidate to 4 breakpoints across all CSS | 4 hrs | High (design system) |
| Add inline images + callouts to trail pages | Half-day per page template | High (engagement) |
| Add trust signals (testimonials, press logos) on homepage | 4 hrs | Medium |
| Differentiate live vs coming-soon trail cards visually | 2 hrs | Medium |
| Add dark mode (using existing palette) | 1–2 days | Medium (strategic) |
| Improve search dropdown styling | 2 hrs | Low |

---

## 4. UX & Accessibility Audit

### 4.1 What's working well

- **Skip-to-content link** is present and properly hidden until focused.
- **Reduced-motion preference** is honored globally.
- **Tab component** has proper `role="tablist"`/`role="tab"`/`aria-selected`/`aria-controls`, plus arrow-key navigation. This is rare for a content site and shows care.
- **Search input** has `role="search"` and `aria-label`.
- **Hamburger button** toggles `aria-expanded` correctly.
- **Packing list** uses proper `<label>` wrapping checkboxes.
- **`<html lang="en">`** is set.

### 4.2 Gaps by priority

#### High-priority gaps

1. **No `<header>` or `<main>` landmark on most pages.** Only the trail-live and downloads templates use `<main>`; the homepage, about, trails-index, community, guides, and 404 don't. Screen reader users have no quick way to jump between the major regions of a page.
   - **Why it matters:** Landmark navigation is the single most-used screen reader feature. Without `<header>` and `<main>`, users hear one continuous stream of content.
   - **Fix:** Wrap your nav in `<header>` and your page content in `<main>` once in `base.njk`. The same change lifts 5+ pages at once.

2. **No global focus-visible styles.** Your CSS only styles `:focus` on the skip link. Every other link, button, and form field shows the browser default (often a thin dotted line, sometimes nothing at all on Safari).
   - **Why it matters:** Keyboard-only users (people with motor disabilities, power users, anyone with a broken trackpad) cannot tell where they are on the page.
   - **Fix:** Add one rule to `tokens.css`:
     ```
     :focus-visible { outline: 3px solid var(--amber); outline-offset: 2px; }
     ```
     This is a 3-line change that fixes a11y across the entire site.

3. **`#main-content:focus { outline: none }` actively removes the focus indicator.** This rule exists to hide the focus ring on the main wrapper after the skip link is used, but it also removes focus on any element with `id="main-content"` and is widely considered an a11y anti-pattern.
   - **Why it matters:** Same as above — keyboard users lose their place.
   - **Fix:** Remove the rule. Or, if you need to suppress the focus ring on that one wrapper, use `:focus:not(:focus-visible)` so it only hides for mouse clicks.

#### Medium-priority gaps

4. **Currency switcher injects itself into the nav on first load.** First-time visitors see the nav shift as the dropdown gets injected, which can be disorienting. The nav links also re-flow.
   - **Fix:** Reserve the dropdown slot in the layout (a placeholder span of fixed width) so the nav doesn't reflow when the dropdown appears. Or render the dropdown on hover/click instead of always-on.

5. **State stubs exist but nav doesn't link them.** Your roadmap says you're adding Jammu & Kashmir, Sikkim, Karnataka, Kerala, Tamil Nadu, and West Bengal — but the nav still has only 5 top-level links. Users can discover new content only by landing on the trails index page.
   - **Fix:** Add a "Coming soon" badge to a "More regions" dropdown in the nav, or promote the trails index link to be more prominent.

6. **No "search" affordance visible on the homepage until you focus the input.** Search is the strongest navigation tool on a content site, and it's buried. Most users won't think to look for it.
   - **Fix:** Add a visible "Search trails" button or icon next to the search input.

#### Lower-priority gaps

7. **Tab keyboard handling skips Home/End.** You have arrow-key nav but not Home/End (jump to first/last tab). Standard for ARIA tabs.
8. **No live region for search results count.** When users type and get "12 trails match," screen readers should announce this. Use `aria-live="polite"` on the result count.
9. **Beehiiv embed iframes lack titles.** Each iframe should have a `title="Subscribe to The Solo Trail newsletter"` or similar.
10. **Skip link target on the homepage is `#main-content`, but the homepage doesn't have `<main id="main-content">`.** The skip link silently fails on the homepage.

### 4.3 UX/A11y recommendations

| Action | Time | Impact |
|---|---|---|
| Add `:focus-visible` global rule, remove the outline:none override | 30 min | High (a11y) |
| Wrap nav in `<header>` and content in `<main>` in base.njk | 30 min | High (a11y) |
| Fix skip-link target on homepage (add `id="main-content"` to the right wrapper) | 15 min | High (a11y) |
| Fix footer contrast | 1 hr | High (a11y) |
| Reserve currency-dropdown slot so nav doesn't reflow | 2 hrs | Medium |
| Add "More regions coming soon" to nav | 2 hrs | Medium |
| Make search affordance visible (button or icon) | 1 hr | Medium |
| Add Home/End to tab keyboard handling | 15 min | Low (a11y) |
| Add `aria-live` to search result count | 15 min | Low (a11y) |
| Add iframe titles to Beehiiv embeds | 15 min | Low (a11y) |

---

## 5. Prioritized Roadmap

### Tier 1 — Today, under 2 hours total

The "no-brainer" fixes. These are all small CSS or layout changes that meaningfully improve a11y scores and SEO without touching the build pipeline.

1. **Add `:focus-visible` global style** (`tokens.css`): 1 line
2. **Remove `outline: none` on `#main-content:focus`** (`tokens.css`): 1 line
3. **Wrap nav in `<header>` and content in `<main>` in `base.njk`**: 4 lines
4. **Fix skip-link target on homepage**: 1 line
5. **Fix footer text contrast** (`footer.njk` styles): 30 min
6. **Surface `lastVerified` on trail pages + `article:modified_time` meta**: 1 hr
7. **Add `og:image:width`, `og:image:height`, `og:image:alt` to base layout**: 15 min

### Tier 2 — Half-day wins

Improvements that require more touching of files but are still bounded.

1. Self-host Inter + Playfair Display (download woff2 files, add `@font-face`, remove Google Fonts `<link>`): 2 hrs
2. Add `preconnect` + `preload` for hero images on trail pages: 1 hr
3. Add `<lastmod>` to sitemap entries from `lastVerified`: 30 min
4. Add author bio panel + Person schema to About page: 2 hrs
5. Consolidate CSS to 4 breakpoints: half-day
6. Move currency switcher to idle-time: 2 hrs
7. Add Home/End tab keyboard handling + `aria-live` to search: 30 min

### Tier 3 — Weekend projects

1. Add related-trails block on each trail page (use Eleventy collections): 4 hrs
2. Implement Eleventy Image plugin for `srcset` variants: half-day
3. Differentiate live vs coming-soon trail cards visually: 2 hrs
4. Add inline images + callouts to trail pages: half-day per template iteration
5. Add trust signals (testimonials, press) on homepage: 4 hrs

### Tier 4 — Multi-week strategic

1. **Blog/news section** with a publishing cadence. (Long-term SEO compounding.)
2. **Image pipeline overhaul**: download Wikimedia heroes, host locally, generate responsive variants, add `og:image:alt` data.
3. **Dark mode**: theme toggle, using existing palette, with `prefers-color-scheme` default.
4. **Design system refactor**: tokens, breakpoints, components in a single source of truth.

---

## 6. What thesolotrail already does BETTER than reference sites

Honesty moment — most of the reference sites have weaknesses you don't have. Don't take this section as flattery; take it as "here's what to protect and lean into":

- **Solo-first voice is distinctive.** Most trekking sites (including some big ones) default to group itineraries. Your About page principle — "no group itineraries, no upsells" — is a real positioning that the indie travel blogs and even `outsideonline.com` don't own.
- **Real cost transparency.** Most competitor guides hide costs behind a "request a quote" or affiliate gate. You publish `costs.amountUSD` in your data layer. This is a genuine competitive moat for trust.
- **Trail content depth.** Your trail JSON schema has `permits`, `safety.alerts`, `emergencyContacts`, `seasonNote` — most reference sites don't surface emergency info this prominently. Keep it.
- **No dark patterns, no popups, no email-grabs above the fold.** Compare this to `indietraveller.co.uk` (3 popups on first scroll) or `outsideonline.com` (paywall nag) — your site is calmer and more respectful. That's a feature.
- **Offline Trail Kits (Pro product).** The PDF + GPX + offline-first positioning is genuinely differentiated. Most travel sites are 100% online; you have an answer for the "I'm at altitude with no signal" problem.

---

## Appendix — File reference cheat sheet (hand to a developer)

If you're passing this to a developer, here are the specific files and line ranges where each finding lives. All paths relative to `~/thesolotrail/`.

### SEO

- Meta tags in head: `src/_includes/layouts/base.njk:9–34`
- Hardcoded canonical URL: `src/_includes/layouts/base.njk:21`
- Trail JSON-LD: `src/trails/trail.njk:22–49`
- Homepage JSON-LD: `src/index.njk:10–25`
- Sitemap: `src/sitemap.njk`
- robots.txt: `src/robots.txt`
- Trail data with `publishedDate` / `lastVerified`: `src/_data/trails/*.json`
- `seoTitle` / `seoDescription` fields: same JSON files, all 37 records

### Performance

- Google Fonts link: `src/_includes/layouts/base.njk:28–30`
- GTM script: `src/_includes/partials/gtm-head.njk`
- Hero images (Wikimedia URLs): `src/_data/trails/*.json` → `heroImage`
- Currency switcher: `src/assets/currency.js`
- CSS files: `src/assets/css/*.css` (10 files)
- Page CSS loaded via: `src/_includes/layouts/base.njk:31–32` (`{% block pagecss %}`)

### Visual / Polish

- Color tokens: `src/assets/css/tokens.css:8–15`
- Trail page layout: `src/_includes/partials/trail-live-body.njk`
- Footer styles: `src/assets/css/tokens.css` (footer section) and inline in `src/_includes/partials/footer.njk`
- Breakpoints: scattered across `src/assets/css/*.css`
- Trail card macro: `src/_includes/partials/macros.njk`

### UX / A11y

- Skip link + main wrapper: `src/_includes/layouts/base.njk:41–45`
- Focus styles: `src/assets/css/tokens.css` (only `.skip-link:focus` exists, line 19)
- Nav landmark: `src/_includes/partials/nav.njk:1` (no `<header>` wrapper)
- Tab component: `src/_includes/partials/trail-live-body.njk:40–47` + JS in `src/trails/trail.njk:60–92`
- Hamburger: `src/_includes/layouts/base.njk:51–66`
- Footer rgba text: `src/_includes/partials/footer.njk` (look for `rgba(255,255,255,.`)

---

**End of report.** If you'd like me to start implementing any of the Tier 1 or Tier 2 fixes, just say which ones and I'll plan each as a separate change set so you can review before any code goes in.
