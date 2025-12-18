import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-head";
  const title = "Preview File Content";

  const answer = "head";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command displays the <strong>first 10 lines</strong>
        of a file by default?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
