import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-html-md-tool";
  const title = "HTML to Markdown Tool";

  const answer = "pandoc";

  const question = html`
    <div class="mb-3">
      <p>
        Which command-line tool is commonly used to convert HTML files
        to Markdown while preserving structure?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
