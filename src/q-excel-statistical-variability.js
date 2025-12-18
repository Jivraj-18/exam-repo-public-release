import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
export default async function ({ user, weight = 1 }) {
  const id = "q-excel-stdev";
  const title = "Excel Statistical Analysis";

  const answer = "STDEV.S";

  const question = html`
    <div class="mb-3">
      <p>
        Which Excel function should be used to calculate the 
        <strong>Standard Deviation</strong> of a <strong>sample</strong> 
        of sales data?
      </p>
      <label for="${id}" class="form-label">Function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}