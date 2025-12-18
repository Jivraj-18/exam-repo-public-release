import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pytest-run";
  const title = "Running Pytest";

  const answer = "pytest";

  const question = html`
    <div class="mb-3">
      <p>
        Which command is used to run all Python tests written using the
        <strong>pytest</strong> framework in the current project?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
