import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-crawl";
  const title = "Crawl Website Using wget";

  const answer =
    "wget --recursive --level=3 --no-parent --accept html,htm https://example.com";

  const question = html`
    <div class="mb-3">
      <p>
        Which <code>wget</code> command recursively crawls a website up to
        depth <strong>3</strong> and downloads only HTML files?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
