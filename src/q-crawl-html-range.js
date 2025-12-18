import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-crawl-html-range";
  const title = "Crawled HTML File Analysis";

  const answer = "137";

  const question = html`
    <div class="mb-3">
      <p>
        Crawl the website:
        <br />
        <a href="https://sanand0.github.io/tdsdata/crawl_html/" target="_blank">
          crawl_html
        </a>
      </p>
      <p>
        Count how many <strong>HTML files</strong> satisfy <em>all</em> conditions:
      </p>
      <ul>
        <li>Filename starts with letters from <strong>D</strong> to <strong>R</strong></li>
        <li>File size is <strong>greater than 2 KB</strong></li>
        <li>Contains at least one <code>&lt;table&gt;</code> tag</li>
      </ul>
      <p>
        Use <code>wget</code>, <code>ripgrep</code>, or scripting as needed.
      </p>
      <label for="${id}" class="form-label">
        Number of matching HTML files:
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
