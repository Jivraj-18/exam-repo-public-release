import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-run";
  const title = "Running FastAPI";

  const answer = "uvicorn main:app";

  const question = html`
    <div class="mb-3">
      <p>
        What is the standard command to start a FastAPI application
        defined as <code>app</code> inside <code>main.py</code> using Uvicorn?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
