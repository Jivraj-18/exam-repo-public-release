import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-curl-verbose";
  const title = "Verbose GET Request";

  const answer = "curl -v https://example.com";

  const question = html`
    <div class="mb-3">
      <p>
        Write a <code>curl</code> command to make a GET request to
        <code>https://example.com</code> with verbose output enabled.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
