import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-git-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-web-scraping.js").then(m => [m.default({ user })])),
    ...(await import("./q-api-usage.js").then(m => [m.default({ user })])),
    ...(await import("./q-file-system-automation.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}