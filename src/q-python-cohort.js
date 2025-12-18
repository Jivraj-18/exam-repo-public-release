import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-python-cohort-retention";
  const title = "Cohort Month 3 Retention";

  const answer = "0.62";

  const question = html`
    <div class="mb-3">
      <p>
        You performed a cohort analysis in Pandas using
        <code>signup_month</code> and <code>month_offset</code>.
        What is the <strong>month 3 retention rate</strong> for
        the <code>2024-01</code> cohort?
      </p>
      <label for="${id}" class="form-label">Retention Rate:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
