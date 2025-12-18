import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-cohort";
  const title = "Python: Cohort Retention Analysis";

  const answer = "0.61";

  const question = html`
    <div class="mb-3">
      <p>
        Using Pandas, you created a cohort retention table where rows represent
        <strong>signup month</strong> and columns represent <strong>month offsets</strong>.
      </p>
      <p>
        What is the <strong>Month-3 retention rate</strong> for the
        <code>2024-01</code> cohort?
      </p>
      <label for="${id}" class="form-label">Retention rate:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
