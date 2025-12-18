import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-discount-leakage.js").then(m => [m.default({ user })])),
    ...(await import("./q-editor-status-transition.js").then(m => [m.default({ user })])),
    ...(await import("./q-shell-slow-request-rate.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-role-coverage.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb_leadtime_risk.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}