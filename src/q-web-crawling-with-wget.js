import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-crawl";
  const title = "Website Crawling using wget";

  const answer =
    "wget --recursive --level=2 --no-parent --accept html,htm https://example.com/docs/";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>wget command</strong> recursively downloads only
        <strong>HTML files</strong> up to depth 2 from
        <code>https://example.com/docs/</code> without going to parent directories?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
