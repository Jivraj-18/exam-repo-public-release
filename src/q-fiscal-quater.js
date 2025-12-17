import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-quarter-date";
  const title = "Excel: Fiscal Quarter Normalisation";

  const answer = "last day of the quarter";

  const question = html`
    <div class="mb-3">
      <p>
        An Excel column contains mixed date formats, including
        fiscal quarter strings such as <code>2024 Q3</code>.
      </p>
      <p>
        When converting these values into real dates for aggregation,
        how should a fiscal quarter be represented?
      </p>
      <label for="${id}" class="form-label">Date interpretation:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

