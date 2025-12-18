import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-http-status";
  const title = "Check HTTP Status Code";

  const answer = "curl -I";

  const question = html`
    <div class="mb-3">
      <p>
        Which CLI command retrieves only the <strong>HTTP response headers</strong>
        (including the status code) of a webpage without downloading the body?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
