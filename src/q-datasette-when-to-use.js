import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-datasette-when-to-use";
  const title = "When to Use Datasette";
  const answer = "Quick exploratory analysis without writing SQL";

  const question = html`
    <div class="mb-3">
      <p>
        A non-technical stakeholder wants to explore a SQLite database
        using filters, facets, and CSV exports.
        Why is <strong>Datasette</strong> the best tool for this task?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}