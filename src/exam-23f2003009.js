import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-gsheet-import-html.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-run.js").then(m => [m.default({ user })])),
    ...(await import("./q-js-webscraping-selector.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-action-cron.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-req-json-access.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}