import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-datasette-features.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-outlier-detection.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-pandas-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-analysis.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}