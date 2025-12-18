import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-http-get";
  const title = "Python HTTP GET Request";

  const answer = "requests.get";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python function from the <code>requests</code> library
        is used to send an HTTP GET request?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
