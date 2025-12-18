import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-shell-filter-count.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-processing.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-aggregation.js").then(m => [m.default({ user })])),
    ...(await import("./q-text-normalization.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window-avg.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}