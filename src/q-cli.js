import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-html-only";
  const title = "Download HTML Files with wget";

  const answer = "--accept html,htm";

  const question = html`
    <div class="mb-3">
      <p>
        Which <code>wget</code> option ensures that <strong>only HTML files</strong>
        (with extensions <code>.html</code> and <code>.htm</code>) are downloaded
        during a recursive crawl?
      </p>
      <label for="${id}" class="form-label">Option:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
