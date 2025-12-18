import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-regex-email";
  const title = "Regex Email Validation";

  const answer = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  const question = html`
    <div class="mb-3">
      <p>
        Write a regular expression pattern that matches a basic email address
        (e.g., <code>user@example.com</code>).
      </p>
      <label for="${id}" class="form-label">Regex pattern:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
