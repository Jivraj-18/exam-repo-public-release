import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-scrape-sum-ducks";
  const title = "Sum ESPN Cricinfo Ducks";

  const answer = "=SUM(C:C)";

  const question = html`
    <div class="mb-3">
      <p>
        After importing ESPN Cricinfo page 3 with IMPORTHTML, which formula
        <strong>sums the ducks column</strong> (column C) for total ducks?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
