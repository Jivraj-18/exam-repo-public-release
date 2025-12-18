import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Excel: Channel Spend vs Revenue Correlation";

  const answer = "Search";

  const question = html`
    <div class="mb-3">
      <p>
        A marketing team analyzed campaign data across multiple channels.
        Using Excel’s <code>CORREL()</code> function, they computed the
        Pearson correlation between <strong>Ad Spend</strong> and
        <strong>Revenue</strong> for each channel.
      </p>
      <p>
        Which channel shows the <strong>strongest positive correlation</strong>
        and should be prioritized for budget scaling?
      </p>
      <label for="${id}" class="form-label">Channel:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
