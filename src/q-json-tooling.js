import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-tool";
  const title = "Streaming JSON Parsing";

  const answer = "jq";

  const question = html`
    <div class="mb-3">
      <p>
        Which command-line tool is commonly used to
        <strong>filter and transform JSON</strong>
        directly in the shell?
      </p>
      <label for=${id} class="form-label">Tool Name:</label>
      <input class="form-control" id=${id} name=${id} />
    </div>
  `;

  return { id, title, weight, question, answer };
}
