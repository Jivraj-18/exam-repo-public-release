import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Excel: Marketing Spend Correlation";

  const answer = "West";

  const question = html`
    <div class="mb-3">
      <p>
        <strong>NovaElectro</strong> analyzed 80 campaigns across four regions.
        Each tracked <em>Marketing_Spend_USD</em> and <em>Revenue_USD</em>.
        In Excel, you used <code>=CORREL()</code> to calculate correlations for each region.
      </p>
      <p>
        Which region showed the <strong>strongest positive correlation</strong> between
        marketing spend and revenue?
      </p>
      <label for="${id}" class="form-label">Region:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
