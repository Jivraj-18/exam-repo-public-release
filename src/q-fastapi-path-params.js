import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-path-params";
  const title = "FastAPI Dynamic Routing";
  const answer = "{item_id}";

  const question = html`
    <div class="mb-3">
      <p>
        In FastAPI, to define a <strong>path parameter</strong> in a decorator (for example, 
        to fetch a specific item by ID), what is the correct syntax for the variable 
        placeholder <code>item_id</code> inside the path string?
      </p>
      <label for="${id}" class="form-label">Syntax:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. :item_id" />
    </div>
  `;

  return { id, title, weight, question, answer };
}