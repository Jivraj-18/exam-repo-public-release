import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-revenue-leakage";
  const title = "Excel: Revenue Leakage Audit";

  const answer = "__NUMERIC__"; // Expected numeric net revenue value

  const question = html`
    <div class="mb-3">
      <p>
        You are given a consolidated sales workbook with mixed date formats,
        inconsistent country names, and missing discount fields.
      </p>
      <ul>
        <li>Standardise regions</li>
        <li>Impute missing discounts as <strong>12%</strong> of gross revenue</li>
        <li>Compute total <strong>net revenue</strong></li>
      </ul>
      <p>
        Filter records for the <strong>EMEA</strong> region before
        <strong>30 June 2024</strong>.
      </p>
      <label for="${id}" class="form-label">
        Total net revenue (numeric value):
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
