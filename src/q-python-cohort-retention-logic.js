import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-cohort";
  const title = "Python: Cohort Retention Definition";

  const answer = "active users divided by cohort size";

  const question = html`
    <div class="mb-3">
      <p>
        In a subscription cohort analysis using Pandas,
        <strong>Month 2 retention</strong> is calculated as:
      </p>
      <p>
        Number of users active in Month 2 divided by ________.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}