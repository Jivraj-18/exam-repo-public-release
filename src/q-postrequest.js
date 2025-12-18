import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-http-post";
  const title = "HTTP: POST JSON";

  const answer = 'curl -X POST -H "Content-Type: application/json"';

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>curl option combination</strong> is required to send
        a <strong>POST request with a JSON body</strong>?
      </p>
      <label for="${id}" class="form-label">Options:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
