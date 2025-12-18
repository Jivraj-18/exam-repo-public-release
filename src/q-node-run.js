import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.3 }) {
  const id = "q-node-run";
  const title = "Run JavaScript File with Node";

  const answer = "node app.js";

  const question = html`
    <div class="mb-3">
      <p>
        You have a JavaScript file named <code>app.js</code>.
        Which command is used to execute this file using Node.js?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
