import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Excel Correlation Matrix";

  const answer = "Data Analysis ToolPak";

  const question = html`
    <div class="mb-3">
      <p>
        Which Excel add-in is required to generate a
        <strong>correlation matrix</strong> directly from the
        <strong>Data → Data Analysis</strong> menu?
      </p>
      <label for="${id}" class="form-label">Add-in name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
