import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-chmod";
  const title = "Change File Permissions";

  const answer = "chmod 755 file.txt";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command gives the owner full permissions and others
        read & execute permissions for <code>file.txt</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
