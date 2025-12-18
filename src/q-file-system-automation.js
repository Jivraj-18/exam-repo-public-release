import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-count-html-files";
  const title = "Count HTML Files";

  const answer = "find . -name '*.html' | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command counts the total number of
        <strong>.html files</strong> in the current directory
        and all subdirectories?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
