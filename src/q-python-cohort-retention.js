import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-cohort";
  const title = "Python: Subscription Cohort Retention";

  const answer = "0.58";

  const question = html`
    <div class="mb-3">
      <p>
        A SaaS company analyzed user retention using Python and Pandas.
        A cohort matrix was built using <code>signup_month</code> and
        <code>month_offset</code>.
      </p>
      <p>
        For users who signed up in <strong>2024-03</strong>, retention at
        <strong>Month 2</strong> is defined as:
      </p>
      <p><em>Active users at Month 2 ÷ Total users in the cohort</em></p>
      <p><strong>What is the Month 2 retention rate?</strong></p>
      <label for="${id}" class="form-label">Retention (decimal):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
