import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-basic-2";
  const title = "Create nested directories";

  const answer = "mkdir -p data/raw/html";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command creates the nested directory structure
        <code>data/raw/html</code> in a single step, creating any
        <strong>missing parent folders</strong> automatically?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}