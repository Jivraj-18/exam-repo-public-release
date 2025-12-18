import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-find-byname";
  const title = "Find Files by Name";

  const answer = "find";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command searches a directory tree for files matching a
        specified <strong>name pattern</strong> (for example: find . -name "notes.txt")?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
