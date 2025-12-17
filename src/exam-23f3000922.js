import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-correlation-region.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-premium-conversion-lift.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-activation-spike.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-gross-margin.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-betweenness-centrality.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}