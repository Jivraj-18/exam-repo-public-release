import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-count-files";
  const title = "Count Files";

  const answer = "ls | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        Which shell command counts the <strong>number of files</strong>
        in the current directory (excluding hidden files)?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
