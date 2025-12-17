import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-python-cohort.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-correlation.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-margin.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-centrality.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}