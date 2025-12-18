import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-html-meta.js").then((m) => [m.default({ user })])),
    ...(await import("./q-crawl-html-count.js").then((m) => [m.default({ user })])),
    ...(await import("./q-json-transform").then((m) => [m.default({ user })])),
    ...(await import("./q-api-pagination.js").then((m) => [m.default({ user })])),
    ...(await import("./q-csv-sum.js").then((m) => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}