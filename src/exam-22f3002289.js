import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-excel-revenue-leakage.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>Practice Excel data cleaning: text normalization, date parsing, and numeric cleanup.</p>`,
      ],
    },
    {
      ...(await import("./q-shell-api-latency.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>Use grep, awk, and wc to filter structured logs.</p>`,
      ],
    },
    {
      ...(await import("./q-json-device-uptime.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>Stream JSONL data and compute filtered aggregates.</p>`,
      ],
    },
    {
      ...(await import("./q-duckdb-sales-efficiency.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>Join tables and compute business KPIs using DuckDB SQL.</p>`,
      ],
    },
    {
      ...(await import("./q-editor-log-normalization.js").then((m) =>
        m.default({ user, weight: 0.5 }),
      )),
      help: [
        html`<p>Normalize text logs using editor-based transformations.</p>`,
      ],
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
