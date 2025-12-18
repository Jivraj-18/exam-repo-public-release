import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-requests";
  const title = "Python API Requests Library";

  const answer = "requests";

  const question = html`
    <div class="mb-3">
      <p>
        Which popular Python library is commonly used to
        <strong>send HTTP requests</strong> to APIs
        and retrieve JSON data?
      </p>
      <label for="${id}" class="form-label">Library name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
