import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-hidden-tests";
  const title = "Hidden Tests";

  const answer = "overfitting";

  const question = html`
    <div class="mb-3">
      <p>
        AI-generated code may pass visible tests while failing real-world cases.
      </p>
      <p>
        Hidden tests are primarily used to prevent what behavior?
      </p>
      <label for="${id}" class="form-label">One-word answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
