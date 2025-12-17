import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// TDS reading material
import excel from "./tds/spreadsheets.md";
import pythonAnalysis from "./tds/data-analysis-with-python.md";
import visualization from "./tds/data-visualization-with-seaborn.md";

export async function questions(user, elementMap) {
  const results = [
    // Q1: Python CSV → JSON
    {
      ...(await import("./q-csv-to-json-python.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(pythonAnalysis),
    },

    // Q2: Excel Pivot Table
    {
      ...(await import("./q-excel-pivot-logic.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(excel),
    },

    // Q3: API Pagination
    {
      ...(await import("./q-api-pagination.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },

    // Q4: Text Cleaning
    {
      ...(await import("./q-text-cleaning-python.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(pythonAnalysis),
    },

    // Q5: Visualization Choice
    {
      ...(await import("./q-visualization-choice.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(visualization),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
