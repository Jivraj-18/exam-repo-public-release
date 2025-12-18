import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Python Data Preparation (8 questions, 8 different libraries)
    {
      ...(await import("./q-python-pandas-clean-orders.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-python-polars-events-jsonl.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-python-pyarrow-csv-cast-aggregate.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-python-dask-large-csv-filter-impute.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-python-duckdb-join-dedup-events.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-python-numpy-clip-mad.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-python-dateutil-parse-tz.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-python-rapidfuzz-dedupe-names.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}