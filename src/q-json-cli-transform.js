import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-cli-transform";
  const title = "Transform JSON via CLI";

  const answer = "jq '.events[] | select(.status==\"error\") | .id' logs.json";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a file <code>logs.json</code> containing an object with an
        array field <code>events</code>. Each event has fields
        <code>id</code>, <code>timestamp</code>, and <code>status</code>.
      </p>
      <p>
        Write a <strong>single CLI command</strong> that prints only the
        <code>id</code> values of events whose <code>status</code> is
        <code>"error"</code>.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
