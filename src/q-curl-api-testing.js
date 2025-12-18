import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-curl-get";
  const title = "curl API GET Request";

  const answer = "curl https://api.example.com/data";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>curl command</strong> sends a simple <strong>GET request</strong> to
        <code>https://api.example.com/data</code> and prints the response?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
