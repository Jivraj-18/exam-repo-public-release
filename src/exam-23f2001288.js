import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-correlation-pitfall.js").then(m => [m.default({ user })])),
    ...(await import("./q-marimo-dependency-graph-reasoning.js").then(m => [m.default({ user })])),
    ...(await import("./q-marp-and-github-pages.js").then(m => [m.default({ user })])),
    ...(await import("./q-RAWGraphs-data-modeling-trap.js").then(m => [m.default({ user })])),
    ...(await import("./q-RevealJS-lifecycle-and-performance.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}