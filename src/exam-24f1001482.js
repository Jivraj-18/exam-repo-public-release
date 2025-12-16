import { displayQuestions } from "./utils/display.js";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-log-security-anomaly.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>Focus on filtering logs by IP and HTTP status codes.</p>`],
    },
    {
      ...(await import("./q-csv-refund-reconciliation.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>Watch out for dirty currency formatting in the CSV.</p>`],
    },
    {
      ...(await import("./q-json-inventory-audit.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>You will need to traverse nested arrays (Zones -> Shelves -> Items).</p>`],
    },
    {
      ...(await import("./q-sql-mock-hr-overtime.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>Overtime applies only to hours worked beyond 8 in a single day.</p>`],
    },
    {
      ...(await import("./q-regex-invoice-extractor.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
      help: [html`<p>Use Regex or string splitting to isolate the IDs.</p>`],
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}