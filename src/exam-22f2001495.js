import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-revenue-leakage.js").then(m => [m.default({ user })])),
    ...(await import("./q-shell-api-latency.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-energy-normalization.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-returns-impact.js").then(m => [m.default({ user })])),
    ...(await import("./q-editor-service-owner.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}