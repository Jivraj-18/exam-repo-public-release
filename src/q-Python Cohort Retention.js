import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-cohort-retention";
  const title = "Python: Cohort Retention Calculation";

  const answer = "0.58";

  const question = html`
    <div class="mb-3">
      <p>
        You are analyzing a subscription dataset with columns:
        <code>customer_id</code>, <code>signup_month</code>,
        <code>month_offset</code>, and <code>active_flag</code>.
      </p>
      <p>
        Using Pandas, you compute a cohort retention matrix.
        For the cohort <strong>2024-02</strong>, 58 out of 100 customers
        remain active at <strong>month_offset = 2</strong>.
      </p>
      <p>
        What is the <strong>Month 2 retention rate</strong>?
      </p>
      <label for="${id}" class="form-label">Retention rate (decimal):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}