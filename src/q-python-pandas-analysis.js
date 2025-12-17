import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-pivot";
  const title = "Pandas Data Reshaping";

  const answer = "pivot_table";

  const question = html`
    <div class="mb-3">
      <p>
        For the "Subscription Cohort Retention" task in Python, which Pandas method is used to 
        reshape the dataframe so that <strong>signup_month</strong> appears as rows and 
        <strong>month_offset</strong> appears as columns?
      </p>
      <label for="${id}" class="form-label">Pandas method:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}