import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-groupby";
  const title = "Pandas GroupBy Sum";

  const answer = "df.groupby('category')['sales'].sum()";

  const question = html`
    <div class="mb-3">
      <p>
        Given a DataFrame <code>df</code> with columns <code>category</code> and <code>sales</code>, 
        write Python code using pandas to <strong>calculate the total sales for each category</strong>.
      </p>
      <label for="${id}" class="form-label">Python code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
