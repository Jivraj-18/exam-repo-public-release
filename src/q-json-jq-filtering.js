import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jq-filter";
  const title = "JSON: Filter Active Users";

  const answer = "jq '.users[] | select(.active == true)' data.json";

  const question = html`
    <div class="mb-3">
      <p>
        You have a JSON file <code>data.json</code> with a top-level array
        called <code>users</code>.
      </p>
      <p>
        Each user object contains a boolean field <code>active</code>.
        Write a <code>jq</code> command that outputs only active users.
      </p>
      <label for="${id}" class="form-label">jq command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
