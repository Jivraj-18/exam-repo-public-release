import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-server";
  const title = "FastAPI Production Server";

  const answer = "uvicorn";

  const question = html`
    <div class="mb-3">
      <p>
        Which ASGI server is most commonly used to run
        <strong>FastAPI</strong> applications in production?
      </p>
      <label for="${id}" class="form-label">Server name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
