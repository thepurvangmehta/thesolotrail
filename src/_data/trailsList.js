const fs = require("fs");
const path = require("path");

/**
 * Reads every trek record from _data/trails/*.json and returns them as a flat
 * array. This is the single source of truth for trail content — add a trek by
 * dropping a new JSON file in _data/trails/ that matches schema.json, nothing
 * else needs to change.
 */
module.exports = () => {
  const dir = path.join(__dirname, "trails");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
};
