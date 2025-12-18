import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-cleaning.js").then(m => [m.default({ user })])),
    ...(await import("./q-shell-logs.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-rollupt.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-aggregation.js").then(m => [m.default({ user })])),
    ...(await import("./q-media-transcript.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}