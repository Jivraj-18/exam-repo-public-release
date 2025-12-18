import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-html-markdown";
  const title = "Convert HTML to Markdown";

  const answer = "pandoc -f html -t markdown";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>Pandoc command options</strong> convert an
        HTML file into <strong>Markdown format</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
