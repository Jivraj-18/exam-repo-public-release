import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-filter-sum";
  const title = "JSON Filter and Sum";

  const random = seedrandom(`${user.email}#${id}`);

  const prices = Array.from({ length: 12 }, () =>
    Math.floor(random() * 200),
  );

  const threshold = Math.floor(random() * 100) + 50;

  const answer = prices
    .filter((p) => p >= threshold)
    .reduce((a, b) => a + b, 0);

  const question = html`
    <div class="mb-3">
      <p>You are given a JSON array of product prices:</p>

      <pre><code class="language-json">${JSON.stringify(prices)}</code></pre>

      <p>
        Filter out all prices less than <strong>${threshold}</strong>, then
        compute the sum of the remaining values.
      </p>

      <label for="${id}" class="form-label">What is the sum?</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
