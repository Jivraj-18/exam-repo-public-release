import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-shell-log-audit.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-editor-tag-normalizer.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-json-order-flatten.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-duckdb-inventory-metrics.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-date-currency-cleaning.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}


