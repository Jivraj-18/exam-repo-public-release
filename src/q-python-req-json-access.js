import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-json";
  const title = "Python JSON Parsing";

  const answer = 'response.json()["locationId"]';

  const question = html`
    <div class="mb-3">
      <p>
        In Python using <code>requests</code>, how do you access the
        <strong>locationId</strong> field from a JSON API response
        stored in the variable <code>response</code>?
      </p>
      <label for="${id}" class="form-label">Python expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}