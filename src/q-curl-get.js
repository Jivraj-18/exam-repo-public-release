import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-curl-get";
  const title = "GET Request using curl";

  const answer = "curl https://example.com";

  const question = html`
    <div class="mb-3">
      <p>
        Write a <code>curl</code> command to send a GET request
        to <code>https://example.com</code>.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
