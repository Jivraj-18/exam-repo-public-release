import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-pages-command";
  const title = "GitHub Pages Deployment Command";

  const answer = "git push origin main";

  const question = html`
    <div class="mb-3">
      <p>
        After committing your static website files locally,
        which Git command publishes the site to GitHub so it can
        be served via <strong>GitHub Pages</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
