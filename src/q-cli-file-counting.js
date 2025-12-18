import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-count";
  const title = "Count Files Recursively";

  const answer = "find . -type f | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command counts the <strong>total number of files</strong>
        (not directories) in the current directory and all subdirectories?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
