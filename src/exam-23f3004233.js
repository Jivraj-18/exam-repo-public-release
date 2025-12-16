import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: FastAPI Product Validation
    {
      ...(await import("./q-fastapi-product-validation.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    
    // Question 2: HTML Table Parsing
    {
      ...(await import("./q-html-table-parsing.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    
    // Question 3: DuckDB Sales Analysis
    {
      ...(await import("./q-duckdb-sales-analysis.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    
    // Question 4: SQL Moving Average
    {
      ...(await import("./q-sql-moving-average.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    
    // Question 5: LLM Expense Extraction
    {
      ...(await import("./q-llm-expense-extraction.js").then((m) =>
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