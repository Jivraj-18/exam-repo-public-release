import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-wget";
  const title = "Download Webpage Using CLI";

  const answer = "wget https://example.com";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command downloads the HTML content of
        <code>https://example.com</code> to the current directory
        using the command-line?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
