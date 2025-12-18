import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Bonus Activity: Hacker News RSS Search (Docker)
    {
      ...(await import("./q-search-hacker-news-docker.js").then(
        (m) => m.default({ user, weight: 0.5 })
      )),
    },

    // Bonus Activity: LLM Sentiment Analysis (AI Pipe)
    {
      ...(await import("./q-llm-sentiment-analysis-aipipe.js").then(
        (m) => m.default({ user, weight: 0.5 })
      )),
    },

    // Bonus Activity: OpenRefine Entity Resolution
    {
      ...(await import("./q-openrefine-entity-resolution.js").then(
        (m) => m.default({ user, weight: 1.0 })
      )),
    },

    // Bonus Activity: Excel Geospatial Coverage Gap
    {
      ...(await import("./q-excel-geospatial-coverage-gap.js").then(
        (m) => m.default({ user, weight: 0.75 })
      )),
    },

    // Bonus Activity: Data Storytelling with LLMs
    {
      ...(await import("./q-data-storytelling-with-llms.js").then(
        (m) => m.default({ user, weight: 1.5 })
      )),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
