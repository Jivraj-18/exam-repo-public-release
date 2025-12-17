import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-avoid-misleading-values.js").then(m => [m.default({ user })])),
    ...(await import("./q-categorical-data-rep.js").then(m => [m.default({ user })])),
    ...(await import("./q-tables-vs-charts.js").then(m => [m.default({ user })])),
    ...(await import("./q-distribution-visualization.js").then(m => [m.default({ user })])),
    ...(await import("./q-choose-right-file.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}