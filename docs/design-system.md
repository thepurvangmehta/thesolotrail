# Design system — "Ink & Paper"

The single source of truth is `src/assets/css/tokens.css`. Every page stylesheet
loads it first and must consume tokens rather than literal colours. There are
currently **zero** hardcoded hex values outside that file; keep it that way.

## Why this palette

Replaced the original forest-green/glacier-blue scheme. Green is the default for
outdoor brands, which makes it invisible, and it fought with the photography —
Himalayan snow/rock is cool-grey and Sahyadri monsoon shots are already saturated
green, so a green UI either clashed or disappeared. Near-black ink on warm paper
stays neutral behind both photo sets, and it reads editorial rather than
adventure-retail.

One saturated accent only (terracotta). It earns attention because nothing else
competes for it.

## Colour rules

**Named by role, never by hue.** `--ink`, not `--charcoal`. A hue name becomes a
lie the moment the palette changes, and the lie is invisible — this repo already
shipped `.htag.green` rendering terracotta before it got caught. If you find
yourself writing `.something-blue`, name the role instead.

| Group | Tokens | Use for |
|---|---|---|
| Ink | `--ink` `--ink-soft` `--ink-deep` `--ink-pale` | Dark brand surfaces: nav, hero panels, footer, and the pale tint on paper |
| Accent | `--accent` `--accent-hover` `--accent-light` `--accent-light-hover` `--accent-pale` `--accent-pale-border` `--accent-ink` | Actions and wayfinding **only** |
| Paper | `--bg` `--surface` `--bg-soft` `--border` `--border-soft` | Light surfaces and dividers |
| Text | `--text` `--text-mid` `--text-muted` | Body copy hierarchy |
| Status | `--good` `--warn` `--danger` (+ `-pale`, `-hover`, `-light` variants) | Functional signals |

Three rules that are easy to get wrong:

1. **`--accent-light` is for use on ink, `--accent` for use on paper.** They are
   not interchangeable; each is the only one of the pair that clears contrast on
   its background.
2. **Facts are neutral, judgements are coloured.** Altitude, distance, and
   duration chips use `--ink-pale` + `--text-mid`. Only difficulty gets the
   good/warn/danger scale. Colouring a metric makes it look like a call to action.
3. **`--text-muted` is for text on `--bg` or `--surface` only.** On a tinted chip
   (`--border-soft`, `--ink-pale`) it drops below 4.5:1 — use `--text-mid` there.
   Status badges are information, not de-emphasised metadata.

Status colours are deliberately low-chroma so they read as information. `--danger`
is a cooler, darker red than the accent, and danger always appears as a pale-background
alert card while actions appear as solid accent fills — the treatment carries as
much of the distinction as the hue does.

## Type

One typeface: **Inter** (self-hosted variable, weight 100–900, OFL-1.1) for
everything — headings, wordmark, UI, body. `--font-display` and `--font-ui` are
kept as separate tokens so headings and body copy could be retuned independently
later, but today both resolve to the same font stack.

This replaced an earlier Instrument Serif / Inter pairing. The serif read more
editorial-elegant than the "clean, modern, not trendy" brief called for, and its
single weight meant every heading was capped at 400 — no bold available without
the browser faking one. Inter's full weight range means headings can carry real
weight (600–700) instead of relying on size alone, which is what makes the
type now read as confident rather than quiet. Rough scale: hero/section headings
sit at 700, card and component titles at 600, body text at 400–500. Bumping a
heading's weight is fine; do not set `font-style: italic` anywhere — Inter's
self-hosted file has no italic variant, so the browser would synthesise a fake
oblique, which is the exact "faked" look the weight rule above exists to avoid.

Fonts live in `src/assets/fonts/` and are `<link rel=preload>`ed in `base.njk`.
Adding a family means adding the woff2 — do not add an `@font-face` pointing at a
file that isn't in the repo, and do not fetch from Google's CDN at runtime.

## Verifying a change

`docs/` has no build step, but the palette has an automated check. After touching
colours, re-run the pixel-accurate contrast audit: render each page twice (once with
all text forced transparent), sample the real composited background behind every text
node, and compare. Computed-style checks are not sufficient — they cannot see
`::before` overlays, gradients, or photos, which is exactly where contrast breaks.

Two known audit false positives, so you don't chase them:

- `.hero-eyebrow` — the flanking decorative rules sit inside the element box, so
  sampling hits the accent line rather than the background.
- `.nav-cta` — sticky-positioned; the sampler can read a stale row. Its computed
  contrast is 5.96:1.

Also check: any container holding an image with text over it needs a solid
`background-color` fallback. Without it, a slow or failed image leaves white text on
white — that was a real bug on all three hero components.

## Mobile: a row of controls that doesn't fit is a scroll strip, not a wrap

When a row of chips/tabs/pills doesn't fit a narrow viewport, it must scroll
horizontally on one line (`overflow-x: auto; flex-wrap: nowrap`, hidden
scrollbar), not wrap onto a second row. A second row silently drops visual
grouping — e.g. a difficulty filter wrapping mid-group makes "Challenging" and
"Expert" look demoted under "Easy"/"Moderate" rather than read as siblings. The
trek-page stats bar and the trails-index filter bar both use this pattern; copy
it rather than inventing a new one.

The gotcha if you do this yourself: `overflow-x: auto` on a flex item does
nothing if the item's own `min-width` is left at its default `auto` — a flex
item's automatic minimum is its content size, so the item refuses to shrink
below its full unwrapped content width and pushes its own container wider than
the viewport instead of scrolling internally. Explicit `min-width: 0` (or in
stubborn cases, `width: 100%` alongside it) is required on the scrolling element
itself, not just its parent.

## Icons

Default to none. An icon earns its place only when it substitutes for a label
(a flag standing in for a country name) or signals severity (the alert-box
danger/warning/info glyphs). A decorative icon on every item in a list — one per
feature card, one per bullet — adds visual noise without adding information;
prefer a type-only treatment (weight, a rule, a border) instead.
