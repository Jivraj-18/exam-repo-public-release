import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cors-header";
  const title = "CORS Allow All Origins";

  const answer = "Access-Control-Allow-Origin";

  const question = html`
    <div class="mb-3">
      <p>
        Which HTTP response header allows a server to specify
        <strong>which origins are permitted</strong> to access a resource?
      </p>
      <label for="${id}" class="form-label">Header name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

