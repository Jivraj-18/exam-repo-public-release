import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-imputation.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
    {
      ...(await import("./q-eda-visualization.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
    {
      ...(await import("./q-ts-features.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
    {
      ...(await import("./q-model-evaluation.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
    {
      ...(await import("./q-fastapi-validation.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return data for scoring
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
