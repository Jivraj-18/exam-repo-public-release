import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-marp-github-pages";
  const title = "Marp Image Rendering on GitHub Pages";

  const answer = "--allow-local-files";

  const question = html`
    <div class="mb-3">
      <p>
        When exporting a Marp presentation that contains
        <strong>local images</strong>, which CLI flag is required
        to ensure images render correctly in the exported
        HTML or PDF (especially when deployed via GitHub Pages)?
      </p>
      <label for="${id}" class="form-label">CLI flag:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
