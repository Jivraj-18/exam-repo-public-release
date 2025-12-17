import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-grep-error";
  const title = "Search Text in Files";

  const answer = "grep error app.log";

  const question = html`
    <div class="mb-3">
      <p>
        Which command searches for the word
        <strong>error</strong> inside the file
        <code>app.log</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
