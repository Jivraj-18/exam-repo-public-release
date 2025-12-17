import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-api-json";
  const title = "Parse JSON with Python";

  const answer = "response.json()";

  const question = html`
    <div class="mb-3">
      <p>
        In Python's <code>requests</code> library, which method is used
        to convert an HTTP response into a JSON object?
      </p>
      <label for="${id}" class="form-label">Method:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
