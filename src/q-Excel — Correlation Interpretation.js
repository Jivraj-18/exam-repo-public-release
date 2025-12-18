import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-correlation";
  const title = "Excel: Advertising Spend Correlation";

  const answer = "West";

  const question = html`
    <div class="mb-3">
      <p>
        A retail company analyzed advertising spend and monthly revenue across four regions.
        Using Excel's <code>=CORREL()</code> function, you calculated the Pearson correlation
        for each region.
      </p>
      <p>
        Which region shows the <strong>strongest positive correlation</strong>
        between advertising spend and revenue?
      </p>
      <label for="${id}" class="form-label">Region:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
