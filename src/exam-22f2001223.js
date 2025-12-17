import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-secret-management.js").then(m => [m.default({ user })])),
    ...(await import("./q-data-quality-gates.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-schema-drift.js").then(m => [m.default({ user })])),
    ...(await import("./q-idempotent-pipeline.js").then(m => [m.default({ user })])),
    ...(await import("./q-web-scraping-resilience.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}