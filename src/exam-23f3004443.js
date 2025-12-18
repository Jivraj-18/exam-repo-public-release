import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    await import("./q-osm-city-centroid.js").then((m) =>
      m.default({ user, weight: 1 }),
    ),
    await import("./q-hn-api-score.js").then((m) =>
      m.default({ user, weight: 1 }),
    ),
    await import("./q-html-link-count.js").then((m) =>
      m.default({ user, weight: 1 }),
    ),
    await import("./q-github-repo-stars.js").then((m) =>
      m.default({ user, weight: 1 }),
    ),
    await import("./q-csv-column-sum.js").then((m) =>
      m.default({ user, weight: 1 }),
    ),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, answer, weight }) => [id, { answer, weight }]),
  );
}
