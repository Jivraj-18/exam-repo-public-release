import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Excel Correlation Function";

  const answer = "CORREL";

  const question = html`
    <div class="mb-3">
      <p>
        Which Excel function is used to calculate the Pearson correlation
        coefficient between two numeric ranges?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
