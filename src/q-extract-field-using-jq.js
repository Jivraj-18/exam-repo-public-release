import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jq-extract";
  const title = "JSON: Extract Field";

  const answer = "jq '.users[].email' data.json";

  const question = html`
    <div class="mb-3">
      <p>
        Given a JSON file <code>data.json</code> containing an array
        <code>users</code>, which <strong>jq</strong> command extracts all
        user email addresses?
      </p>
      <label for="${id}" class="form-label">jq Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
