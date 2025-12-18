import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-multi-level-aggregation-and-weighted-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-rolling-average-anomaly-detection.js").then(m => [m.default({ user })])),
    ...(await import("./q-geospatial-catchment-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-data-engineering-sessionization.js").then(m => [m.default({ user })])),
    ...(await import("./q-data-joining.js").then(m => [m.default({ user })])),
  ];(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}