import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-sql-activation-lift";
  const title = "Detect Activation Spike";

  const answer = "0.31";

  const question = html`
    <div class="mb-3">
      <p>
        Using SQL window functions, you calculated a 7-day trailing average
        of daily activations for the <strong>EMEA</strong> region.
        What was the <strong>maximum positive lift</strong>
        compared to the trailing average?
      </p>
      <label for="${id}" class="form-label">Lift Value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
