import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-google-sheet.js").then(m => [m.default({ user })])),
    ...(await import("./q-imdb-selector.js").then(m => [m.default({ user })])),
    ...(await import("./q-wikipedia-outline.js").then(m => [m.default({ user })])),
    ...(await import("./q-weather-locator.js").then(m => [m.default({ user })])),
    ...(await import("./q-bounding-box.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}