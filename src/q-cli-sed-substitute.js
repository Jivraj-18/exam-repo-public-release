import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-sed-substitute";
  const title = "Stream Text Substitution";

  const answer = "sed";

  const question = html`
    <div class="mb-3">
      <p>
        Which Unix command performs text transformations on an input stream,
        commonly used for in-place or piped <strong>substitutions</strong>
        (example: <code>sed 's/old/new/g'</code>)?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
