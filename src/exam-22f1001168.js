import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: Pandas Sales Aggregation
    {
      ...(await import("./q-pandas-sales-aggregation.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 2: Regular Expression Log Parser
    {
      ...(await import("./q-regex-log-parser.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 3: Git Commit Analysis
    {
      ...(await import("./q-git-commit-analysis.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 4: CSV Data Cleaning
    {
      ...(await import("./q-csv-data-cleaning.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Question 5: Nested JSON Extraction
    {
      ...(await import("./q-nested-json-extraction.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  // Render questions to the DOM
  displayQuestions(results, elementMap);

  // Return question data for scoring
  // Converts [{id: 'q1', answer, weight}, ...] to {q1: {answer, weight}, ...}
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
