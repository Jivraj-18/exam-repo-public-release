import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-duckdb-json-analytics.js").then(m => [m.default({ user })])),
    ...(await import("./q-pandas-pivot-defensive.js").then(m => [m.default({ user })])),
    ...(await import("./q-pandas-pivot-error.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-csv-error-handling.js").then(m => [m.default({ user })])),
    ...(await import("./q-shell-log-analysis.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}