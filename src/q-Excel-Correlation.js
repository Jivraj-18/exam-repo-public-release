import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-channel-correlation";
  const title = "Excel: Channel Spend vs Revenue Correlation";

  const answer = "Social Media";

  const question = html`
    <div class="mb-3">
      <p>
        A company tracked monthly <strong>marketing spend</strong> and
        <strong>net revenue</strong> across four channels:
        Email, Search, Social Media, and Affiliates.
      </p>
      <p>
        Using Excel’s <code>=CORREL()</code> function, which channel showed
        the <strong>strongest positive correlation</strong> between spend and revenue?
      </p>
      <label for="${id}" class="form-label">Channel name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}