import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-editor-normalize";
  const title = "Normalize Text to Lowercase";

  const answer = "tr 'A-Z' 'a-z'";

  const question = html`
    <div class="mb-3">
      <p>
        You are processing text data in a Unix pipeline.
        Which command converts all uppercase letters
        to lowercase using standard input and output?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
