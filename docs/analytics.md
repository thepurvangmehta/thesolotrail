# Analytics setup — what to do in GTM and GA4

The site now pushes named events onto `window.dataLayer` (see `src/assets/analytics.js`).
**None of them reach GA4 until you create the matching tags in GTM.** The code side is
done; this is the console-side checklist.

Container: `GTM-WKH7834H`

---

## Why this exists

Before this, the GTM container fired pageviews and nothing else. That meant Google
Analytics could tell you *how many* people visited, but not:

- which trek pages actually send people to Gumroad (i.e. which content earns money)
- whether anyone uses the homepage search, and what they search for that we don't have
- which affiliate links get clicked
- whether people read the safety sections or bounce off the overview

Those are the questions worth answering, and all of them are now instrumented.

---

## Step 1 — turn on GA4 Enhanced Measurement (2 minutes, no code)

GA4 → Admin → Data Streams → your web stream → **Enhanced measurement: ON**.

This alone gives you scroll, site search, outbound clicks and file downloads
generically. Our custom events are more specific and better segmented, but turn
this on regardless — it costs nothing and covers gaps.

## Step 2 — create one GA4 Event tag per event in GTM

For each event below: **Tags → New → GA4 Event**, set the event name, and use a
**Custom Event** trigger whose event name matches exactly. Add the listed
parameters as **Event Parameters**, each reading a Data Layer Variable of the
same name.

| Event name | Fires when | Parameters | Mark as conversion? |
|---|---|---|---|
| `monetised_click` | Click to Gumroad, SafetyWing, GetYourGuide, Amazon, Beehiiv | `link_url`, `link_domain`, `link_text` | **Yes** |
| `outbound_click` | Click to any other external site | `link_url`, `link_domain`, `link_text` | No |
| `file_download` | Click a `.gpx` / `.pdf` / `.zip` | `file_name`, `file_extension`, `link_text` | **Yes** |
| `site_search` | Homepage search used | `search_term`, `result_count`, `method` | No |
| `search_result_click` | A search result is clicked | `search_term`, `destination` | No |
| `guide_tab_view` | A trek page tab is opened | `tab_name` | No |
| `faq_open` | An FAQ item is expanded | `question` | No |
| `guide_scroll` | 50% / 90% down a trek page | `percent_scrolled` | No |
| `contact_click` | A `mailto:` link is clicked | `link_url` | **Yes** |

Every event also carries page context automatically: `page_type`, and on trek
pages `trek_id`, `trek_region`, `trek_country`. **Add these three as parameters on
every tag** — they're what let you answer "which region's pages convert best."

## Step 3 — register custom dimensions in GA4

GA4 → Admin → Custom definitions → Create custom dimension (scope: Event) for:

`page_type`, `trek_id`, `trek_region`, `trek_country`, `search_term`,
`result_count`, `link_domain`, `tab_name`, `percent_scrolled`

Without this step the parameters arrive but you can't segment or report on them.
This is the step people usually miss.

## Step 4 — connect Google Search Console

Separate product from GA4, and the one that actually answers "which keywords are
we ranking for." GA4 shows behaviour *after* arrival; Search Console shows
impressions, average position and click-through per query.

Verify `thesolotrail.com`, submit `https://thesolotrail.com/sitemap.xml`, then check:
- **Coverage** — are all 37 trek pages plus the 2 region hubs actually indexed?
- **Performance → Queries** — are we getting impressions for "solo trekking
  maharashtra" and similar?

If pages aren't indexed, no amount of keyword work matters. Check this first.

---

## Step 5 — UTM discipline (the thing that silently ruins attribution)

There's no backend, so GA4 can't reconstruct a traffic source once it's lost to
`(direct)`. Any link you control off-site should carry UTM parameters. Keep a
simple sheet:

```
https://thesolotrail.com/solo-trekking-maharashtra/?utm_source=reddit&utm_medium=social&utm_campaign=sahyadri_launch
```

Convention worth sticking to:
- `utm_source` — the platform (`reddit`, `pinterest`, `instagram`, `newsletter`)
- `utm_medium` — the kind of link (`social`, `email`, `referral`, `guest_post`)
- `utm_campaign` — what you were doing (`sahyadri_launch`, `monsoon_2026`)

Never put UTMs on internal links — it restarts the session and corrupts your data.

---

## What to actually look at once data accumulates

Give it 2–4 weeks, then ask:

1. **`monetised_click` by `trek_id`** — which guides earn. Write more like those.
2. **`site_search` where `result_count` = 0** — literal list of treks people want
   that you don't cover yet. This is your content roadmap, for free.
3. **`guide_tab_view` by `tab_name`** — if Safety dominates, lead with safety.
4. **`guide_scroll` at 90% vs 50%** — whether people finish guides or bail.
5. **Search Console queries vs. GA4 landing pages** — where you rank but nobody
   clicks (fix the title/description) vs. where they click but bounce (fix the page).
