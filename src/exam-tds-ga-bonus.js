import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-data-sourcing.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-data-preparation.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-data-visualization.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-deployment-tools.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-ai-coding.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for evaluation
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
