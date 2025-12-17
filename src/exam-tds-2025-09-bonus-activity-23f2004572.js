import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: Docker Multi-Stage Build Optimizer
    {
      ...(await import("./q-docker-multistage-optimizer.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

    // Question 2: GitHub Actions Parallel Job Duration
    {
      ...(await import("./q-github-actions-parallel-duration.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

    // Question 3: DuckDB Window Function Analysis
    {
      ...(await import("./q-duckdb-window-function-rownumber.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

    // Question 4: LLM Token Cost Calculator
    {
      ...(await import("./q-llm-token-cost-calculator.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

    // Question 5: Web Scraping Rate Limit Calculator
    {
      ...(await import("./q-webscraping-ratelimit-calculator.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
  ];

  // Render questions to the DOM
  displayQuestions(results, elementMap);

  // Return question data for scoring
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}