import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-check-git-repository-status.js").then(m => [m.default({ user })])),
    ...(await import("./q-select-DOM-element.js").then(m => [m.default({ user })])),
    ...(await import("./q-extract-csv-column.js").then(m => [m.default({ user })])),
    ...(await import("./q-verbose-get-request.js").then(m => [m.default({ user })])),
    ...(await import("./q-linux-web-crawling.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}