import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-ai-spec-engineering.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-ml-audit.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-latency-zscore.js").then(m => [m.default({ user })])),
    ...(await import("./q-pandas-feature-drift.js").then(m => [m.default({ user })])),
    ...(await import("./q-shell-gpu-util.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
