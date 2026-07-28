const getTrails = require("./trailsList.js");

/** Groups India trek records by state/region for the trails index page. */
module.exports = () => {
  const india = getTrails().filter((t) => t.country === "India");
  const byState = {};
  india.forEach((t) => {
    byState[t.region] = byState[t.region] || [];
    byState[t.region].push(t);
  });
  return Object.keys(byState)
    .sort((a, b) => {
      if (a === "Maharashtra") return -1;
      if (b === "Maharashtra") return 1;
      return a.localeCompare(b);
    })
    .map((state) => ({ state, treks: byState[state] }));
};
