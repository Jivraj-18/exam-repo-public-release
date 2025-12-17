import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-funnel-elasticity";
  const title = "SQL Funnel Elasticity Spike";

  const answer = "Checkout";

  const question = html`
    <div class="mb-3">
      <p>
        A SaaS funnel records user counts at each stage daily.
        You calculate the <strong>percentage drop-off</strong> between
        consecutive stages using SQL window functions.
      </p>
      <p>
        Which funnel stage shows the <strong>maximum average drop-off elasticity</strong>
        over the last 14 days?
      </p>
      <label for="${id}" class="form-label">Stage name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
