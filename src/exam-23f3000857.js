import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-json-processing.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-query.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-formula.js").then(m => [m.default({ user })])),
    ...(await import("./q-bash-file-operations.js").then(m => [m.default({ user })])),
    ...(await import("./q-data-cleaning.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}