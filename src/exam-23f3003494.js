import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-shell-http-log-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-date-normalisation.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-jq-filter.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-date-filter.js").then(m => [m.default({ user })])),
    ...(await import("./q-ffmpeg-audio-extraction.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}