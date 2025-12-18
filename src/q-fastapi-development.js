import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-run";
  const title = "Run FastAPI App";

  const answer = "uvicorn main:app --reload";

  const question = html`
    <div class="mb-3">
      <p>
        Which command is typically used to run a FastAPI application
        defined as <code>app</code> inside <code>main.py</code> with auto-reload enabled?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
