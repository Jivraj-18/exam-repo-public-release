import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-dataviz-chart-type";
  const title = "Choose the Right Chart for Time-Series Data";

  // Expected exact answer (case-insensitive matching handled by platform)
  const answer = "line chart";

  const question = html`
    <div class="mb-3">
      <p>
        You are given monthly sales data from January to December.
        The goal is to clearly show how sales change over time.
      </p>
      <p>
        Which type of chart is <strong>most appropriate</strong> for this task?
      </p>
      <p>
        Answer using one of the following:
        <code>line chart</code>, <code>bar chart</code>, <code>pie chart</code>
      </p>
      <label for="${id}" class="form-label">Chart type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
