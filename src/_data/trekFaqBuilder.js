/**
 * Builds the per-trek FAQ list from data already on the trek record.
 *
 * Two rules drove the design here:
 *  1. Nothing is invented. Every answer is assembled from fields that already
 *     exist (safety cards, permits, seasons, guideRequired, gettingThere), so
 *     the FAQ can't drift from the guide above it.
 *  2. Google requires FAQPage answers to be *visible on the page*, not schema-only.
 *     The trail template renders this same array as a visible block and feeds it
 *     to the JSON-LD, so the two can never disagree.
 *
 * Questions target the search intent the keyword research flagged as winnable:
 * "is <trek> safe to trek solo", "do I need a permit for <trek>", etc.
 */
function buildTrekFaqs(trek) {
  if (!trek) return [];
  const faqs = [];
  const name = trek.name;

  // --- Is it safe solo? (the highest-intent query for this site) ---
  if (trek.safety && trek.safety.intro) {
    const soloCard = (trek.safety.cards || []).find((c) => /solo/i.test(c.title));
    const danger = (trek.safety.alerts || []).find((a) => a.type === "danger");
    let a = trek.safety.intro;
    if (danger) a += ` The specific thing to know: ${danger.title.toLowerCase()}. ${danger.body}`;
    else if (soloCard && soloCard.items && soloCard.items.length) a += ` Solo-specific: ${soloCard.items[0]}.`;
    faqs.push({ q: `Is ${name} safe to trek solo?`, a });
  }

  // --- Guide required? ---
  if (trek.guideRequired) {
    faqs.push({
      q: `Do I need a guide for ${name}?`,
      a: `Yes — we treat a guide as effectively mandatory on this route rather than optional. ${
        (trek.gettingThere && trek.gettingThere.permitNote) ||
        "The terrain involves technical or exposed sections beyond what we'd recommend attempting alone."
      }`,
    });
  } else {
    faqs.push({
      q: `Do I need a guide for ${name}?`,
      a: `No — this route can be walked without a guide, which is why it's on a solo-trekking site. That said, hiring a local guide is still worth considering if it's your first time on this terrain or you're going outside the main season.`,
    });
  }

  // --- Permits ---
  if (trek.permits && trek.permits.length) {
    const list = trek.permits
      .map((p) => `${p.name}${p.where ? ` (obtained at ${p.where})` : ""}`)
      .join("; ");
    faqs.push({
      q: `Do I need a permit for ${name}?`,
      a: `Yes: ${list}. ${trek.permits.map((p) => p.notes).filter(Boolean).join(" ")}`.trim(),
    });
  } else if (trek.gettingThere && trek.gettingThere.permitNote) {
    faqs.push({ q: `Do I need a permit for ${name}?`, a: trek.gettingThere.permitNote });
  }

  // --- Best season ---
  if (trek.seasons && trek.seasons.length) {
    const best = trek.seasons.filter((s) => s.badge === "best");
    const avoid = trek.seasons.filter((s) => s.badge === "avoid");
    let a = best.length
      ? `Best in ${best.map((s) => `${s.label} (${s.sub})`).join(" and ")}.`
      : `See the season table on this guide for the full picture.`;
    if (avoid.length) a += ` Avoid ${avoid.map((s) => s.label).join(" and ")} — ${avoid[0].sub.toLowerCase()}.`;
    if (trek.seasonNote) a += ` ${trek.seasonNote}`;
    faqs.push({ q: `When is the best time to trek ${name}?`, a });
  }

  // --- Getting there ---
  if (trek.gettingThere && trek.gettingThere.steps && trek.gettingThere.steps.length) {
    const first = trek.gettingThere.steps[0];
    faqs.push({
      q: `How do I reach ${trek.trailhead} without a car?`,
      a: `${trek.gettingThere.intro ? trek.gettingThere.intro + " " : ""}${first.title}: ${first.body}`,
    });
  }

  // --- Duration ---
  const d = trek.duration || {};
  if (d.min) {
    const span = d.max && d.max !== d.min ? `${d.min}–${d.max} days` : `${d.min} day${d.min > 1 ? "s" : ""}`;
    faqs.push({
      q: `How many days does ${name} take?`,
      a: `${span}${trek.totalDistanceKm ? `, covering roughly ${trek.totalDistanceKm} km` : ""}${
        trek.maxAltitudeM ? ` and topping out at ${trek.maxAltitudeM.toLocaleString("en-US")}m` : ""
      }. ${trek.nearestCity ? `Most trekkers start from ${trek.nearestCity}.` : ""}`.trim(),
    });
  }

  return faqs;
}

module.exports = buildTrekFaqs;
