import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-venv";
  const title = "Python Virtual Environment";

  const answer = "python -m venv venv";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python command creates a <strong>virtual environment named <code>venv</code></strong>
        using the built-in standard library?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
