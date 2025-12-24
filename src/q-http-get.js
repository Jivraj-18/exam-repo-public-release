import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-http-get";
    const title = "Basic HTTP Request";

    const answer = "curl";

    const question = html`
    <div class="mb-3">
      <p>
        Which command-line tool is commonly used to send an
        <strong>HTTP GET request</strong> to a URL and print the response
        directly to the terminal?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
