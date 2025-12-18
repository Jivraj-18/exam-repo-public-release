import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-accept";
  const title = "Wget File Type Filter";

  const answer = "--accept html,htm";

  const question = html`
    <div class="mb-3">
      <p>
        Which <code>wget</code> option restricts downloads to only
        <strong>HTML files</strong> during a crawl?
      </p>
      <label for="${id}" class="form-label">Option:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
