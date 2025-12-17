import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-sentiment-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-category-margins.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-rolling-spike.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-regional-correlation.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-embedding-similarity.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}