import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-run";
  const title = "Run Python Script";

  const answer = "python script.py";

  const question = html`
    <div class="mb-3">
      <p>
        Which command runs a Python file named <code>script.py</code> from the terminal?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
