import { displayQuestions } from "../utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-css-selector.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-search-query.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-tooling.js").then(m => [m.default({ user })])),
    ...(await import("./q-shell-command.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-function.js").then(m => [m.default({ user })]))
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}

