// Returns the 3 most relevant trails for a given trek, scored by:
//   +2 same difficulty, +2 same category, +1 same country.
// Used by trail-live-body.njk to render a "Similar solo treks" section.
const getTrails = require("./trailsList.js");

module.exports = (current) => {
  if (!current || !current.id) return [];
  const all = getTrails();
  return all
    .filter((t) => t.id !== current.id)
    .map((t) => ({
      trek: t,
      score:
        (t.country === current.country ? 1 : 0) +
        (t.difficulty === current.difficulty ? 2 : 0) +
        (t.category && t.category === current.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.trek);
};