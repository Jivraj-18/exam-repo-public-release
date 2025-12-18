import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-filter";
  const title = "Pandas DataFrame Filter";

  const answer = "df[df['age'] > 30]";

  const question = html`
    <div class="mb-3">
      <p>
        Write a Pandas expression to filter a DataFrame <code>df</code>
        to show only rows where the <code>age</code> column is
        <strong>greater than 30</strong>.
      </p>
      <label for="${id}" class="form-label">Code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
