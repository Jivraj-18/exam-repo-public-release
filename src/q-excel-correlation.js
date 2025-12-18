import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation-region";
  const title = "Excel: Channel Spend Correlation";

  const answer = "social";

  const question = html`
    <div class="mb-3">
      <p>
        A company analyzed 120 campaigns across four marketing channels:
        <strong>Email, Search, Social, and Affiliate</strong>.
        Using Excel, Pearson correlations were computed between
        <em>Ad Spend</em> and <em>Revenue</em> for each channel.
      </p>
      <p>
        Which channel showed the <strong>strongest positive correlation</strong>
        between spend and revenue?
      </p>
      <label for="${id}" class="form-label">Channel name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
