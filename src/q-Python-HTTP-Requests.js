import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-requests";
  const title = "Python HTTP GET";

  const answer = "requests.get(url).json()";

  const question = html`
    <div class="mb-3">
      <p>
        In Python, using the <code>requests</code> library, how do you
        <strong>send a GET request and parse the response as JSON</strong>?
      </p>
      <label for="${id}" class="form-label">Python code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
