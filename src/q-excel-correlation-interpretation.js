import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation-sign";
  const title = "Excel Correlation Interpretation";

  const answer = "positive";

  const question = html`
    <div class="mb-3">
      <p>
        In Excel, if the result of
        <code>=CORREL(Marketing_Spend, Revenue)</code> is <strong>0.82</strong>,
        the relationship between spend and revenue is considered __________.
      </p>
      <label for="${id}" class="form-label">One word answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
