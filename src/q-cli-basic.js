import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-basic";
  const title = "Basic CLI Command";

  const answer = "ls -la";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command lists <strong>all files</strong> (including hidden ones)
        in the current directory in <strong>long format</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}