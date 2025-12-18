import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-uvicorn";
  const title = "Run FastAPI Server";

  const answer = "uvicorn main:app --reload";

  const question = html`
    <div class="mb-3">
      <p>
        Which command starts a <strong>FastAPI</strong> application defined in
        <code>main.py</code> with the app instance named <code>app</code>
        and enables <strong>auto-reload</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

