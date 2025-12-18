import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-http-method.js").then(m => [m.default({ user })])),
    ...(await import("./q-csv-format.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-requests.js").then(m => [m.default({ user })])),
    ...(await import("./q-web-scraping.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-select.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}