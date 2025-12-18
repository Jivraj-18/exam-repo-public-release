import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jq-extract-field";
  const title = "Extract Field from JSONL";

  const answer = "jq -r '.user_id' events.jsonl";

  const question = html`
    <div class="mb-3">
      <p>
        You have a newline-delimited JSON file <code>events.jsonl</code>,
        where each line contains a key called <code>user_id</code>.
        Which <code>jq</code> command prints only the user IDs,
        one per line, with no quotes?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
