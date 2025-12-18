import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    (await import("./q-data-sourcing-to-visualization.js")).default({
      user,
      weight: 1,
    }),

    (await import("./q-ai-assisted-coding.js")).default({
      user,
      weight: 1,
    }),

    (await import("./q-data-app-deployment.js")).default({
      user,
      weight: 1,
    }),

    (await import("./q-data-analysis-technique.js")).default({
      user,
      weight: 1,
    }),

    (await import("./q-data-storytelling.js")).default({
      user,
      weight: 1,
    }),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
