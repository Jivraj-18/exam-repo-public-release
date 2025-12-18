import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-correlation.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-regression.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-margin-leader.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-haversine.js").then(m => [m.default({ user })])),
    ...(await import("./q-network-centrality.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
