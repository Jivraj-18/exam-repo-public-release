import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-pages";
  const title = "GitHub Pages Deployment";

  const answer = "main";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>branch</strong> is commonly used as the source when enabling
        <strong>GitHub Pages</strong> for a repository?
      </p>
      <label for="${id}" class="form-label">Branch name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}