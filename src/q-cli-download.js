import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-download";
  const title = "Download File from Web";

  const answer = "wget";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command-line tool is commonly used to
        <strong>download files from a URL</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
