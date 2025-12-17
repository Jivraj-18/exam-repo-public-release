import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rest-read-operation";
  const title = "REST API Read Operation";

  const answer = "GET";

  const question = html`
    <div class="mb-3">
      <p>
        In a RESTful service, which HTTP request method is commonly used
        when a client wants to read data from the server without causing
        any change?
      </p>
      <label for="${id}" class="form-label">HTTP Method:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
