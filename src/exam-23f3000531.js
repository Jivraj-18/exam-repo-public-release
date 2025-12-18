import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-correlation.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window-function.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-geospatial.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-cohort.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}