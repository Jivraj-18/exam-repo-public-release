import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-venv-activate";
  const title = "Activate Virtual Environment";

  const answer = "source venv/bin/activate";

  const question = html`
    <div class="mb-3">
      <p>
        Which command activates a Python virtual environment named
        <code>venv</code> on Linux or macOS?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
