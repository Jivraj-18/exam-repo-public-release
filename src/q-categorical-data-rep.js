import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-categorical-data";
  const title = "Categorical Data";

  const answer = "bar chart";

  const question = html`
    <div class="mb-3">
      <p>
        Which visualization is best suited for comparing
        <strong>values across categories</strong>?
      </p>
      <label for="${id}" class="form-label">Chart type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
