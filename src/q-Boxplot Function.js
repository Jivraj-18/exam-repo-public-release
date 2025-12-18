import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-seaborn-boxplot";
  const title = "Seaborn Boxplot Function";

  const answer = "sns.boxplot";

  const question = html`
    <div class="mb-3">
      <p>
        Which Seaborn function is used to create a
        <strong>boxplot</strong> for comparing distributions
        across different categories?
      </p>
      <label for="${id}" class="form-label">Function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
