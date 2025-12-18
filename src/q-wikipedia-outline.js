import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-wiki-outline";
  const title = "Wikipedia Outline Scraping";

  const answer = "h1, h2, h3, h4, h5, h6";

  const question = html`
    <div class="mb-3">
      <p>
        Which HTML tags must be extracted to build a
        <strong>Markdown outline</strong> of a Wikipedia page?
      </p>
      <label for="${id}" class="form-label">Tags:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
