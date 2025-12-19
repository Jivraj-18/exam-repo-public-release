import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-filter-error-lines.js").then(m => [m.default({ user })])),
    ...(await import("./q-identify-HTTP-status-code.js").then(m => [m.default({ user })])),
    ...(await import("./q-read-value-from-json.js").then(m => [m.default({ user })])),
    ...(await import("./q-show-latest-git-commit.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-count-active-users.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}