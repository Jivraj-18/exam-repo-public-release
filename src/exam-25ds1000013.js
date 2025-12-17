import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-excel-correlation-channel.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-python-cohort-arpu.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-sql-rolling-churn.js").then((m) =>
        m.default({ user, weight: 1.25 })
      )),
    },
    {
      ...(await import("./q-duckdb-sku-profitability.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-network-degree-centrality.js").then((m) =>
        m.default({ user, weight: 0.75 })
      )),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
