import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-jq-count";
  const title = "JSON: Count Filtered Records";

  const answer =
    "jq '[.[] | select(.status==\"active\" and .region==\"EU\")] | length' users.json";

  const question = html`
    <div class="mb-3">
      <p>
        Given a JSON array in <code>users.json</code> with fields
        <code>id</code>, <code>status</code>, and <code>region</code>,
        write a <code>jq</code> command to count users who are
        <strong>active</strong> and located in <strong>EU</strong>.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
