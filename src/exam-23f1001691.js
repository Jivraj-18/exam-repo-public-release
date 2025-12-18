import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-simpsons-paradox.js").then(m => [m.default({ user })])),
    ...(await import("./q-data-leakage.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-granularity.js").then(m => [m.default({ user })])),
    ...(await import("./q-identifiability.js").then(m => [m.default({ user })])),
    ...(await import("./q-confounding.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}