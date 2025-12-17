import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: Git - Advanced Repository Forensics
    {
      ...(await import("./q-git-repo-analysis.js").then((m) => m.default({ user, weight: 1.5 }))),
    },

    // Question 2: DuckDB - Window Functions and Time-Series Analysis
    {
      ...(await import("./q-duckdb-sales-analysis.js").then((m) => m.default({ user, weight: 2 }))),
    },

    // Question 3: LLM Embeddings - Semantic Search System
    {
      ...(await import("./q-embedding-similarity.js").then((m) => m.default({ user, weight: 2 }))),
    },

    // Question 4: GitHub Actions - Automated Data Collection Pipeline
    {
      ...(await import("./q-github-actions-scraper.js").then((m) => m.default({ user, weight: 1.5 }))),
    },

    // Question 5: REST API - Advanced Analytics with Validation
    {
      ...(await import("./q-rest-api-stats.js").then((m) => m.default({ user, weight: 2 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
