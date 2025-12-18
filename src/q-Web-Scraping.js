import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-wget-basic";
    const title = "Download a Web Page with wget";

    const answer = "wget https://example.com";

    const question = html`
    <div class="mb-3">
      <p>
        Which <strong>single Linux command</strong> downloads the HTML content of
        <code>https://example.com</code> to the current directory using <code>wget</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
