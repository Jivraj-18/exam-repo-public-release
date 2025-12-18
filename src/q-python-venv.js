import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-python-venv";
    const title = "Python Virtual Environment Creation";

    const answer = "python3 -m venv venv";

    const question = html`
    <div class="mb-3">
      <p>
        Which command creates a new <strong>Python virtual environment</strong>
        named <code>venv</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
