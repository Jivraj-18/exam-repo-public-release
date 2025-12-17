import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-wiki-population.js").then(m => [m.default({ user })])),
    ...(await import("./q-nominatim-min-lat.js").then(m => [m.default({ user })])),
    ...(await import("./q-html-table-sum.js").then(m => [m.default({ user })])),
    ...(await import("./q-rss-latest.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-newest.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}