import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-command";
  const title = "wget Crawl Command";

  const answer = "wget --recursive --level=2 --no-parent https://example.com/docs/";

  const question = html`
    <div class="mb-3">
      <p>
        Provide the <strong>exact wget command</strong> that recursively crawls
        a website up to 2 levels deep without accessing parent directories.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
