import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-format";
  const title = "Format JSON in CLI";

  const answer = "jq . data.json";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>jq command</strong> pretty-prints the contents of
        a JSON file named <code>data.json</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
