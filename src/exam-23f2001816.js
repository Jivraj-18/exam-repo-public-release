import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli-chmod.js").then(m => [m.default({ user })])),
    ...(await import("./q-cli-disk-usage.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-clone.js").then(m => [m.default({ user })])),
    ...(await import("./q-js-number.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-where.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}