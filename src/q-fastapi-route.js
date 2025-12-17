import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-route";
  const title = "FastAPI GET Route";

  const answer = "@app.get";

  const question = html`
    <div class="mb-3">
      <p>
        In FastAPI, which decorator is used to define a HTTP GET endpoint?
      </p>
      <label for="${id}" class="form-label">Decorator:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
