import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-cohort";
  const title = "Python: Month-2 Cohort Retention";

  const answer = "0.58";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a subscription activity dataset with columns:
        <code>customer_id</code>, <code>signup_month</code>,
        <code>month_offset</code>, and <code>active_flag</code>.
      </p>
      <p>
        Using Pandas, compute the <strong>Month 2 retention</strong> for the
        <strong>earliest signup cohort</strong>.
      </p>
      <p>
        Retention = active users at month 2 ÷ total cohort size.
      </p>
      <label for="${id}" class="form-label">Retention rate:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
