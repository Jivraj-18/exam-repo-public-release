import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jq-select";
  const title = "jq: Filtering JSON";

  const answer = "select";

  const question = html`
    <div class="mb-3">
      <p>
        In the "Parsing JSON" tutorial, <code>jq</code> is used to filter streams. 
        Complete the following <code>jq</code> command to output only objects where the 
        <code>type</code> field is equal to "user":
      </p>
      <pre>cat data.jsonl | jq -c '_______(.type == "user") | {id, name}'</pre>
      <p>
        Which <code>jq</code> function goes in the blank?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}