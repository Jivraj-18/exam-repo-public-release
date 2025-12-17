import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-sum";
  const title = "Sum Table Values with Playwright";

  const answer = 'Array.from(document.querySelectorAll("table td")).map(td => Number(td.textContent)).filter(n => !isNaN(n)).reduce((a,b) => a+b, 0)';

  const question = html`
    <div class="mb-3">
      <p>
        Write a JavaScript expression that sums
        <strong>all numeric values</strong>
        from <strong>every table cell</strong>
        on a page after Playwright has rendered it.
      </p>
      <label for="${id}" class="form-label">JavaScript:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
