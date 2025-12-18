import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-trim";
  const title = "Excel: Cleaning Whitespace";

  const answer = "TRIM";

  const question = html`
    <div class="mb-3">
      <p>
        Your dataset contains country names with accidental leading and trailing
        spaces (e.g., <code>" India "</code>). Which Excel function removes
        these extra spaces except for single spaces between words?
      </p>
      <label for="${id}" class="form-label">Function Name (without =):</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        style="text-transform: uppercase"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
