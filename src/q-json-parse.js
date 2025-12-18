import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-stringify";
  const title = "Convert Object to JSON";

  const answer = "JSON.stringify";

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript method converts a JavaScript object
        into a JSON-formatted string?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
