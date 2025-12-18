import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-export";
  const title = "Set Environment Variable";

  const answer = "export API_KEY=abc123";

  const question = html`
    <div class="mb-3">
      <p>
        Which shell command sets an environment variable
        named <code>API_KEY</code> with the value <code>abc123</code>
        for the current session?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
