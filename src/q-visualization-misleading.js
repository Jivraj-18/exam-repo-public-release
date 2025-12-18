import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-visualization-misleading";
  const title = "Avoid Misleading Visualization";

  const answer = "truncated y-axis";

  const question = html`
    <div class="mb-3">
      <p>
        A bar chart exaggerates small differences between values by starting the
        Y-axis at a non-zero value.
      </p>
      <p>
        What is this visualization issue called?
      </p>
      <label for="${id}" class="form-label">Term:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}