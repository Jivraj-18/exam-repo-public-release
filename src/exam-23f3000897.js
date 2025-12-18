import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-google-sheet.js").then(m => [m.default({ user })])),
    ...(await import("./q-imdb-scrapping.js").then(m => [m.default({ user })])),
    ...(await import("./q-wikipedia-outline.js").then(m => [m.default({ user })])),
    ...(await import("./q-nominating.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-action.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}