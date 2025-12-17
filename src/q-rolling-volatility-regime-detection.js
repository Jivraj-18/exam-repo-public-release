import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-volatility";
  const title = "Rolling Volatility Regime Shift";

  const answer = "2024-08";

  const question = html`
    <div class="mb-3">
      <p>
        A fintech platform tracks <strong>daily transaction value</strong>.
        You compute a <strong>30-day rolling standard deviation</strong>
        to detect volatility regime shifts.
      </p>
      <p>
        Using Pandas, identify the <strong>first month</strong> where rolling
        volatility exceeds <strong>2× the historical median volatility</strong>.
      </p>
      <label for="${id}" class="form-label">Month (YYYY-MM):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
