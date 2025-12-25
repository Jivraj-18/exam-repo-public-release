import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-simpsons-paradox.js").then(m => [m.default({ user })])),
    ...(await import("./q-forecast-overfit.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window.js").then(m => [m.default({ user })])),
    ...(await import("./q-visual-bias.js").then(m => [m.default({ user })])),
    ...(await import("./q-deterministic-error.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
