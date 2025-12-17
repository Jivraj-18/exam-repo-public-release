import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Optional reference material
import webScraping from "./tds/scraping-imdb-with-javascript.md";
import largeLanguageModels from "./tds/large-language-models.md";
import dataTransformation from "./tds/data-transformation-in-excel.md";
import geospatial from "./tds/geospatial-analysis-with-excel.md";

export async function questions(user, elementMap) {
  const results = [
    // Bonus Activity: Hacker News RSS Search (Docker)
    {
      ...(await import("./questions/q-search-hacker-news-docker.js").then((m) =>
        m.default({ user, weight: 0.5 })
      )),
      help: md(webScraping),
    },

    // Bonus Activity: LLM Sentiment Analysis (AI Pipe)
    {
      ...(await import("./questions/q-llm-sentiment-analysis-aipipe.js").then(
        (m) => m.default({ user, weight: 0.5 })
      )),
      help: md(largeLanguageModels),
    },

    // Bonus Activity: OpenRefine Entity Resolution
    {
      ...(await import("./questions/q-openrefine-entity-resolution.js").then(
        (m) => m.default({ user, weight: 1.0 })
      )),
      help: md(dataTransformation),
    },

    // Bonus Activity: Excel Geospatial Coverage Gap
    {
      ...(await import("./questions/q-excel-geospatial-coverage-gap.js").then(
        (m) => m.default({ user, weight: 0.75 })
      )),
      help: md(geospatial),
    },

    // Bonus Activity: Data Storytelling with LLMs
    {
      ...(await import("./questions/q-data-storytelling-with-llms.js").then(
        (m) => m.default({ user, weight: 1.5 })
      )),
      help: md(largeLanguageModels),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
