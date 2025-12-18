import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-curl-json";
  const title = "cURL JSON POST";

  const answer = 'curl -X POST -H "Content-Type: application/json"';

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>cURL command prefix</strong> is used to send a
        <strong>POST request with a JSON body</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
