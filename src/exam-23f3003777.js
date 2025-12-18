import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-github-repo-search.js").then((m) => [m.default({ user })])),
    ...(await import("./q-nomination-mumbai.js").then((m) => [m.default({ user })])),
    ...(await import("./q-wiki-population.js").then((m) => [m.default({ user })])),
    ...(await import("./q-hacker-news-api-filtering.js").then((m) => [m.default({ user })])),
    ...(await import("./q-pdf-table-calculation.js").then((m) => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
