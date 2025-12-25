import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-check-current-directory.js").then(m => [m.default({ user })])),
    ...(await import("./q-check-repository-status.js").then(m => [m.default({ user })])),
    ...(await import("./q-view-first-rows-of-dataFrame.js").then(m => [m.default({ user })])),
    ...(await import("./q-count-rows-in-a-table.js").then(m => [m.default({ user })])),
    ...(await import("./q-read-csv-with-pandas.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}