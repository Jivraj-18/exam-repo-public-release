import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-grep";
  const title = "Search Text in Files";

  const answer = "grep";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command is used to
        <strong>search for a specific text pattern</strong>
        inside files?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
