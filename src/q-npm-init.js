import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-npm-init";
    const title = "Initialize Node Project";

    const answer = "npm init -y";

    const question = html`
    <div class="mb-3">
      <p>
        Which command initializes a new <strong>Node.js project</strong> with
        default settings (auto-generating <code>package.json</code>)?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
