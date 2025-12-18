import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-linux-ps";
  const title = "List Running Processes";

  const answer = "ps aux";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command displays <strong>all running processes</strong>
        along with their users, CPU usage, and memory usage?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
