import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Tools in Data Science resources
import json from "./tds/json.md";
import pythonAnalysis from "./tds/data-analysis-with-python.md";
import dataTransformation from "./tds/data-transformation-in-excel.md";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: CSV Data Aggregation
    {
      ...(await import("./q-csv-data-aggregation.js").then((m) => m.default({ user, weight: 1.0 }))),
      help: md(dataTransformation),
    },

    // Question 2: Regular Expression Log Parsing
    {
      ...(await import("./q-regex-log-parsing.js").then((m) => m.default({ user, weight: 1.0 }))),
    },

    // Question 3: Pandas Pivot Table Analysis
    {
      ...(await import("./q-pandas-pivot-table.js").then((m) => m.default({ user, weight: 1.25 }))),
      help: md(pythonAnalysis),
    },

    // Question 4: Git Commit History Analysis
    {
      ...(await import("./q-git-commit-analysis.js").then((m) => m.default({ user, weight: 0.75 }))),
    },

    // Question 5: XML Data Extraction
    {
      ...(await import("./q-xml-data-extraction.js").then((m) => m.default({ user, weight: 1.0 }))),
      help: md(json),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
