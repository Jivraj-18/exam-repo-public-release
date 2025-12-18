import { html } from "https://cdn.jsdelivr.net/npm/lit@3/index.js";
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-api-data-fetching.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-correlation-analysis.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-data-cleaning-outliers.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-llm-prompt-engineering.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-regex-identifier.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  // 2. Render questions to the DOM
  displayQuestions(results, elementMap);

  // 3. Return question data for scoring
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}