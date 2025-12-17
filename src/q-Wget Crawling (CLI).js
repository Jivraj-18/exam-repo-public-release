import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-html-only";
  const title = "Crawl HTML Files with Wget";

  const answer = "wget --recursive --accept html,htm --no-parent";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>wget</strong> command option combination ensures that
        <strong>only HTML files</strong> are downloaded while crawling a website
        and that the crawler does <strong>not move to parent directories</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
