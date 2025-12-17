import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Excel: Interpreting Correlation Strength";

  const answer = "Strong positive correlation";

  const question = html`
    <div class="mb-3">
      <p>
        In Excel, you calculate the Pearson correlation between 
        <strong>Advertising Spend</strong> and <strong>Monthly Revenue</strong>
        and obtain a value of <strong>0.82</strong>.
      </p>
      <p>
        How should this relationship be best described?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}