import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli-file-counting.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-missing-value-imputation.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-filter-and-count-with-jq.js").then(m => [m.default({ user })])),
    ...(await import("./q-text-editor-de-duplicate-and-normalize-lines.js").then(m => [m.default({ user })])),
    ...(await import("./q-vercel-environment-variable-access.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}