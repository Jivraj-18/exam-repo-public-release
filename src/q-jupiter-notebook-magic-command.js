import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jupyter-magic";
  const title = "Jupyter Notebook Magic Command";

  const answer = "%timeit sum(range(1000))";

  const question = html`
    <div class="mb-3">
      <p>
        In Jupyter Notebook, which <strong>magic command</strong> measures the execution time
        of repeatedly running <code>sum(range(1000))</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
