import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-csv-cleaning-lossless.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-http-header-debug.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-json-flatten-advanced.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-git-history-repair.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-svg-bar-chart-fix.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for scoring
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
