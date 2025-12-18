import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-array-filter-sort.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-aggregation.js").then(m => [m.default({ user })])),
    ...(await import("./q-regex-validation.js").then(m => [m.default({ user })])),
    ...(await import("./q-spreadsheet-formula.js").then(m => [m.default({ user })])),
    ...(await import("./q-devtools-dom.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}