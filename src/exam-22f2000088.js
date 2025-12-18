import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-duckbd-sql.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-data-cleaning.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-jq-filtering.js").then(m => [m.default({ user })])),
    ...(await import("./q-media-ff-mpeg.js").then(m => [m.default({ user })])),
    ...(await import("./q-shell-log-filtering.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}