// File: q-sql-activation-spike.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-activation-spike";
  const title = "SQL Activation Lift (Rolling Average)";
  const answer = "0.48";

  const question = html`
    <div class="mb-3">
      <p>
        Using a 7-day trailing average with SQL window functions, what is the
        <strong>maximum positive activation lift</strong> for the
        <strong>EMEA</strong> region?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
