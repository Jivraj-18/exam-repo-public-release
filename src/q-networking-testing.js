import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-curl-basic";
  const title = "HTTP Request via CLI";

  const answer = "curl https://example.com";

  const question = html`
    <div class="mb-3">
      <p>
        Which command-line tool is commonly used to send an HTTP GET request
        to a URL directly from the terminal?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}