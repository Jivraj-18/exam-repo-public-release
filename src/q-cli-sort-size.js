import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-sort-size";
  const title = "Sort Files by Size";

  const answer = "ls -lhS";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command lists files in the current directory in
        <strong>human-readable format</strong> and sorts them by
        <strong>file size (largest first)</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
