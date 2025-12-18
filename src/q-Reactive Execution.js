import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-marimo-reactive";
  const title = "Marimo Reactive Cells";

  const answer = "reactive";

  const question = html`
    <div class="mb-3">
      <p>
        Marimo notebooks automatically re-run dependent cells when inputs change.
        What is this execution model called?
      </p>
      <label for="${id}" class="form-label">Execution model:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
