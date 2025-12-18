import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window-vs-groupby";
  const title = "SQL Window Functions vs GROUP BY";
  const answer = "Window functions keep row-level detail";

  const question = html`
    <div class="mb-3">
      <p>
        You need both <strong>daily values</strong> and a
        <strong>rolling 7-day average</strong> in the same query.
        Why are <strong>window functions</strong> preferred over
        <code>GROUP BY</code>?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}