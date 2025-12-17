import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-context-engineering-prompts-md.js")
        .then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-promptfoo-eval-config.js")
        .then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-advanced-html-crawl-analysis.js")
        .then((m) => m.default({ user, weight: 2 }))),
    },
    {
      ...(await import("./q-duckdb-marketing-saturation.js")
        .then((m) => m.default({ user, weight: 1.5 }))),
    },
    {
      ...(await import("./q-llm-intent-classification.js")
        .then((m) => m.default({ user, weight: 1.5 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
