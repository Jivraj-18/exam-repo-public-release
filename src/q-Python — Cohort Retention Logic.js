import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-cohort";
  const title = "Python: Cohort Retention Calculation";

  const answer = "0.72";

  const question = html`
    <div class="mb-3">
      <p>
        You performed a cohort analysis in Pandas using a dataset with
        <code>signup_month</code>, <code>month_offset</code>, and <code>active_flag</code>.
      </p>
      <p>
        For the cohort that signed up in <strong>2024-02</strong>,
        the number of active users at month offset 2 is 180 out of
        an original cohort size of 250.
      </p>
      <p>
        What is the <strong>month 2 retention rate</strong>?
      </p>
      <label for="${id}" class="form-label">Retention Rate:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
