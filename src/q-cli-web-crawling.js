import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-html-only";
  const title = "Wget HTML Crawling";

  const answer = "--accept html,htm";

  const question = html`
    <div class="mb-3">
      <p>
        While crawling a website using <code>wget</code>, you want to
        download <strong>only HTML files</strong>.
      </p>
      <p>
        Which wget option restricts downloads to <code>.html</code>
        and <code>.htm</code> files?
      </p>
      <label for="${id}" class="form-label">Option:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
