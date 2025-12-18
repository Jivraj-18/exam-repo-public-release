import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-google-sheet.js").then(m => [m.default({ user })])),
    ...(await import("./q-imdb-scraping.js").then(m => [m.default({ user })])),
    ...(await import("./q-weather-api.js").then(m => [m.default({ user })])),
    ...(await import("./q-wikipedia-outline.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright-summation.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}