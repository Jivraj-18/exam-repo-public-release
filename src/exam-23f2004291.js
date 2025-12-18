import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-curr-dir.js").then(m => [m.default({ user })])),
    ...(await import("./q-total-lines.js").then(m => [m.default({ user })])),
    ...(await import("./q-alpha-sort.js").then(m => [m.default({ user })])),
    ...(await import("./q-first-lines.js").then(m => [m.default({ user })])),
    ...(await import("./q-pattern-search.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}