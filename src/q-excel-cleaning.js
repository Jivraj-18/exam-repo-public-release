import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-cleaning";
  const title = "Excel: Regional Revenue Cleanup";

  const answer = "18425.50";

  const question = html`
    <div class="mb-3">
      <p>
        You are given an Excel sheet containing monthly sales data with inconsistent
        region names (<code>EU</code>, <code>Europe</code>, <code>EUROPE</code>) and
        currency-formatted values such as <code>$12,340</code> or <code>USD TBD</code>.
      </p>
      <p>
        After standardising the region to <strong>Europe</strong>, converting revenue
        to numbers, and replacing missing values with <strong>20% of sales</strong>,
        what is the <strong>total net revenue</strong> for Europe up to
        <strong>30 Sep 2024</strong>?
      </p>
      <label for="${id}" class="form-label">Total revenue (USD):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
