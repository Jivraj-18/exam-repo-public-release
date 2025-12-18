// Created by 23f2001207

import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-weather-aggregation.js").then(m => [m.default({ user })])),
    ...(await import("./q-js-rendered-table.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-user-search.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-filtered-sum.js").then(m => [m.default({ user })])),
    ...(await import("./q-crawled-file-count.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}