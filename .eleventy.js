const getTrails = require("./src/_data/trailsList.js");

module.exports = function (eleventyConfig) {
  const trails = getTrails();
  eleventyConfig.addCollection("trailsNepal", () => trails.filter((t) => t.country === "Nepal"));
  eleventyConfig.addCollection("trailsIndia", () => trails.filter((t) => t.country === "India"));
  eleventyConfig.addCollection("trailsMaharashtra", () => trails.filter((t) => t.region === "Maharashtra"));

  // Legacy static pages — untouched, shipped as flat files, no templating.
  // Only src/trails/** goes through the Nunjucks pipeline.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/index.html": "index.html" });
  eleventyConfig.addPassthroughCopy({ "src/404.html": "404.html" });
  eleventyConfig.addPassthroughCopy({ "src/about": "about" });
  eleventyConfig.addPassthroughCopy({ "src/community": "community" });
  eleventyConfig.addPassthroughCopy({ "src/downloads": "downloads" });
  eleventyConfig.addPassthroughCopy({ "src/guides": "guides" });
  eleventyConfig.addPassthroughCopy({ "src/pricing": "pricing" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.ignores.add("src/index.html");
  eleventyConfig.ignores.add("src/404.html");
  eleventyConfig.ignores.add("src/about/**");
  eleventyConfig.ignores.add("src/community/**");
  eleventyConfig.ignores.add("src/downloads/**");
  eleventyConfig.ignores.add("src/guides/**");
  eleventyConfig.ignores.add("src/pricing/**");

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
