import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-json-to-object";
  const title = "Converting JSON String to Object";

  const answer = "JSON.parse";

  const question = html`
    <div class="mb-3">
      <p>
        A web API returns data as a JSON-formatted string. Which JavaScript
        method should be used to convert this string into a usable object?
      </p>
      <label for="${id}" class="form-label">Method Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
