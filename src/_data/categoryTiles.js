const getTrails = require("./trailsList.js");

const DEFS = [
  {
    key: "himalayan",
    label: "Himalayan Classics",
    sub: "Nepal & the high Himalaya",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Annapurna_Sanctuary_(48729169061).jpg?width=900",
    match: (t) => !t.category,
  },
  {
    key: "fort",
    label: "Hill Forts",
    sub: "Sahyadri durg treks",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/KALAVANTIN_DURG_(FORT).jpg?width=900",
    match: (t) => t.category === "fort",
  },
  {
    key: "jungle",
    label: "Jungle Trails",
    sub: "Western Ghats forest treks",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tamhini_Ghat_in_Rainy_season_15.JPG?width=900",
    match: (t) => t.category === "jungle",
  },
  {
    key: "peak-plateau",
    label: "Peaks & Plateaus",
    sub: "Maharashtra's high points",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kalasubai.jpg?width=900",
    match: (t) => t.category === "peak-plateau",
  },
  {
    key: "waterfall-valley",
    label: "Waterfalls & Valleys",
    sub: "Monsoon canyons & falls",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Devkund_Waterfall.JPG?width=900",
    match: (t) => t.category === "waterfall-valley",
  },
  {
    key: "coastal",
    label: "Coastal Forts",
    sub: "Konkan sea forts",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Murud-Janjira_Fort_near_Murud_Raigad_Maharashtra_DPP_0093_(2).JPG?width=900",
    match: (t) => t.category === "coastal",
  },
];

/** Category tiles for the homepage browse grid — counts computed live from trail data. */
module.exports = () => {
  const trails = getTrails();
  return DEFS.map((d) => ({
    key: d.key,
    label: d.label,
    sub: d.sub,
    image: d.image,
    count: trails.filter(d.match).length,
  })).filter((c) => c.count > 0);
};
