const getTrails = require("./trailsList.js");

/** Aggregate counts for the About page roadmap — computed from real data so it can't go stale. */
module.exports = () => {
  const trails = getTrails();
  const live = trails.filter((t) => t.status === "live");
  return {
    liveCount: live.length,
    liveRegions: new Set(live.map((t) => t.region)).size,
    liveCountries: new Set(live.map((t) => t.country)).size,
  };
};
