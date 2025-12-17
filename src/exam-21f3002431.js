import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-correlation-interpretation.js").then(m => [m.default({ user })])),
    ...(await import("./q-geospatial-distance-calculation.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-cohort-retention-logic.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window-function.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-analysis-centrality.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}