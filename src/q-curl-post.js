import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-curl-post";
  const title = "POST JSON using curl";

  const answer = 'curl -X POST -H "Content-Type: application/json" -d \'{"a":1}\' https://example.com';

  const question = html`
    <div class="mb-3">
      <p>
        Write a <code>curl</code> command to send the JSON
        <code>{"a":1}</code> via POST to <code>https://example.com</code>.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}