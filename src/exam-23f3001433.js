import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Documentation for the new questions
import excel from "./tds/spreadsheets.md";
import pythonAnalysis from "./tds/data-analysis-with-python.md";
import bashShell from "./tds/data-preparation-in-the-shell.md";
import fastapi from "./tds/fastapi.md";
import pydanticAi from "./tds/pydantic-ai.md";
import duckdb from "./tds/data-analysis-with-duckdb.md";
import duckdbPrep from "./tds/data-preparation-in-duckdb.md";
import dataPrep from "./tds/data-preparation-in-the-editor.md";

export async function questions(user, elementMap) {
  const results = [
    // Q1: Shell/CLI - Log Analysis with grep/awk/sort
    {
      ...(await import("./q-cli-log-404-analysis.js").then((m) => m.default({ user, weight: 1.0 }))),
      help: md(bashShell),
    },

    // Q2: Excel - Advanced Multi-Criteria Formulas (SUMIFS)
    {
      ...(await import("./q-excel-advanced-formulas.js").then((m) => m.default({ user, weight: 1.0 }))),
      help: md(excel),
    },

    // Q3: DuckDB - SQL Aggregation and Filtering
    {
      ...(await import("./q-duckdb-sales-analysis.js").then((m) => m.default({ user, weight: 1.25 }))),
      help: [md(duckdb), md(duckdbPrep)],
    },

    // Q4: Python - Data Cleaning with CSV Upload Validation
    {
      ...(await import("./q-python-data-cleaning.js").then((m) => m.default({ user, weight: 1.25 }))),
      help: [md(dataPrep), md(pythonAnalysis)],
    },

    // Q5: FastAPI - Pydantic Validation Error Debugging
    {
      ...(await import("./q-fastapi-pydantic-error-loc.js").then((m) => m.default({ user, weight: 1.25 }))),
      help: [md(fastapi), md(pydanticAi)],
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
