import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-parse";
  const title = "Parse JSON in JavaScript";

  const answer = "JSON.parse";

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript function is used to convert a JSON string into a
        JavaScript object?
      </p>
      <label for="${id}" class="form-label">Function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
