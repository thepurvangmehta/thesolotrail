/**
 * THE SOLO TRAIL — Central Trail Data Store
 *
 * This file is the single source of truth for all trail data.
 * Every trail page reads from this object — no data lives in HTML.
 *
 * ADDING A NEW TRAIL:
 *   1. Copy the TRAIL_SCHEMA template at the bottom of this file
 *   2. Fill in all required fields (marked with // REQUIRED)
 *   3. Set status to "coming-soon" until the full guide is ready
 *   4. The trail stub page will auto-render from this data
 *
 * FIELD TYPES:
 *   Number prices are always USD (currency.js handles conversion)
 *   Dates are ISO 8601: "YYYY-MM-DD"
 *   Links with "REPLACE:" comments need real affiliate URLs before going live
 */

const TRAILS = {

  /* ================================================================
     ANNAPURNA BASE CAMP
     Status: LIVE — full guide published
  ================================================================ */
  "annapurna-base-camp": {
    // --- Identity ---
    id: "annapurna-base-camp",
    status: "live",          // "live" | "coming-soon" | "planned"
    lastVerified: "2025-11-01",
    publishedDate: "2025-06-01",

    // --- Display ---
    name: "Annapurna Base Camp",
    shortName: "ABC",
    tagline: "Nepal's most complete alpine experience",
    country: "Nepal",
    region: "Gandaki Province",
    difficulty: "challenging", // "easy" | "moderate" | "challenging" | "expert"

    // --- Key Stats (shown on cards + hero) ---
    maxAltitudeM: 4130,
    totalDistanceKm: 110,
    elevationGainM: 3060,
    duration: { min: 7, max: 10 },
    trailhead: "Nayapul",
    nearestCity: "Pokhara",
    guideRequired: false,

    // --- Media ---
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80",
    cardImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",

    // --- SEO ---
    seoTitle: "Annapurna Base Camp Solo Trek Guide — The Solo Trail",
    seoDescription: "Complete solo trekker's guide to Annapurna Base Camp. 10-day itinerary, permits, costs, safety and packing list. No guide required.",

    // --- Seasons ---
    seasons: [
      { label: "Oct – Nov", temp: "5°C to 15°C", badge: "best" },
      { label: "Mar – May", temp: "8°C to 18°C", badge: "best" },
      { label: "Dec – Feb", temp: "-5°C to 10°C", badge: "ok" },
      { label: "Jun – Sep", temp: "10°C to 22°C", badge: "avoid" }
    ],

    // --- Permits ---
    permits: [
      {
        name: "ACAP",
        fullName: "Annapurna Conservation Area Permit",
        priceUSD: 24,
        saarcPriceUSD: 8,   // India, Sri Lanka, Bangladesh, Pakistan, Nepal
        where: "Pokhara (Damside) or ACAP office, Kathmandu",
        notes: "Bring passport + 2 passport photos. Pay in USD or NPR equivalent."
      },
      {
        name: "TIMS",
        fullName: "Trekkers' Information Management System",
        priceUSD: 17,
        saarcPriceUSD: 9,
        where: "Same office as ACAP — collect both at once",
        notes: "Cash only. Queue early (8am) in peak season."
      }
    ],

    // --- Itinerary ---
    itinerary: [
      {
        day: 1,
        from: "Pokhara",
        to: "Tikhedhunga",
        altitudeM: 1480,
        distanceKm: 12,
        duration: "~4 hours",
        elevationGain: "+850m",
        summary: "First steps — river walk and village entry",
        body: "Take an early taxi to Nayapul (30 min from Pokhara). Collect TIMS stamp at Birethanti checkpoint. Gentle walk along the Modi Khola river through Gurung villages to Tikhedhunga. The famous Ulleri stone staircase starts here — rest tonight.",
        tips: ["Start before 9am to avoid midday heat", "Last ATM is in Pokhara — withdraw NPR 40,000+"]
      },
      {
        day: 2,
        from: "Tikhedhunga",
        to: "Ghorepani",
        altitudeM: 2874,
        distanceKm: 10,
        duration: "~5 hours",
        elevationGain: "+1,400m",
        summary: "The Ulleri climb — hardest single day",
        body: "The Ulleri staircase is 3,000+ stone steps. Start at 6am, take it slow, take breaks at every teahouse. The reward is Ghorepani: Dhaulagiri views, good food, and your first taste of high altitude. Hydrate constantly — you gain 1,400m today.",
        tips: ["This is the hardest day — set the pace you'll sustain", "First altitude night: avoid alcohol, drink 3L water minimum"]
      },
      {
        day: 3,
        from: "Ghorepani",
        to: "Tadapani",
        altitudeM: 2630,
        distanceKm: 11,
        duration: "Sunrise hike + 5 hours",
        elevationGain: "+336m / -580m",
        summary: "Poon Hill sunrise then rhododendron descent",
        body: "Wake at 4:30am for the 45-min climb to Poon Hill (3,210m). On clear days: Dhaulagiri, Annapurna South, Machhapuchhre, and Annapurna I all visible at once. After breakfast, descend through dense rhododendron forest (spectacular March–April) to Tadapani.",
        tips: ["Poon Hill entry fee: NPR 100", "Bring all layers — it's cold at the summit before dawn"]
      },
      {
        day: 4,
        from: "Tadapani",
        to: "Chhomrong",
        altitudeM: 2170,
        distanceKm: 9,
        duration: "~4 hours",
        elevationGain: "+605m / -1,065m",
        summary: "Village descent to the sanctuary gateway",
        body: "Descend through forest to the Modi Khola valley, then a sharp climb to Chhomrong — the last major village before the sanctuary. Chhomrong is your last resupply point: buy snacks, top up cash, charge everything. Signal exists here (Ncell, weak). No signal after this.",
        tips: ["Critical stop — stock up on snacks, withdraw cash, charge devices", "Leave a note at your hotel with your next destination"]
      },
      {
        day: 5,
        from: "Chhomrong",
        to: "Bamboo",
        altitudeM: 2310,
        distanceKm: 8,
        duration: "~4 hours",
        elevationGain: "-600m / +740m",
        summary: "Into the gorge — bamboo forest and silence",
        body: "Steep descent from Chhomrong, then climb through increasingly dense bamboo and rhododendron forest. The gorge narrows and the trail becomes quieter. No signal from here. The Sinuwa junction has a fork — follow the GPX waypoint to stay on trail.",
        tips: ["No signal above Chhomrong — load offline maps now", "Check GPX: the Sinuwa junction has a confusing fork"]
      },
      {
        day: 6,
        from: "Bamboo",
        to: "Himalaya Hotel",
        altitudeM: 2900,
        distanceKm: 7,
        duration: "~4 hours",
        elevationGain: "+590m",
        summary: "The gorge narrows — entering the sanctuary",
        body: "The gorge becomes spectacular: waterfalls, towering cliffs, and increasingly high peaks visible above. Himalaya Hotel area has 3 teahouses and is the last comfortable acclimatisation stop before the altitude zone starts at 3,000m+.",
        tips: ["If you have any AMS symptoms, stop here — do not push to Deurali tonight", "Charging costs NPR 200–250 here"]
      },
      {
        day: 7,
        from: "Himalaya Hotel",
        to: "MBC",
        altitudeM: 3700,
        distanceKm: 6,
        duration: "~4 hours",
        elevationGain: "+800m",
        summary: "Avalanche corridor and the high sanctuary",
        body: "IMPORTANT: The Himalaya Hotel–Deurali section passes through an active avalanche corridor. Leave by 6:30am, move quickly, do not linger. After Deurali (3,230m) the landscape opens to glacial moraine. MBC at 3,700m — you're in the high-altitude zone now. Drink constantly.",
        tips: ["Move through the avalanche section before 9am", "Check SpO2 at MBC teahouse — if below 85%, rest a full day here"]
      },
      {
        day: 8,
        from: "MBC",
        to: "ABC and back to MBC",
        altitudeM: 4130,
        distanceKm: 10,
        duration: "~5 hours return",
        elevationGain: "+430m / -430m",
        summary: "Summit — the amphitheatre",
        body: "Leave MBC by 6am. The approach reveals the full amphitheatre: Annapurna I (8,091m), Machhapuchhre (6,993m), Hiunchuli (6,441m) encircling you. Spend 2–3 hours at ABC — morning is clearest before clouds build. Descend to MBC for the night.",
        tips: ["If SpO2 drops below 80% at ABC, descend immediately — no overnight at 4,130m with AMS", "The return to MBC is 1.5 hours — do it before cloud sets in"]
      },
      {
        day: "9–10",
        from: "MBC",
        to: "Nayapul → Pokhara",
        altitudeM: 1070,
        distanceKm: 55,
        duration: "~6 hours/day",
        elevationGain: "-3,060m",
        summary: "Return — fast descent",
        body: "Most trekkers return in 2 days. Day 9: descend to Chhomrong. Day 10: push through to Nayapul and taxi to Pokhara (arrive by 4pm). Trekking poles are essential on the Ulleri descent — the stone steps are harder going down on tired knees.",
        tips: ["Knees: poles mandatory for the Ulleri descent", "Pokhara celebration dinner is a ritual — the Busy Bee and Caffe Concerto near Lakeside"]
      }
    ],

    // --- How to Get There ---
    gettingThere: {
      intro: "All roads lead to Pokhara. From there, it's a 30-minute drive to the trailhead.",
      steps: [
        { title: "India → Kathmandu", body: "Fly direct from Delhi (2.5h), Mumbai (3h), Bangalore (3.5h). IndiGo, Air India, and Himalaya Airlines all operate this route. Book 3–4 weeks ahead for reasonable fares." },
        { title: "Kathmandu → Pokhara", body: "Yeti/Shree Airlines domestic flight: 25 min, ~$70–100 one-way. Book in advance — sells out in peak season. Tourist bus alternative: ~$10, 6–7 hours." },
        { title: "Pokhara → Trailhead", body: "Shared taxi to Nayapul: ~NPR 800. Private jeep to Kande (saves a day): ~NPR 1,200. Book from Pokhara Lakeside the evening before." }
      ],
      permitNote: "Get ACAP + TIMS permits in Pokhara (ACAP office, Damside area) on your arrival day. Office opens 8am. Bring passport, 2 photos, and USD/NPR cash."
    },

    // --- Costs (USD base, currency.js converts) ---
    costs: {
      permits: [
        { item: "ACAP permit", note: "SAARC nationals pay $8", amountUSD: 24 },
        { item: "TIMS card", note: "Trekkers' Information Management System", amountUSD: 17 }
      ],
      transport: [
        { item: "Flight: India → Kathmandu (one-way)", note: "Varies by origin and timing", amountUSD: 120 },
        { item: "Flight: Kathmandu → Pokhara", note: "Yeti/Shree Airlines", amountUSD: 85 },
        { item: "Taxi: Pokhara → Nayapul / Kande", note: "Shared taxi or private jeep", amountUSD: 10 }
      ],
      onTrail: [
        { item: "Teahouse room (per night)", note: "Higher at altitude — this is average", amountUSD: 4 },
        { item: "Meals (3 per day)", note: "Dal bhat, noodles, eggs", amountUSD: 12 },
        { item: "Charging fee (per device)", note: "Varies by altitude", amountUSD: 2 }
      ],
      extras: [
        { item: "Travel insurance (with heli evac)", note: "Non-negotiable — heli costs $3–5K", amountUSD: 50 },
        { item: "Poon Hill entry fee", note: "If going via Ghorepani route", amountUSD: 1.2 },
        { item: "Hot shower at teahouses", note: "Optional — NPR 200–400/shower", amountUSD: 2.5 }
      ]
    },

    // --- Safety ---
    safety: {
      intro: "ABC is well-trodden and generally safe. But altitude, weather, and solo logistics carry real risks. Know these before you go.",
      alerts: [
        {
          type: "danger",
          title: "Avalanche corridor: Himalaya Hotel → Deurali",
          body: "This section passes through an active avalanche zone. Move through early (before 9am), quickly, and do not linger. An April 2025 avalanche near Deurali killed a trekker. Do not take this lightly."
        }
      ],
      cards: [
        {
          title: "Before you leave",
          items: ["Buy travel insurance with helicopter evacuation cover", "Share your full itinerary with someone at home", "Register at each ACAP checkpoint (they track you)", "Download offline maps (OsmAnd or Gaia GPS)"]
        },
        {
          title: "On the trail",
          items: ["Start trekking by 7am — afternoons cloud over", "Never skip meals or water above 3,000m", "Tell your teahouse your next day's plan", "Carry a basic first aid kit and blister supplies"]
        },
        {
          title: "Solo-specific",
          items: ["Buddy up informally with other trekkers for the Deurali stretch", "Leave a note at each teahouse with your departure time", "Carry a local SIM (Ncell/NTC) — some signal to Chhomrong", "No signal above Chhomrong — plan accordingly"]
        },
        {
          title: "Signs to descend immediately",
          items: ["Severe headache that won't respond to ibuprofen", "Loss of coordination or balance", "Confusion or disorientation", "Persistent vomiting at altitude"]
        }
      ],
      emergencyContacts: [
        { label: "Nepal Police", number: "100" },
        { label: "Tourism Emergency Helpline", number: "1144" },
        { label: "Himalayan Rescue Association (Pokhara)", number: "+977-61-440066" },
        { label: "ACAP Office, Pokhara", number: "+977-61-466477" },
        { label: "Fishtail Air (heli rescue)", number: "+977-61-465111" }
      ]
    },

    // --- Packing List ---
    packing: [
      {
        category: "Clothing",
        items: [
          { name: "Down jacket (600-fill or higher)", amazonLink: "<!-- REPLACE: Amazon India down jacket -->" },
          { name: "Fleece mid-layer", amazonLink: null },
          { name: "Waterproof rain jacket + trousers", amazonLink: "<!-- REPLACE: Amazon India rain jacket -->" },
          { name: "3× moisture-wicking base layer tops", amazonLink: null },
          { name: "2× trekking trousers (zip-off useful)", amazonLink: null },
          { name: "Warm hat + sun hat", amazonLink: null },
          { name: "Gloves (light liner + waterproof shell)", amazonLink: null },
          { name: "Trekking socks ×4 pairs (wool preferred)", amazonLink: "<!-- REPLACE: Amazon India wool socks -->" },
          { name: "Gaiters (optional but useful in snow)", amazonLink: null }
        ]
      },
      {
        category: "Footwear",
        items: [
          { name: "Trekking boots (waterproof, ankle support)", amazonLink: "<!-- REPLACE: Amazon India trekking boots -->" },
          { name: "Camp sandals / Crocs for evenings", amazonLink: null },
          { name: "Trekking poles (strong recommendation)", amazonLink: "<!-- REPLACE: Amazon India trekking poles -->" }
        ]
      },
      {
        category: "Gear & safety",
        items: [
          { name: "Headlamp + spare batteries", amazonLink: "<!-- REPLACE: Amazon India headlamp -->" },
          { name: "Sleeping bag liner (teahouses provide blankets)", amazonLink: "<!-- REPLACE: Amazon India sleeping bag liner -->" },
          { name: "Water bottles ×2 (1L each) + purification tablets", amazonLink: null },
          { name: "Power bank (20,000mAh minimum)", amazonLink: "<!-- REPLACE: Amazon India power bank -->" },
          { name: "Universal power adapter", amazonLink: null },
          { name: "Sunscreen SPF 50+ + lip balm", amazonLink: null },
          { name: "Sunglasses (UV protection essential)", amazonLink: "<!-- REPLACE: Amazon India sunglasses -->" }
        ]
      },
      {
        category: "First aid & meds",
        items: [
          { name: "Diamox (consult doctor — 125–250mg for AMS prevention)", amazonLink: null },
          { name: "Ibuprofen + Paracetamol", amazonLink: null },
          { name: "Blister kit (Compeed + needle)", amazonLink: null },
          { name: "Rehydration sachets (ORS)", amazonLink: null },
          { name: "Antidiarrheal (Imodium)", amazonLink: null },
          { name: "Pulse oximeter (optional, useful at altitude)", amazonLink: "<!-- REPLACE: Amazon India pulse oximeter -->" }
        ]
      },
      {
        category: "Documents & money",
        items: [
          { name: "Passport + 2 passport photos (for permits)", amazonLink: null },
          { name: "Travel insurance docs (printout + phone)", amazonLink: null },
          { name: "NPR 40,000+ cash (withdrawn in Pokhara)", amazonLink: null },
          { name: "Nepal SIM card (Ncell or NTC — buy at airport)", amazonLink: null }
        ]
      }
    ],

    // --- Trail Kit (digital product) ---
    trailKit: {
      available: true,
      gumroadLink: "<!-- REPLACE: Gumroad product link -->",
      priceUSD: 5.99,
      items: [
        "Print-ready PDF guide (all 10 days)",
        "GPX waypoints for OsmAnd & Gaia GPS",
        "Emergency contacts by altitude zone",
        "ACAP + TIMS permit reference card"
      ]
    },

    // --- Affiliates ---
    affiliates: {
      insurance: {
        provider: "SafetyWing",
        link: "<!-- REPLACE: SafetyWing affiliate link from safetywing.com/affiliates -->",
        calloutHeading: "Helicopter evacuation from ABC costs $3,000–5,000. Get covered before you go.",
        calloutBody: "Travel insurance with helicopter rescue isn't optional above 3,000m. We recommend SafetyWing Nomad: covers emergency evacuation, hospitalisation, and trip interruption. From ~$50/month.",
        disclosure: "We earn a 10% recurring commission if you subscribe through this link, at no extra cost to you."
      },
      activities: [
        { title: "Paragliding over Phewa Lake", description: "30-min tandem flight with Annapurna views. The classic pre-trek experience.", priceFromUSD: 80, link: "<!-- REPLACE: GetYourGuide paragliding link -->" },
        { title: "Sarangkot sunrise", description: "Jeep + short hike to the best Annapurna viewpoint. Do this the morning you leave for the trail.", priceFromUSD: 25, link: "<!-- REPLACE: GetYourGuide Sarangkot link -->" },
        { title: "Phewa Lake boat + island temple", description: "Hire a rowing boat and visit Tal Barahi temple. 2 hours, deeply relaxing after a flight day.", priceFromUSD: 8, link: "<!-- REPLACE: GetYourGuide Phewa Lake link -->" },
        { title: "Pokhara old market walking tour", description: "Half-day walk through Lakeside and Old Bazar. Good for gear shopping orientation too.", priceFromUSD: 20, link: "<!-- REPLACE: GetYourGuide city tour link -->" }
      ],
      activitiesCity: "Pokhara",
      activitiesIntro: "Most trekkers spend 1–2 nights in Pokhara before hitting the trail. These are worth your time — book through GetYourGuide, confirmed instantly.",
      disclosure: "Booking links are affiliate — we earn a small commission at no cost to you."
    }
  },

  /* ================================================================
     KEDARKANTHA
     Status: COMING SOON — guide in production
  ================================================================ */
  "kedarkantha": {
    id: "kedarkantha",
    status: "coming-soon",
    lastVerified: null,
    publishedDate: null,
    name: "Kedarkantha",
    shortName: "Kedarkantha",
    tagline: "India's best winter summit trek",
    country: "India",
    region: "Uttarakhand",
    difficulty: "moderate",
    maxAltitudeM: 3810,
    totalDistanceKm: 20,
    elevationGainM: 1460,
    duration: { min: 4, max: 6 },
    trailhead: "Sankri",
    nearestCity: "Dehradun",
    guideRequired: false,
    heroImage: "https://images.unsplash.com/photo-1626016752307-2e56aa5fdad0?w=1400&q=80",
    cardImage: "https://images.unsplash.com/photo-1626016752307-2e56aa5fdad0?w=800&q=80",
    seoTitle: "Kedarkantha Trek Solo Guide — The Solo Trail",
    seoDescription: "Complete solo trekker's guide to Kedarkantha, Uttarakhand. 4–6 day winter summit trek, permits, costs, packing list. India's best beginner summit.",
    seasons: [
      { label: "Dec – Feb", temp: "-5°C to 10°C", badge: "best" },
      { label: "Mar – Apr", temp: "5°C to 18°C", badge: "best" },
      { label: "May – Jun", temp: "10°C to 25°C", badge: "ok" },
      { label: "Jul – Sep", temp: "Rain", badge: "avoid" }
    ],
    permits: [
      { name: "Forest permit", fullName: "Govind Pashu Vihar National Park entry", priceUSD: 2.5, saarcPriceUSD: null, where: "Sankri check post, on arrival", notes: "INR 200 per person per day. Paid at the trailhead." }
    ],
    trailKit: { available: false, gumroadLink: null, priceUSD: 5.99, items: [] },
    affiliates: { insurance: null, activities: [] }
  },

  /* ================================================================
     POON HILL
     Status: COMING SOON
  ================================================================ */
  "poon-hill": {
    id: "poon-hill",
    status: "coming-soon",
    lastVerified: null,
    publishedDate: null,
    name: "Poon Hill",
    shortName: "Poon Hill",
    tagline: "The perfect first Nepal trek — 4 days, 3,210m, unforgettable sunrise",
    country: "Nepal",
    region: "Gandaki Province",
    difficulty: "easy",
    maxAltitudeM: 3210,
    totalDistanceKm: 42,
    elevationGainM: 1490,
    duration: { min: 4, max: 5 },
    trailhead: "Nayapul",
    nearestCity: "Pokhara",
    guideRequired: false,
    heroImage: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1400&q=80",
    cardImage: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80",
    seoTitle: "Poon Hill Trek Solo Guide — The Solo Trail",
    seoDescription: "Complete solo trekker's guide to Poon Hill, Nepal. 4-day circuit from Pokhara. Best first Himalayan trek.",
    seasons: [
      { label: "Oct – Nov", temp: "5°C to 20°C", badge: "best" },
      { label: "Mar – May", temp: "8°C to 22°C", badge: "best" },
      { label: "Dec – Feb", temp: "0°C to 15°C", badge: "ok" },
      { label: "Jun – Sep", temp: "Monsoon", badge: "avoid" }
    ],
    permits: [
      { name: "ACAP", fullName: "Annapurna Conservation Area Permit", priceUSD: 24, saarcPriceUSD: 8, where: "Pokhara (Damside)", notes: null },
      { name: "TIMS", fullName: "Trekkers' Information Management System", priceUSD: 17, saarcPriceUSD: 9, where: "Same office as ACAP", notes: null }
    ],
    trailKit: { available: false, gumroadLink: null, priceUSD: 5.99, items: [] },
    affiliates: { insurance: null, activities: [] }
  },

  /* ================================================================
     EVEREST BASE CAMP
     Status: PLANNED
  ================================================================ */
  "everest-base-camp": {
    id: "everest-base-camp",
    status: "planned",
    lastVerified: null,
    publishedDate: null,
    name: "Everest Base Camp",
    shortName: "EBC",
    tagline: "The world's most iconic trek — 5,364m",
    country: "Nepal",
    region: "Sagarmatha Zone",
    difficulty: "challenging",
    maxAltitudeM: 5364,
    totalDistanceKm: 130,
    elevationGainM: 3800,
    duration: { min: 12, max: 14 },
    trailhead: "Lukla",
    nearestCity: "Kathmandu",
    guideRequired: false,
    heroImage: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=1400&q=80",
    cardImage: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&q=80",
    seoTitle: "Everest Base Camp Solo Trek Guide — The Solo Trail",
    seoDescription: "Complete solo trekker's guide to Everest Base Camp. 12–14 day itinerary, permits, costs, safety and packing list.",
    seasons: [
      { label: "Oct – Nov", temp: "0°C to 15°C", badge: "best" },
      { label: "Mar – May", temp: "5°C to 18°C", badge: "best" },
      { label: "Dec – Feb", temp: "-15°C to 5°C", badge: "ok" },
      { label: "Jun – Sep", temp: "Monsoon", badge: "avoid" }
    ],
    permits: [
      { name: "Sagarmatha NP", fullName: "Sagarmatha National Park Entry", priceUSD: 30, saarcPriceUSD: 10, where: "Monjo checkpoint", notes: null },
      { name: "TIMS", fullName: "Trekkers' Information Management System", priceUSD: 17, saarcPriceUSD: 9, where: "Kathmandu (TAAN office)", notes: null },
      { name: "Khumbu Rural Municipality", fullName: "Local municipality fee", priceUSD: 6, saarcPriceUSD: 6, where: "Lukla or Phakding", notes: null }
    ],
    trailKit: { available: false, gumroadLink: null, priceUSD: 9.99, items: [] },
    affiliates: { insurance: null, activities: [] }
  },

  /* ================================================================
     LANGTANG VALLEY
     Status: PLANNED
  ================================================================ */
  "langtang-valley": {
    id: "langtang-valley",
    status: "planned",
    lastVerified: null,
    publishedDate: null,
    name: "Langtang Valley",
    shortName: "Langtang",
    tagline: "The valley of glaciers — a week from Kathmandu",
    country: "Nepal",
    region: "Bagmati Province",
    difficulty: "moderate",
    maxAltitudeM: 3870,
    totalDistanceKm: 65,
    elevationGainM: 1870,
    duration: { min: 7, max: 9 },
    trailhead: "Syabrubesi",
    nearestCity: "Kathmandu",
    guideRequired: false,
    heroImage: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1400&q=80",
    cardImage: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
    seoTitle: "Langtang Valley Trek Solo Guide — The Solo Trail",
    seoDescription: "Complete solo trekker's guide to Langtang Valley, Nepal. 7–9 day trek from Kathmandu.",
    seasons: [
      { label: "Oct – Nov", temp: "5°C to 18°C", badge: "best" },
      { label: "Mar – May", temp: "8°C to 20°C", badge: "best" },
      { label: "Dec – Feb", temp: "-5°C to 10°C", badge: "ok" },
      { label: "Jun – Sep", temp: "Monsoon", badge: "avoid" }
    ],
    permits: [
      { name: "Langtang NP", fullName: "Langtang National Park Entry", priceUSD: 30, saarcPriceUSD: 10, where: "Dhunche or Syabrubesi", notes: null },
      { name: "TIMS", fullName: "Trekkers' Information Management System", priceUSD: 17, saarcPriceUSD: 9, where: "Kathmandu (TAAN office)", notes: null }
    ],
    trailKit: { available: false, gumroadLink: null, priceUSD: 5.99, items: [] },
    affiliates: { insurance: null, activities: [] }
  },

  /* ================================================================
     HAMPTA PASS
     Status: PLANNED
  ================================================================ */
  "hampta-pass": {
    id: "hampta-pass",
    status: "planned",
    lastVerified: null,
    publishedDate: null,
    name: "Hampta Pass",
    shortName: "Hampta",
    tagline: "Cross the Himachal divide — Kullu to Spiti in 5 days",
    country: "India",
    region: "Himachal Pradesh",
    difficulty: "moderate",
    maxAltitudeM: 4270,
    totalDistanceKm: 35,
    elevationGainM: 2050,
    duration: { min: 5, max: 6 },
    trailhead: "Jobra (near Manali)",
    nearestCity: "Manali",
    guideRequired: false,
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    cardImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    seoTitle: "Hampta Pass Trek Solo Guide — The Solo Trail",
    seoDescription: "Complete solo trekker's guide to Hampta Pass, Himachal Pradesh. 5-day crossover trek from Kullu to Spiti.",
    seasons: [
      { label: "Jun – Jul", temp: "10°C to 22°C", badge: "best" },
      { label: "Aug – Sep", temp: "8°C to 20°C", badge: "ok" },
      { label: "Oct +", temp: "Snow closes pass", badge: "avoid" }
    ],
    permits: [
      { name: "Forest permit", fullName: "Kullu Forest Division permit", priceUSD: 1.2, saarcPriceUSD: null, where: "Jobra trailhead check post", notes: "INR 100 per person." }
    ],
    trailKit: { available: false, gumroadLink: null, priceUSD: 5.99, items: [] },
    affiliates: { insurance: null, activities: [] }
  }

};

/* ================================================================
   TRAIL_SCHEMA — Template for adding a new trail
   Copy this, fill in the required fields, add to TRAILS above.
================================================================ */
const TRAIL_SCHEMA = {
  // REQUIRED
  id: "",             // kebab-case slug, must match URL path
  status: "coming-soon",
  name: "",
  tagline: "",
  country: "",
  region: "",
  difficulty: "",     // "easy" | "moderate" | "challenging" | "expert"
  maxAltitudeM: 0,
  totalDistanceKm: 0,
  elevationGainM: 0,
  duration: { min: 0, max: 0 },
  trailhead: "",
  nearestCity: "",
  guideRequired: false,
  heroImage: "",
  seoTitle: "",
  seoDescription: "",
  seasons: [],
  permits: [],
  trailKit: { available: false, gumroadLink: null, priceUSD: 5.99, items: [] },

  // REQUIRED for status: "live"
  lastVerified: "",   // "YYYY-MM-DD"
  publishedDate: "",
  itinerary: [],
  gettingThere: {},
  costs: {},
  safety: {},
  packing: [],
  affiliates: {}
};

if (typeof module !== 'undefined') module.exports = { TRAILS, TRAIL_SCHEMA };
