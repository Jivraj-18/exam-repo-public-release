import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-dynamic-sum";
  const title = "Dynamic Table Aggregation with Playwright";

  const answer = "9284";

  const question = html`
    <div class="mb-3">
      <p>
        Visit the following dynamically rendered pages:
      </p>
      <ul>
        <li>Seed 121</li>
        <li>Seed 122</li>
        <li>Seed 123</li>
        <li>Seed 124</li>
      </ul>
      <p>
        Each page loads multiple tables via JavaScript.
      </p>
      <p>
        Using <strong>Playwright</strong>:
      </p>
      <ul>
        <li>Wait for all tables to render</li>
        <li>Extract all numeric values</li>
        <li>Ignore negative numbers</li>
        <li>Compute the grand total across all pages</li>
      </ul>
      <label for="${id}" class="form-label">
        Total sum:
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
