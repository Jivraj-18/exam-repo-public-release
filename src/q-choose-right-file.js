import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-chart-selection";
  const title = "Chart Selection Basics";

  const answer = "line chart";

  const question = html`
    <div class="mb-3">
      <p>
        Which type of chart is most appropriate to show
        <strong>trends over time</strong>?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
