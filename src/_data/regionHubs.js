const getTrails = require("./trailsList.js");

/**
 * Region hub pages — the keyword-targeted landing pages for "solo trekking in X".
 *
 * These exist for SEO reasons as much as navigational ones: 37 individual trek
 * pages each rank for their own trek name, but nothing on the site was targeting
 * the regional head terms ("solo trekking Maharashtra", "solo trekking Nepal").
 * A hub page links out to every trek in its region and back, which funnels
 * authority in both directions.
 *
 * Add a hub by adding an entry here — the page, its ItemList schema, and its
 * sitemap entry all generate from this data.
 */
const HUBS = [
  {
    slug: "solo-trekking-maharashtra",
    h1: "Solo Trekking in Maharashtra",
    seoTitle: "Solo Trekking in Maharashtra — 31 Sahyadri Treks, Fully Mapped",
    seoDescription:
      "A complete solo trekker's guide to Maharashtra: 31 Sahyadri treks across hill forts, jungle trails, peaks, monsoon waterfalls and Konkan sea forts. Real costs, permits, and honest safety notes.",
    intro:
      "Maharashtra is the best place in India to start trekking alone. The Sahyadri range packs hundreds of hill forts, jungle trails and monsoon waterfalls within a few hours of Mumbai and Pune, most of them reachable by train and shared jeep, and most needing no permit at all. This is every trek we've mapped in the state, grouped by the kind of terrain you're after.",
    seasonNote:
      "One thing that catches out trekkers who've only done Himalayan routes: Maharashtra's best season is the monsoon (June–September), when the waterfalls run and the hills turn green. It's also the most dangerous — slick rock, poor visibility, flash floods in the canyons. A few treks here invert that rule entirely, and we flag which ones on each guide.",
    filter: (t) => t.region === "Maharashtra",
    groupBy: "category",
    faqs: [
      {
        q: "Is solo trekking safe in Maharashtra?",
        a: "For most Sahyadri treks, yes — routes like Lohagad, Sinhagad, Korigad and Rajmachi are short, well-marked and busy enough that you're rarely truly alone. The exceptions matter though: Kalavantin Durg's summit pinnacle, Harihar Fort's rock-cut steps, Alang-Madan-Kulang and Sandhan Valley all involve exposed or technical sections where we specifically advise against going alone. Each guide says plainly which category it falls into.",
      },
      {
        q: "Do I need a permit to trek in Maharashtra?",
        a: "Most Sahyadri forts need nothing at all — they're forest-department land with no ticketing. The exceptions are Vasota (mandatory advance Forest Department permission plus ID, inside Koyna Wildlife Sanctuary), Kaas Plateau (timed online slot booking in bloom season), Karnala (bird sanctuary entry fee) and Raigad (ticketed monument). Bhimashankar sits inside a wildlife sanctuary with a nominal vehicle fee.",
      },
      {
        q: "Which Maharashtra trek is best for a first solo trek?",
        a: "Lohagad, near Lonavala. It's a 45-minute climb on a well-defined path, reachable by local train to Malavli plus a short rickshaw ride, needs no permit, and is busy enough that help is always nearby. Sinhagad near Pune and Korigad are the next-easiest options.",
      },
      {
        q: "When is the best time to trek in Maharashtra?",
        a: "Monsoon (June–September) for scenery — waterfalls at full flow and green hills — but it's the riskiest season underfoot. October to February is drier, safer and clearer, and is the better window for anything with exposed rock steps or scrambling. March to May is hot and largely unrewarding on most routes.",
      },
      {
        q: "How do I reach Sahyadri trailheads without a car?",
        a: "Almost all of them by train plus shared jeep. Malavli, Karjat, Neral, Kasara, Lonavala and Bhivpuri Road are all on Mumbai's suburban network, and shared jeeps run from those stations to the base villages. The catch is the return leg — shared jeeps thin out by early evening and stop entirely on some routes, so check the last one before you start climbing.",
      },
    ],
  },
  {
    slug: "solo-trekking-nepal",
    h1: "Solo Trekking in Nepal",
    seoTitle: "Solo Trekking in Nepal — Himalayan Treks Without a Guide",
    seoDescription:
      "Solo trekker's guide to Nepal's Himalayan classics — Annapurna Base Camp, Everest Base Camp, Poon Hill and Langtang. Permits, real costs, altitude safety, and where a guide is genuinely optional.",
    intro:
      "Nepal's teahouse treks are among the few high-altitude routes in the world you can genuinely walk alone: you sleep in villages rather than tents, the trails are well-travelled, and the permit system is straightforward if you do it yourself. These are the Himalayan routes we cover, written for someone planning without an agency.",
    seasonNote:
      "Nepal's seasons are the opposite of Maharashtra's: October–November and March–May are the clear windows, and the monsoon is the one to avoid. Altitude, not terrain, is the thing that hurts people here — every guide covers acclimatisation and the signs that mean you descend.",
    filter: (t) => t.country === "Nepal",
    groupBy: null,
    faqs: [
      {
        q: "Can you trek in Nepal without a guide?",
        a: "On the classic teahouse routes covered here — Annapurna Base Camp, Poon Hill, Langtang, Everest Base Camp — independent trekking has long been common and the infrastructure supports it. Rules around mandatory guides have shifted in recent years and are enforced unevenly by region, so confirm the current position with the Nepal Tourism Board or a TIMS office before you fly, rather than trusting any blog post including this one.",
      },
      {
        q: "What permits do I need to trek in Nepal?",
        a: "Typically two: a conservation-area or national-park entry permit (ACAP for Annapurna, Sagarmatha for Everest, Langtang NP), plus a TIMS card. Both are obtained in Kathmandu or Pokhara, cost far less for SAARC nationals including Indians, and need your passport plus passport photos. Everest adds a Khumbu municipality fee.",
      },
      {
        q: "How much does a solo trek in Nepal cost?",
        a: "Annapurna Base Camp runs roughly $400–800 all-in for an independent trekker including permits, domestic transport, teahouses and food — considerably less than an agency package. Teahouse rooms are only a few dollars a night; food is the bigger daily cost and rises with altitude. Full breakdowns are on each trek guide.",
      },
      {
        q: "Is altitude sickness a real risk on these treks?",
        a: "Yes, and it's the main thing that turns a Nepal trek dangerous. Annapurna Base Camp reaches 4,130m and Everest Base Camp 5,364m — both high enough for serious AMS. Every guide here includes acclimatisation pacing and the specific symptoms that mean descend immediately rather than push on. Travel insurance covering helicopter evacuation is not optional above 3,000m.",
      },
    ],
  },
];

module.exports = () =>
  HUBS.map((h) => {
    const trails = getTrails().filter(h.filter);
    return {
      slug: h.slug,
      h1: h.h1,
      seoTitle: h.seoTitle,
      seoDescription: h.seoDescription,
      intro: h.intro,
      seasonNote: h.seasonNote,
      faqs: h.faqs,
      trails,
      count: trails.length,
      liveCount: trails.filter((t) => t.status === "live").length,
      heroImage: (trails.find((t) => t.status === "live") || trails[0] || {}).heroImage || null,
    };
  });
