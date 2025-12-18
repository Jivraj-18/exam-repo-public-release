import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-cohort";
  const title = "Pandas Cohort Retention Logic";

  const answer = "active_users / cohort_size";

  const question = html`
    <div class="mb-3">
      <p>
        In a Pandas-based cohort analysis, month-wise retention is calculated by
        dividing the number of <strong>active users</strong> in a given month by
        the <strong>original cohort size</strong>.
      </p>
      <p>
        Which expression correctly represents this calculation?
      </p>
      <label for="${id}" class="form-label">Expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
