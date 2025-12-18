import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-correlation-significance";
  const title = "Python Correlation Significance";
  const answer = "Positive and significant";

  const question = html`
    <div class="mb-3">
      <p>
        After computing the Pearson correlation between
        <code>monthly_revenue</code> and <code>active_users</code> in Pandas,
        how would you classify the relationship based on the
        <strong>correlation sign and p-value</strong>?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
