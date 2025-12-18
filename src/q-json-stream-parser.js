import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-stream-parser";
  const title = "Stream Large JSON Files";

  const answer = "ijson";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python library is specifically designed to
        <strong>stream and parse very large JSON or JSONL files</strong>
        without loading the entire file into memory?
      </p>
      <label for="${id}" class="form-label">Library:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
