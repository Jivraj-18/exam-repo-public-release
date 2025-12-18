import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pip-install";
  const title = "Python Package Installation";

  const answer = "pip install numpy";

  const question = html`
    <div class="mb-3">
      <p>
        Which command is used to install the <strong>NumPy</strong> library
        using Python’s package manager?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
