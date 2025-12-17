import { html } from "lit";

export default function ({ weight = 0.7 }) {
  return {
    id: "sql-null-semantics",
    title: "SQL: NULL Semantics",
    weight,
    prompt: html`
      <p>
        Given this table:
      </p>
      <pre><code>
value
-----
1
2
NULL
3
NULL
      </code></pre>
      <p>
        How many rows are returned by:
      </p>
      <pre><code>
SELECT * FROM table WHERE value != 2;
      </code></pre>
      <p>
        Enter the number only.
      </p>
    `,
    type: "number",
    answer: (v) => Number(v) === 2,
    explanation: html`
      <p>
        NULL comparisons evaluate to UNKNOWN and are filtered out.
        Rows returned: 1 and 3.
      </p>
    `,
  };
}
