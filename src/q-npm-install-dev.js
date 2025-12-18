import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-npm-install-dev";
  const title = "NPM Install Dev Dependency";

  const answer = "npm install --save-dev eslint";

  const question = html`
    <div class="mb-3">
      <p>
        Write an npm command to install <code>eslint</code> as a
        <strong>development dependency</strong> in your project.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
