import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-wiki-headings.js").then(m => [m.default({ user })])),
    ...(await import("./q-nominatim-bbox.js").then(m => [m.default({ user })])),
    ...(await import("./q-hn-rss.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-newest.js").then(m => [m.default({ user })])),
    ...(await import("./q-scrape-amazon-products.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright-sum.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
