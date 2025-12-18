import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-task-route";
  const title = "FastAPI: Task Route Decorator";

  const answer = '@app.get("/task")';

  const question = html`
    <div class="mb-3">
      <p>
        In a FastAPI app where <code>app</code> is a FastAPI instance,
        which decorator line correctly declares a
        <strong>GET endpoint</strong> at path <code>/task</code>?
      </p>
      <label for="${id}" class="form-label">Decorator line:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
