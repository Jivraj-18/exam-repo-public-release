import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-venv";
  const title = "Python Virtual Environment";

  const answer = "python3 -m venv env";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python command creates a <strong>virtual environment</strong> named
        <code>env</code> in the current directory?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
