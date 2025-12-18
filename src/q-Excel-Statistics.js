import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-zscore";
  const title = "Excel Z-Score Threshold";

  const answer = "ABS(z) >= 2.5";

  const question = html`
    <div class="mb-3">
      <p>
        In Excel-based outlier detection, clinics are flagged for review if their
        satisfaction score deviates significantly from the mean.
      </p>
      <p>
        Which condition correctly identifies statistically extreme values?
      </p>
      <label for="${id}" class="form-label">Condition:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
