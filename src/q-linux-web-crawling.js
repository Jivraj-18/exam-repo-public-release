import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget";
  const title = "Website Crawling Tool";

  const answer = "wget";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>Linux command-line tool</strong> is commonly used to
        <strong>recursively download websites</strong> for offline access?
      </p>
      <label for="${id}" class="form-label">Tool:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
