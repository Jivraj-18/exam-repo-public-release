import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-retail-cohort";
  const title = "Customer Retention Logic";
  const answer = "Signup Month";
  const question = html`
    <div class="mb-3">
      <p>A Data Analyst at a subscription-based 'Coffee Club' is performing a cohort analysis to see if users who joined during the Christmas promotion stay longer than those who joined in the summer. In their Pandas pivot table, what should they ideally use as the <b>rows (index)</b> to represent the different groups of customers?</p>
      <label for="${id}" class="form-label">Pivot Table Index:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. Revenue" />
    </div>
  `;

  return { id, title, weight, question, answer };
}