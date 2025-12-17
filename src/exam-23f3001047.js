import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1
    await import("./q-scrape-imdb-movies.js").then((m) =>
      m.default({
        user,
        weight: 1,
      }),
    ),

    // Question 2
    await import("./q-python-cohort-retention.js").then((m) =>
      m.default({
        user,
        weight: 1.25,
      }),
    ),

    // Question 3
    await import("./q-json-sensor-rollup.js").then((m) =>
      m.default({
        user,
        weight: 1,
      }),
    ),

    // Question 4
    await import("./q-image-compression-dynamic.js").then((m) =>
      m.default({
        user,
        weight: 1,
      }),
    ),

    // Question 5
    await import("./q-fastapi-coder.js").then((m) =>
      m.default({
        user,
        weight: 2,
      }),
    ),
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for grading
  return Object.fromEntries(
    results.map(({ id, answer, weight }) => [id, { answer, weight }]),
  );
}