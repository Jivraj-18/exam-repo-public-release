import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-excel-correlation-region.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [
        html`<p>Review Excel CORREL and scatterplots.</p>`,
        html`<p>Focus on interpreting correlation strength, not causation.</p>`,
      ],
    },

    {
      ...(await import("./q-python-cohort-churn.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [
        html`<p>Use Pandas groupby + pivot_table.</p>`,
      ],
    },

    {
      ...(await import("./q-sql-rolling-growth.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [
        html`<p>Window functions: AVG() OVER, LAG().</p>`,
      ],
    },

    {
      ...(await import("./q-duckdb-margin-rank.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [
        html`<p>DuckDB can query CSVs directly.</p>`,
      ],
    },

    {
      ...(await import("./q-python-network-centrality.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [
        html`<p>Use NetworkX degree or betweenness centrality.</p>`,
      ],
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
