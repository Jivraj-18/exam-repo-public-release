import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-dynamic-filter-average";
  const title = "Excel Dynamic Arrays: FILTER + AVERAGE";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate random dataset
  const values = Array.from({ length: 12 }, () => Math.floor(random() * 90) + 10);
  const thresholds = [30, 40, 50, 60];
  const threshold = thresholds[Math.floor(random() * thresholds.length)];

  // Compute correct answer in JS
  const filtered = values.filter((v) => v >= threshold);
  const answer =
    filtered.length === 0
      ? 0
      : Math.round((filtered.reduce((a, b) => a + b, 0) / filtered.length) * 100) / 100;

  const question = html`
    <div class="mb-3">
      <p>
        This question checks your understanding of <strong>modern Excel dynamic array formulas</strong>
        (Office 365 required).
      </p>

      <p>Consider the following Excel formula:</p>

      <pre><code class="language-excel">
=AVERAGE(FILTER({${values.join(",")}}, {${values.join(",")}} >= ${threshold}))
      </code></pre>

      <p>
        The formula filters values that are <strong>greater than or equal to ${threshold}</strong>
        and then calculates their average.
      </p>

      <label for="${id}" class="form-label">
        What value does this formula return? (Round to 2 decimal places if needed)
      </label>

      <input class="form-control" id="${id}" name="${id}" />

      <p class="text-muted">
        If this formula returns <code>#NAME?</code>, your Excel version does not support dynamic arrays.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
