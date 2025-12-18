import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-curl-json-put";
  const title = "Send JSON with curl";

  const answer =
    'curl -X PUT -H "Content-Type: application/json" -d \'{"user":"admin"}\' https://api.example.com/users';

  const question = html`
    <div class="mb-3">
      <p>
        Write a <code>curl</code> command to send a JSON payload
        <code>{"user":"admin"}</code> using the <strong>PUT</strong> method
        to <code>https://api.example.com/users</code>.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
