import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-api-method";
  const title = "HTTP API Basics";

  const answer = "GET";

  const question = html`
    <div class="mb-3">
      <p>
        Which HTTP method is typically used to <strong>retrieve data</strong>
        from a public REST API without modifying the server state?
      </p>
      <label for="${id}" class="form-label">HTTP Method:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
