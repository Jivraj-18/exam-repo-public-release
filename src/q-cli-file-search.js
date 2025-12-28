import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-find";
  const title = "Find Files by Extension";

  const answer = "find . -name '*.csv'";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command searches the <strong>current directory and all subdirectories</strong>
        for files ending with <code>.csv</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
