import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli-pager.js").then(m => [m.default({ user })])),
    ...(await import("./q-cli-grep.js").then(m => [m.default({ user })])),
    ...(await import("./q-cli-download.js").then(m => [m.default({ user })])),
    ...(await import("./q-cli-line-count.js").then(m => [m.default({ user })])),
    ...(await import("./q-cli-sort-size.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}