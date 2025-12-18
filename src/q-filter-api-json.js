import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-filter-api-json";
  const title = "Filter API JSON Records";

  const random = seedrandom(`${user.email}#${id}`);

  const records = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    score: Math.floor(random() * 100),
  }));

  const threshold = Math.floor(40 + random() * 30);
  const expected = records.filter(r => r.score >= threshold).length;

  const answer = (input) => Number(input) === expected;

  const question = html`
    <div class="mb-3">
      <p>
        You are given the following JSON records containing <code>id</code> and
        <code>score</code>.
      </p>
      <p>
        Count how many records have <strong>score ≥ ${threshold}</strong>.
      </p>

      <pre><code>${JSON.stringify(records, null, 2)}</code></pre>

      <label class="form-label">Count:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
