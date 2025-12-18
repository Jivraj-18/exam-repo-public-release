import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

/* Help content (only what you actually use) */
import excel from "./tds/spreadsheets.md";
import json from "./tds/parsing-json.md";
import dataPrep from "./tds/data-preparation-in-duckdb.md";
import dbt from "./tds/dbt.md";
import markdown from "./tds/markdown.md";

export async function questions(user, elementMap) {
  const results = [
    // Q1: JSON Parsing / Wrangling
    {
      ...(await import("./q-json-parse-aggregate.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(json),
    },

    // Q2: Excel – Dynamic Formula
    {
      ...(await import("./q-excel-dynamic-filter-average.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(excel),
    },

    // Q3: Data Preparation (DuckDB)
    {
      ...(await import("./q-duckdb-data-preparation.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(dataPrep),
    },

    // Q4: Data Transformation with dbt (non-sales domain)
    {
      ...(await import("./q-dbt-data-transformation-logs.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(dbt),
    },

    // Q5: Markdown
    {
      ...(await import("./q-markdown-readme-formatting.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: md(markdown),
    },
  ];

  displayQuestions(results, elementMap);

  // Required for grading
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
