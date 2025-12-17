import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-zscore";
  const title = "Excel Z-Score Function";

  const answer = "STANDARDIZE";

  const question = html`
    <div class="mb-3">
      <p>
        In the "Z-Score Outlier Surveillance" task, which Excel function is explicitly recommended 
        to compute the z-score for each clinic by using the score, mean, and standard deviation?
      </p>
      <label for="${id}" class="form-label">Function Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}