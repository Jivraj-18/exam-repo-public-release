import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-html";
  const title = "Wget HTML Crawling";

  const answer = "--accept html,htm";

  const question = html`
    <div class="mb-3">
      <p>
        Which <code>wget</code> option restricts downloads to
        <strong>HTML files only</strong>?
      </p>
      <label for="${id}" class="form-label">Option:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
