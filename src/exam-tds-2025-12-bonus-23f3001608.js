import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-csv-to-json-cleaning.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-regex-log-p95.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-jq-jsonl-sessionize.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-pandas-rolling-kpi.js").then((m) => m.default({ user, weight: 1 }))),
    },
    {
      ...(await import("./q-seaborn-chart-encoding.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
