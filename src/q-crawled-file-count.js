import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-crawl-vowel-files";
  const title = "Crawled File Analysis";

  const answer = "17";

  const question = html`
    <div class="mb-3">
      <p>
        Crawl the following website using a CLI crawler such as
        <code>wget</code> or <code>wget2</code>:
      </p>
      <p>
        <a href="https://sanand0.github.io/tdsdata/crawl_test/" target="_blank">
          https://sanand0.github.io/tdsdata/crawl_test/
        </a>
      </p>
      <p>
        Count how many downloaded <strong>HTML files</strong> have filenames
        starting with a <strong>vowel</strong> (a, e, i, o, u).
      </p>
      <label for="${id}" class="form-label">File Count:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
