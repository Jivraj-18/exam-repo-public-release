import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-log-filter.js").then(m => [m.default({ user })])),
    ...(await import("./q-data-cleaning.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb.js").then(m => [m.default({ user })])),
    ...(await import("./q-ffmpeg.js").then(m => [m.default({ user })])),
    ...(await import("./q-jq-filtering.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}