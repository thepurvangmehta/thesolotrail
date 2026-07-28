const getTrails = require("./src/_data/trailsList.js");
const relatedTrails = require("./src/_data/relatedTrails.js");
const buildTrekFaqs = require("./src/_data/trekFaqBuilder.js");

module.exports = function (eleventyConfig) {
  const trails = getTrails();
  eleventyConfig.addCollection("trailsNepal", () => trails.filter((t) => t.country === "Nepal"));
  eleventyConfig.addCollection("trailsIndia", () => trails.filter((t) => t.country === "India"));
  eleventyConfig.addCollection("trailsMaharashtra", () => trails.filter((t) => t.region === "Maharashtra"));

  // Expose relatedTrails() as a global template function so Nunjucks can call it
  eleventyConfig.addGlobalData("relatedTrails", () => relatedTrails);

  // Legacy static pages — untouched, shipped as flat files, no templating.
  // Only src/trails/** goes through the Nunjucks pipeline.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/downloads/abc-trail-kit-print.html": "downloads/abc-trail-kit-print.html" });
  eleventyConfig.addPassthroughCopy({ "src/downloads/abc.gpx": "downloads/abc.gpx" });
  eleventyConfig.addPassthroughCopy({ "src/pricing/index.html": "pricing/index.html" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.ignores.add("src/downloads/abc-trail-kit-print.html");
  eleventyConfig.ignores.add("src/pricing/index.html");

  eleventyConfig.addFilter("commaNum", (n) => (typeof n === "number" ? n.toLocaleString("en-US") : n));

  // difficulty -> CSS class suffix used by card/stat badges
  eleventyConfig.addFilter("diffClass", (difficulty) => {
    if (difficulty === "easy") return "easy";
    if (difficulty === "expert") return "hard";
    if (difficulty === "challenging") return "hard";
    return "moderate";
  });

  eleventyConfig.addFilter("countryFlag", (country) => {
    if (country === "Nepal") return "🇳🇵";
    if (country === "India") return "🇮🇳";
    return "🌐";
  });

  eleventyConfig.addFilter("statusLabel", (status) => {
    return { live: "Full guide", "coming-soon": "Coming soon", planned: "Coming soon" }[status] || "Coming soon";
  });

  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());
  eleventyConfig.addFilter("firstN", (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : arr));
  eleventyConfig.addFilter("pickByIds", (list, ids) => ids.map((id) => list.find((x) => x.id === id)).filter(Boolean));

  // Per-trek FAQ list, derived from the trek's own data. Used twice on each
  // trail page — once as a visible block, once as FAQPage JSON-LD — so the
  // schema always matches what a reader can actually see.
  eleventyConfig.addFilter("trekFaqs", (trek) => buildTrekFaqs(trek));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
};
