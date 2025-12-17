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
      ...(await import(
        "./questions/q-vibe-coding-github-api-prompt.js"
      ).then((m) => m.default({ user, weight: 0.75 }))),
    },

    {
      ...(await import(
        "./questions/q-media-processing-audio-transcript.js"
      ).then((m) => m.default({ user, weight: 0.75 }))),
    },

    {
      ...(await import(
        "./questions/q-dbt-operations-performance-mart.js"
      ).then((m) => m.default({ user, weight: 1.0 }))),
    },

    {
      ...(await import(
        "./questions/q-openai-image-generation-json.js"
      ).then((m) => m.default({ user, weight: 0.75 }))),
    },

    {
      ...(await import(
        "./questions/q-rag-typescript-book-api.js"
      ).then((m) => m.default({ user, weight: 1.0 }))),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}