import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Reference material (help content)
import webScraping from "./tds/scraping-imdb-with-javascript.md";
import pythonAnalysis from "./tds/data-analysis-with-python.md";
import largeLanguageModels from "./tds/large-language-models.md";
import visualization from "./tds/data-visualization-with-seaborn.md";
import json from "./tds/json.md";

export async function questions(user, elementMap) {
  const results = [
    // Q1: API Data Fetching
    {
      ...(await import("./q-bash.js").then((m) =>
        m.default({ user, weight: 1 })
      ))
    },

    // Q2: Web Scraping
    {
      ...(await import("./q-duckdb.js").then((m) =>
        m.default({ user, weight: 1 })
      ))
    },

    // Q3: Pandas Data Transformation
    {
      ...(await import("./q-pandas.js").then((m) =>
        m.default({ user, weight: 1 })
      ))
    },

    // Q4: FastAPI Endpoint Design
    {
      ...(await import("./q-anime.js").then((m) =>
        m.default({ user, weight: 1 })
      ))
    },

    // Q5: Data Visualization with Seaborn
    {
      ...(await import("./q-ssearch.js").then((m) =>
        m.default({ user, weight: 1 })
      ))
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return results for evaluation
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
