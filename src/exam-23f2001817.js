import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-json-power-rollup.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-excel-sales-forecast.js").then((m) =>
        m.default({ user, weight: 0.5 }),
      )),
    },
    {
      ...(await import("./q-python-cohort-rides.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-web-scraping-news.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-image-compression-math.js").then((m) =>
        m.default({ user, weight: 0.75 }),
      )),
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for grading
  return Object.fromEntries(
    results.map(({ id, answer, weight }) => [
      id,
      { answer, weight },
    ]),
  );
}
