import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-github-action-debug.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-embeddings-choice.js").then(m => [m.default({ user })])),
    ...(await import("./q-data-prep-duckdb.js").then(m => [m.default({ user })])),
    ...(await import("./q-visualization-misleading.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-cli-transform.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}