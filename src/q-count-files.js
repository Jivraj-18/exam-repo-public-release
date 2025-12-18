import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-wc-files";
  const title = "CLI: Count Files in Directory";

  const answer = "ls | wc -l";

  const question = html`
    <div class="mb-3">
      <p><strong>Question name:</strong> ${title}</p>
      <p>
        Write a Linux command that counts how many files are present in the
        <strong>current directory</strong> (non-recursive).
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
