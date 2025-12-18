import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-impute";
  const title = "Excel: Missing Value Imputation";

  const answer = "=IF(A2=\"\",B2*0.3,A2)";

  const question = html`
    <div class="mb-3">
      <p>
        In Excel, column A may be blank. Write a formula that
        replaces a blank value in A2 with <strong>30% of B2</strong>,
        otherwise keeps A2 unchanged.
      </p>
      <label for="${id}" class="form-label">Excel Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
