import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window";
  const title = "SQL Trailing Averages";

  const answer = "Window functions";

  const question = html`
    <div class="mb-3">
      <p>
        In the "Identify Trailing Activation Spikes" task, what specific SQL technique (involving an 
        <code>OVER</code> clause) is required to calculate a 7-day trailing average without collapsing 
        the result set?
      </p>
      <label for="${id}" class="form-label">SQL Technique:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}