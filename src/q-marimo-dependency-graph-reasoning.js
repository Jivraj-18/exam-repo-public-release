import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-marimo-order";
  const title = "Marimo Execution Model";

  const answer = "topological order";

  const question = html`
    <div class="mb-3">
      <p>
        Marimo prevents out-of-order execution by running cells
        based on their variable dependencies.
        Internally, this execution follows a
        <strong>________ order</strong> of the dependency graph.
      </p>
      <label for="${id}" class="form-label">Answer (two words):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
