import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-trim";
  const title = "Excel: Remove extra spaces";

  const answer = "=TRIM(A1)";

  const question = html`
    <div class="mb-3">
      <p>
        Cell <code>A1</code> contains text with unwanted leading and trailing spaces.
      </p>
      <p>
        Which Excel formula removes these extra spaces while keeping single spaces
        between words?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
