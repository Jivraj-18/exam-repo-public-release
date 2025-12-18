import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget";
  const title = "Crawl HTML Files with Wget";

  const answer =
    "wget --recursive --level=2 --no-parent --accept html,htm https://example.com";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>wget command</strong> recursively downloads
        <strong>only HTML files</strong> from a website,
        limited to <strong>2 levels</strong>, without visiting parent directories?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
