import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-linux-disk-usage";
  const title = "Linux Disk Usage Command";

  const answer = "du -sh .";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command displays the <strong>total disk usage</strong>
        of the <strong>current directory</strong> in a human-readable format?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
