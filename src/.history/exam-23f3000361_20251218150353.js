import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-github-user-search-query-syntax.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-branch.js").then(m => [m.default({ user })])),
    ...(await import("./q-curl-post.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-count.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-parse.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}