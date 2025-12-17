import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-long-format-files-sorted-by-size.js").then(m => [m.default({ user })])),
    ...(await import("./q-create nested data.js").then(m => [m.default({ user })])),
    ...(await import("./q-grep-error-ignoring-case-in-app.js").then(m => [m.default({ user })])),
    ...(await import("./q-first-15-lines-of-results-csv.js").then(m => [m.default({ user })])),
    ...(await import("./q-count-py-files-recursively.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}