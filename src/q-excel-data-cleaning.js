import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-trim";
  const title = "Excel: Remove Extra Spaces";

  const answer = "=TRIM(A1)";

  const question = html`
    <div class="mb-3">
      <p>
        Column A contains text values with
        <strong>leading, trailing, and repeated spaces</strong>.
      </p>
      <p>
        Which Excel formula cleans the text in cell A1 by removing unnecessary spaces?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
