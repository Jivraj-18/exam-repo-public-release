import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-count-http-errors.js").then(m => [m.default({ user })])),
    ...(await import("./q-extract-field-using-jq.js").then(m => [m.default({ user })])),
    ...(await import("./q-filter-by-date.js").then(m => [m.default({ user })])),
    ...(await import("./q-remove-duplicate-lines.js").then(m => [m.default({ user })])),
    ...(await import("./q-handling-missing-values.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}