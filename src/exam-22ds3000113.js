import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: JSON Nested Query
    {
      ...(await import("./q-json-nested-query.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 2: Web Scraping - Wikipedia Table
    {
      ...(await import("./q-scrape-wikipedia-table.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 3: GitHub Pages Deployment
    {
      ...(await import("./q-github-actions-workflow.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 4: PDF Table Extraction
    {
      ...(await import("./q-pdf-table-extraction.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 5: Geospatial Courier Route
    {
      ...(await import("./q-geospatial-courier-route.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
