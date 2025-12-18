import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-datasette-when-to-use.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-data-analysis-toolpak.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-degree-vs-betweenness.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-parquet-advantage.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window-vs-groupby.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}