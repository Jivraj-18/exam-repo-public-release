import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Identify Strongest Correlation";

  const answer = "West";

  const question = html`
    <div class="mb-3">
      <p>
        You calculated Pearson correlations between <code>Marketing_Spend</code>
        and <code>Net_Revenue</code> for four regions in Excel.
        Which region shows the <strong>strongest positive correlation</strong>?
      </p>
      <label for="${id}" class="form-label">Region:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
