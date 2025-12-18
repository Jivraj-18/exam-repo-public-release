import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-forecasting-ets.js").then(m => [m.default({ user })])),
    ...(await import("./q-geo-buffer-overlap.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-degree.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-pandas-quantile.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window-sum.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}