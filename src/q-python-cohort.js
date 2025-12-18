import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-cohort-retention";
  const title = "Python: Month-2 Cohort Retention";

  const answer = "0.61";

  const question = html`
    <div class="mb-3">
      <p>
        A SaaS platform performed cohort analysis using Python Pandas.
        Retention was calculated as:
      </p>
      <pre>active_users / total_users_in_cohort</pre>
      <p>
        For the <strong>2024-03 signup cohort</strong>, the number of
        active users in <strong>month offset = 2</strong> was
        122 out of 200.
      </p>
      <p>
        What is the Month-2 retention rate?
      </p>
      <label for="${id}" class="form-label">Retention (decimal):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
