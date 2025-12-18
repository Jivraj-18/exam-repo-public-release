import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Excel: Identifying Strongest Correlation";

  const answer = "West";

  const question = html`
    <div class="mb-3">
      <p>
        You calculated Pearson correlations between <strong>Ad Spend</strong> and
        <strong>Sales Revenue</strong> for four regions in Excel using
        <code>=CORREL()</code>.
      </p>
      <p>
        Which region shows the <strong>highest positive correlation</strong>,
        indicating the strongest spend-to-revenue relationship?
      </p>
      <label for="${id}" class="form-label">Region name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
