import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-download";
  const title = "Download File Using Wget";

  const answer = "wget https://example.com/file.html";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>wget command</strong> downloads a file located at
        <code>https://example.com/file.html</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
