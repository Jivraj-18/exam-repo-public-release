import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-google-sheet.js").then(m => [m.default({ user })])),
    ...(await import("./q-web-scraping.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-api-search.js").then(m => [m.default({ user })])),
    ...(await import("./q-web-crawlin-wiget.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwrite.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}