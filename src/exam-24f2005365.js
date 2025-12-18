import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-pythonnetwork.js").then(m => [m.default({ user })])),
    ...(await import("./q-sqldetection.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-forcasting.js").then(m => [m.default({ user })])),
    ...(await import("./q-python.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-question.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}