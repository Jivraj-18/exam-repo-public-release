import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Course content documentation
import duckdb from "./tds/data-preparation-in-duckdb.md";
import vectorDatabases from "./tds/vector-databases.md";
import shellDataPrep from "./tds/data-preparation-in-the-shell.md";
import githubActions from "./tds/github-actions.md";
import networkAnalysis from "./tds/network-analysis-in-python.md";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: DuckDB Multi-Format Data Pipeline
    {
      ...(await import("./q-duckdb-multi-format-pipeline.js").then((m) => m.default({ user, weight: 2 }))),
      help: md(duckdb),
    },

    // Question 2: Vector Database Semantic Search
    {
      ...(await import("./q-vector-semantic-search.js").then((m) => m.default({ user, weight: 2 }))),
      help: md(vectorDatabases),
    },

    // Question 3: Shell-Based Log Analysis
    {
      ...(await import("./q-shell-log-analysis.js").then((m) => m.default({ user, weight: 2 }))),
      help: md(shellDataPrep),
    },

    // Question 4: GitHub Actions Automated Scraper
    {
      ...(await import("./q-github-actions-scraper.js").then((m) => m.default({ user, weight: 2 }))),
      help: md(githubActions),
    },

    // Question 5: Network Community Detection
    {
      ...(await import("./q-network-community-detection.js").then((m) => m.default({ user, weight: 2 }))),
      help: md(networkAnalysis),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
