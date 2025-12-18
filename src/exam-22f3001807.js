import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Excel — Correlation Interpretation.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python — Cohort Retention Logic.js").then(m => [m.default({ user })])),
    ...(await import("./q-SQL — Window Function Insight.js").then(m => [m.default({ user })])),
    ...(await import("./q-DuckDB — Gross Margin Analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-Network Analysis — Centrality Reasoning.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}