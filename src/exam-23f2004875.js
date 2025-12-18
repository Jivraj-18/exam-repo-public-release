import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-api-location-filter.js").then(m => [m.default({ user })])),
    ...(await import("./q-get-request.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions-scheduling.js").then(m => [m.default({ user })])),
    ...(await import("./q-html-parsing.js").then(m => [m.default({ user })])),
    ...(await import("./q-web-scraping.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}