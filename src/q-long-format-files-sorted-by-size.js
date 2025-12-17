import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-basic-1";
  const title = "List files sorted by size";

  const answer = "ls -lS";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command lists files in the current directory in
        <strong>long format</strong>, sorted by <strong>file size</strong>
        (largest first)?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
