import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-json-filter.js").then(m => [m.default({ user })])),
    ...(await import("./q-sales-summary.js").then(m => [m.default({ user })])),
    ...(await import("./q-text-pattern-normalization.js").then(m => [m.default({ user })])),
    ...(await import("./q-shell-command.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-formula-for-data-cleaning.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}