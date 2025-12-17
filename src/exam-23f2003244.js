import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-google-sheet.js").then(m => [m.default({ user })])),
    ...(await import("./q-nomination-bounding.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions.js").then(m => [m.default({ user })])),
    ...(await import("./q-cli-web-crawling.js").then(m => [m.default({ user })])),
    ...(await import("./q-hacker-news.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}