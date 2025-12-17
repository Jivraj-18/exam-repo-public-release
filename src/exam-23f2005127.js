import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Excel-Correlation.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python Cohort Retention.js").then(m => [m.default({ user })])),
    ...(await import("./q-SQL Rolling Average Anomaly.js").then(m => [m.default({ user })])),
    ...(await import("./q-DuckDB Gross Margin Analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-Network Analysis.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}