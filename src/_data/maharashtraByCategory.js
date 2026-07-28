const getTrails = require("./trailsList.js");

const CATEGORY_ORDER = ["fort", "jungle", "peak-plateau", "waterfall-valley", "coastal"];
const CATEGORY_LABELS = {
  fort: "Forts (Durg Treks)",
  jungle: "Jungle Treks",
  "peak-plateau": "Peaks & Plateaus",
  "waterfall-valley": "Waterfalls & Valleys",
  coastal: "Coastal Forts",
};
const CATEGORY_SUB = {
  fort: "Sahyadri hill forts — Maratha history built into every climb.",
  jungle: "Dense Western Ghats forest trails, best (and hardest) in monsoon.",
  "peak-plateau": "Summit and high-plateau treks, including Maharashtra's highest point.",
  "waterfall-valley": "Monsoon waterfalls and canyon-like valleys.",
  coastal: "Konkan coast sea forts — boat access, no elevation gain.",
};

/** Groups Maharashtra trek records by category for the trails index page. */
module.exports = () => {
  const mh = getTrails().filter((t) => t.region === "Maharashtra");
  return CATEGORY_ORDER.filter((c) => mh.some((t) => t.category === c)).map((c) => ({
    key: c,
    label: CATEGORY_LABELS[c],
    sub: CATEGORY_SUB[c],
    treks: mh.filter((t) => t.category === c),
  }));
};
