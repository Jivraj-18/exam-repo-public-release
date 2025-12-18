import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-multivariate-regression-forecast.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-correlation-significance.js").then(m => [m.default({ user })])),
    ...(await import("./q-datasette-facet-insight.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-centrality-interpretation.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-trailing-average-definition.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}