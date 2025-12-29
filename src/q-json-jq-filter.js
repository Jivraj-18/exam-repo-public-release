import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-jq-filter";
  const title = "JSON: Filtering with jq";

  const answer = "jq 'select(.status == \"active\")' users.jsonl";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a JSON Lines file <code>users.jsonl</code> where each line
        represents a user object containing a <code>status</code> field.
      </p>
      <p>
        Which <code>jq</code> command outputs only the objects whose
        <code>status</code> value is <strong>active</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
