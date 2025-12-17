import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-movie-geo.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-finance.js").then(m => [m.default({ user })])),
    ...(await import("./q-hn-markdown.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-lang.js").then(m => [m.default({ user })])),
    ...(await import("./q-weather-playwright.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}