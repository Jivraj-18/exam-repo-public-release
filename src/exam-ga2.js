import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-excel-cost-allocation.js").then((m) => m.default({ user, weight: 1.0 }))),
    },
    {
      ...(await import("./q-editor-incident-timeline.js").then((m) => m.default({ user, weight: 1.0 }))),
    },
    {
      ...(await import("./q-shell-peak-concurrency.js").then((m) => m.default({ user, weight: 1.0 }))),
    },
    {
      ...(await import("./q-json-config-drift.js").then((m) => m.default({ user, weight: 1.0 }))),
    },
    {
      ...(await import("./q-duckdb-sla-breach.js").then((m) => m.default({ user, weight: 1.0 }))),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
