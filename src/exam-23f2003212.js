import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    (await import("./q-zscore-anomaly-detection.js").then(m => m.default({ user, weight: 2 }))),
    (await import("./q-convex-hull-enclosure-ratio.js").then(m => m.default({ user, weight: 1.5 }))),
    (await import("./q-duckdb-downward-trend-detector.js").then(m => m.default({ user, weight: 2 }))),
    (await import("./q-kmeans-euclidean-assignment.js").then(m => m.default({ user, weight: 1.5 }))),
    (await import("./q-incidence-matrix-cycle-basis.js").then(m => m.default({ user, weight: 1 }))),
    (await import("./q-greedy-set-cover-minimizer.js").then(m => m.default({ user, weight: 2 }))),
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
