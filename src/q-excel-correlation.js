import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Excel: Channel Spend vs Revenue Correlation";

  const answer = "Social";

  const question = html`
    <div class="mb-3">
      <p>
        A retail company tracked <strong>weekly ad spend</strong> and
        <strong>net revenue</strong> across four marketing channels:
        Email, Search, Social, and Display.
      </p>
      <p>
        Using Excel, calculate the <strong>Pearson correlation</strong> between
        Spend and Revenue separately for each channel.
      </p>
      <p>
        Which channel shows the <strong>strongest positive correlation</strong>?
      </p>
      <label for="${id}" class="form-label">Channel:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
