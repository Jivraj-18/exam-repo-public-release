// File: q-excel-correlation-region.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation-region";
  const title = "Excel Correlation Insight";
  const answer = "West";

  const question = html`
    <div class="mb-3">
      <p>
        After computing <code>=CORREL(Marketing_Spend, Net_Revenue)</code> for each
        region in Excel, which region shows the <strong>strongest positive
        correlation</strong>?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
