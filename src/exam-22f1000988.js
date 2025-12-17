import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli-data-sourcing.js").then(m => [m.default({ user })])),
    ...(await import("./q-api-data-extraction").then(m => [m.default({ user })])),
    ...(await import("./q-google-sheets-scraping").then(m => [m.default({ user })])),
    ...(await import("./q-html-parsing.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}