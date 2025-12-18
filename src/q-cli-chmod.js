import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-chmod";
  const title = "Change File Permissions";

  const answer = "chmod 755 script.sh";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command gives the owner full permissions
        and read/execute permissions to others for
        <code>script.sh</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
