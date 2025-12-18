import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-pages";
  const title = "GitHub Pages URL Format";

  const answer = "https://username.github.io/repository";

  const question = html`
    <div class="mb-3">
      <p>
        What is the general URL format for a website hosted using
        <strong>GitHub Pages</strong> from a project repository?
      </p>
      <label for="${id}" class="form-label">URL format:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
