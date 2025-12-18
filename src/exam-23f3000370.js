import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-github-commits-api-inspection.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-bash-csv-average.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-jsonpath-latitude.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-css-selector-active-row.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-llm-json-prompt.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for scoring
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
