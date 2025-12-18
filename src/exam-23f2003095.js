import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-json-filter-sum.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>Review JSON arrays and basic filtering operations.</p>`,
      ],
    },

    {
      ...(await import("./q-cli-wordcount.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>Think about how <code>grep</code> and <code>wc</code> work.</p>`,
      ],
    },

    {
      ...(await import("./q-http-status.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>Recall how HTTP status codes are grouped.</p>`,
      ],
    },

    {
      ...(await import("./q-pandas-mean.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>This mirrors Pandas <code>Series.mean()</code>.</p>`,
      ],
    },

    {
      ...(await import("./q-sql-count.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
      help: [
        html`<p>Translate the SQL query into plain English.</p>`,
      ],
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for grading
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
