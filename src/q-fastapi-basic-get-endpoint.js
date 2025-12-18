import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-root";
  const title = "FastAPI Root Endpoint";

  const answer = "@app.get('/')";

  const question = html`
    <div class="mb-3">
      <p>
        In FastAPI, which decorator is used to define a
        <strong>GET endpoint at the root path (<code>/</code>)</strong>?
      </p>
      <label for="${id}" class="form-label">Decorator:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
