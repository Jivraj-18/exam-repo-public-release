import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-excel-correlation";
  const title = "Excel Correlation Matrix Constraint";

  const answer = "pairwise linear relationship";

  const question = html`
    <div class="mb-3">
      <p>
        Excel’s correlation matrix (Data Analysis ToolPak)
        measures only the strength of a
        <strong>________</strong> between two variables
        and can fail to detect non-linear dependencies.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
