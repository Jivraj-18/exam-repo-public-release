import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandoc-format";
  const title = "Pandoc Markdown Target";

  const answer = "markdown_strict";

  const question = html`
    <div class="mb-3">
      <p>
        When converting HTML to Markdown using Pandoc,
        which output format produces the <strong>most standard-compliant</strong>
        Markdown with minimal extensions?
      </p>
      <label for="${id}" class="form-label">Pandoc target:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
