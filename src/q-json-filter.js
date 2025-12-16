import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-json-filter-24f2007692";
    const title = "Filter JSON Data";
    const rng = seedrandom(`${user.email}#${id}`);

    const threshold = Math.floor(rng() * 50) + 20;
    const data = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        value: Math.floor(rng() * 100)
    }));

    const info = data.filter(d => d.value > threshold);
    const expectedCount = info.length;

    const question = html`
    <div class="mb-3">
      <p>Given the JSON data below:</p>
      <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
      <p>How many items have a <code>value</code> greater than <strong>${threshold}</strong>?</p>
      <label for="${id}" class="form-label">Count:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

    const answer = (val) => Number(val) === expectedCount;

    return { id, title, weight, question, answer };
}
