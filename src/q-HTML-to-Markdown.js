import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandoc-html-md";
  const title = "Convert HTML to Markdown";

  const answer = "pandoc -f html -t markdown input.html -o output.md";

  const question = html`
    <div class="mb-3">
      <p>
        Which Pandoc command converts <code>input.html</code>
        into a Markdown file named <code>output.md</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
