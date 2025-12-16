import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: Multi-Source Weather & Air Quality Analytics
    { ...(await import("./q-weather-api-aggregation.js").then((m) => m.default({ user, weight: 2 }))) },

    // Question 2: CSV Analysis
    { ...(await import("./q-pdf-tabula-extraction.js").then((m) => m.default({ user, weight: 1.25 }))) },

    // Question 3: DuckDB Analysis
    { ...(await import("./q-duckdb-sales-analysis.js").then((m) => m.default({ user, weight: 1.5 }))) },

    // Question 4: Image Transformation
    { ...(await import("./q-image-transformation.js").then((m) => m.default({ user, weight: 1 }))) },

    // Question 5: Playwright Automation
    { ...(await import("./q-playwright-automation.js").then((m) => m.default({ user, weight: 1.5 }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
