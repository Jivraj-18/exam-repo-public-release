import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-run";
  const title = "Run FastAPI with Uvicorn";

  const answer = "uvicorn main:app --host 0.0.0.0 --port 8000";

  const question = html`
    <div class="mb-3">
      <p>
        What is the correct <strong>uvicorn command</strong> to run a FastAPI app
        defined as <code>app</code> inside <code>main.py</code> on port 8000?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
