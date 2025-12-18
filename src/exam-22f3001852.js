import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-api-bounding-box.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-table-filter.js").then(m => [m.default({ user })])),
    ...(await import("./q-html-markdown.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-streaming.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb-date-window.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
