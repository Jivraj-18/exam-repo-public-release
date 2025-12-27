import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wiki-headings";
  const title = "Extract Wikipedia Headings";

  const answer = 'Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(h => "#".repeat(+h.tagName[1]) + " " + h.textContent.trim()).join("\\n")';

  const question = html`
    <div class="mb-3">
      <p>
        Write a <strong>browser JavaScript expression</strong> that extracts
        all Wikipedia page headings (<code>h1</code> to <code>h6</code>)
        and converts them into a <strong>Markdown outline</strong>.
      </p>
      <label for="${id}" class="form-label">JavaScript:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
