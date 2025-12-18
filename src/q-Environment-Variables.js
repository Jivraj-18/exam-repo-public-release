import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-env-export";
  const title = "Set Environment Variable (Linux/macOS)";

  const answer = "export API_KEY=secret123";

  const question = html`
    <div class="mb-3">
      <p>
        Which shell command sets an environment variable named
        <strong>API_KEY</strong> with the value <code>secret123</code>
        for the current session on Linux or macOS?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
