import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-cors";
  const title = "Enable CORS in FastAPI";

  const answer = "CORSMiddleware";

  const question = html`
    <div class="mb-3">
      <p>
        Which FastAPI middleware is used to allow cross-origin
        requests when deploying an API that serves data to browsers?
      </p>
      <label for="${id}" class="form-label">Middleware name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
