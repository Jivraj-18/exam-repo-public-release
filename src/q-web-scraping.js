import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wiki-headings";
  const title = "Wikipedia Heading Selector";

  const answer = "h1, h2, h3, h4, h5, h6";

  const question = html`
    <div class="mb-3">
      <p>
        Which CSS selector selects <strong>all heading levels</strong>
        (H1 to H6) from a Wikipedia HTML page?
      </p>
      <label for="${id}" class="form-label">CSS Selector:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
