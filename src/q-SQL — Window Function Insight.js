import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window";
  const title = "SQL: Trailing Average Spike Detection";

  const answer = "Asia-Pacific";

  const question = html`
    <div class="mb-3">
      <p>
        A growth analyst computed a 7-day trailing average of daily signups
        using a SQL window function.
      </p>
      <p>
        After calculating the percentage lift compared to the trailing average,
        one region consistently shows the highest positive spikes.
      </p>
      <p>
        Which region exhibits the <strong>largest activation surge</strong>?
      </p>
      <label for="${id}" class="form-label">Region:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
