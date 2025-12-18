import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-correlation-question.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-forecast-linear.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-regression-forecast.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-cohort.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window-function.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}