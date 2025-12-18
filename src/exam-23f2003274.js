import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Excel-Correlation.js").then(m => [m.default({ user })])),
    ...(await import("./q-Excel-Regression-Forecasting.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-cohort-retention.js").then(m => [m.default({ user })])),
    ...(await import("./q-SQL-Rolling-Average-Anomaly-Detection.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python-Network-Analysis.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}