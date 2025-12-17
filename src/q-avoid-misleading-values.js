import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-misleading-charts";
  const title = "Ethical Visualization";

  const answer = "truncated axis";

  const question = html`
    <div class="mb-3">
      <p>
        Starting the y-axis at a value other than zero can result in a
        <strong>________</strong> that exaggerates differences.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
