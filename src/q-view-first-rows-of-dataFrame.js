import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-head";
  const title = "Python: Inspect DataFrame";

  const answer = "head";

  const question = html`
    <div class="mb-3">
      <p>
        Which Pandas DataFrame method displays the <strong>first 5 rows</strong>
        by default?
      </p>
      <label for="${id}" class="form-label">Method name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
