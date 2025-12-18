import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-env-var-export";
  const title = "Set Environment Variable (Linux)";

  const answer = "export API_KEY=12345";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command sets an environment variable named
        <strong>API_KEY</strong> with the value <strong>12345</strong>
        for the current shell session?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

