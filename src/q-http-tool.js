import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.4 }) {
  const id = "q-http-tool";
  const title = "HTTP Request Tool";

  const answer = "curl";

  const question = html`
    <div class="mb-3">
      <p>
        Which command-line tool is commonly used to send HTTP requests
        (GET, POST, PUT, DELETE) directly from the terminal?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
