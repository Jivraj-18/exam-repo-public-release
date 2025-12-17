import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-linux-process";
  const title = "List Running Processes";

  const answer = "ps aux";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command lists <strong>all running processes</strong>
        for all users with detailed information?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
