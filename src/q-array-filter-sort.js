import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-array-filter-sort";
  const title = "Array Filter and Sort Logic";

  const answer = "Beta, Delta, Alpha";

  const question = html`
    <div class="mb-3">
      <p>Given the following array of objects:</p>

      <pre>
[
  { name: "Alpha", score: 82 },
  { name: "Beta", score: 91 },
  { name: "Gamma", score: 67 },
  { name: "Delta", score: 91 },
  { name: "Epsilon", score: 75 }
]
      </pre>

      <p>
        Steps:
        <ol>
          <li>Remove objects with score &lt; 80</li>
          <li>Sort remaining items by score (descending), then name (A → Z)</li>
        </ol>
      </p>

      <label for="${id}" class="form-label">
        Final ordered list of names (comma-separated):
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
