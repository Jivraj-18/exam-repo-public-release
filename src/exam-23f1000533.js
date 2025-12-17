import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-google-sheet.js").then(m => [m.default({ user })])),
    ...(await import("./q-hacker-news-rss-search.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-api-search-users.js").then(m => [m.default({ user })])),
    ...(await import("./q-web-crawling-with-wget.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-to-markdown-conversion.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}