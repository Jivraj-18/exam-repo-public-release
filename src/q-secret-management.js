import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-secret-management";
  const title = "Secure Secret Management";

  const answer = "environment variables";

  const question = html`
    <div class="mb-3">
      <p>
        What is the recommended way to store API keys securely in a data science
        application instead of hardcoding them in source code?
      </p>
      <label for="${id}" class="form-label">Method:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
