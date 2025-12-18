import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-python-list-comprehension.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-run.js").then(m => [m.default({ user })])),
    ...(await import("./q-regex-email.js").then(m => [m.default({ user })])),
    ...(await import("./q-pandas-filter.js").then(m => [m.default({ user })])),
    ...(await import("./q-npm-install-dev.js").then(m => [m.default({ user })])),
    ...(await import("./q-async-await.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-join.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
