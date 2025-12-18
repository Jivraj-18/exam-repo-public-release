import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-linux-env.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-status.js").then(m => [m.default({ user })])),
    ...(await import("./q-curl-get.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-where.js").then(m => [m.default({ user })])),
    ...(await import("./q-js-async.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
