import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-disk-usage";
  const title = "Check Disk Usage";

  const answer = "df -h";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command displays disk space usage
        in a <strong>human-readable</strong> format?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
