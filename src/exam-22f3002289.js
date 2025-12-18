import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-region-cleanup.js").then(m =>
      m.default({ user, weight: 1 })
    )),
    ...(await import("./q-shell-log-filter.js").then(m =>
      m.default({ user, weight: 1 })
    )),
    ...(await import("./q-json-temperature-normalisation.js").then(m =>
      m.default({ user, weight: 1 })
    )),
    ...(await import("./q-duckdb-inventory-metrics.js").then(m =>
      m.default({ user, weight: 1 })
    )),
    ...(await import("./q-editor-tag-normalisation.js").then(m =>
      m.default({ user, weight: 1 })
    )),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
