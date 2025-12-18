import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    (await import("./q-github-repo-metadata.js")).default({ user, weight: 1 }),
    (await import("./q-csv-row-count.js")).default({ user, weight: 1 }),
    (await import("./q-open-meteo-temperature.js")).default({ user, weight: 1 }),
    (await import("./q-word-frequency.js")).default({ user, weight: 1 }),
    (await import("./q-json-aggregation.js")).default({ user, weight: 1 }),
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for evaluation
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
