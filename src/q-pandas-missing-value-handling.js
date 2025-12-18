import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-dropna";
  const title = "Pandas Missing Values";

  const answer = "df.dropna()";

  const question = html`
    <div class="mb-3">
      <p>
        In Pandas, which function removes <strong>all rows containing NaN values</strong>
        from the DataFrame <code>df</code>?
      </p>
      <label for="${id}" class="form-label">Function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
