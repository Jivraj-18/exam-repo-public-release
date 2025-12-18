import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-python-data-cleaning.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-time-series-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-statistical-variability.js").then(m => [m.default({ user })])),
    ...(await import("./q-geospatial-python-libraries.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-analysis-node-centrality.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}