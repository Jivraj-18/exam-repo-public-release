import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-crawl";
  const title = "Website Crawling with Wget";

  const answer = "wget --recursive --no-parent";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>wget options</strong> are required to
        <strong>recursively crawl a website</strong> while
        <strong>preventing access to parent directories</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
