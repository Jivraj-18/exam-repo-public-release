import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wikipedia-headings";
  const title = "Wikipedia Heading Extraction";

  const answer = "h1, h2, h3, h4, h5, h6";

  const question = html`
    <div class="mb-3">
      <p>
        Which HTML tags must be extracted from a Wikipedia page
        to generate a complete <strong>Markdown outline</strong>?
      </p>
      <label for="${id}" class="form-label">HTML tags:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
