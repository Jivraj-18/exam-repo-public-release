import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-validate";
  const title = "JSON Validation";

  const answer = "jsonlint";

  const question = html`
    <div class="mb-3">
      <p>
        Which tool is commonly used to
        <strong>validate and pretty-print JSON files</strong>?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
