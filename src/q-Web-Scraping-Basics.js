import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-basic";
  const title = "Download Web Page with Wget";

  const answer = "wget https://example.com";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command downloads the HTML content of
        <code>https://example.com</code> and saves it locally using the default filename?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
