import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-table-usage";
  const title = "Tables vs Charts";

  const answer = "exact values";

  const question = html`
    <div class="mb-3">
      <p>
        Tables are most useful when the goal is to communicate
        <strong>________</strong> rather than patterns or trends.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
