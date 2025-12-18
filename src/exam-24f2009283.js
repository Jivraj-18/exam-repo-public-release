import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-revealjs-concepts.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-marp-structure.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-marimo-reactivity.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-excel-correlation.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-seaborn-violin.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
  ];

  // Render all questions
  displayQuestions(results, elementMap);

  // Return structure required for grading
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
