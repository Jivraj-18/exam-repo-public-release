import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.3 }) {
  const id = "q-excel-sum";
  const title = "Excel Basic Formula";

  const answer = "=SUM(A1:A10)";

  const question = html`
    <div class="mb-3">
      <p>
        Write an Excel or Google Sheets formula to calculate the
        total of values from cell <code>A1</code> to <code>A10</code>.
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
