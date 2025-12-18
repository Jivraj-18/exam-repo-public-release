import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-kill";
  const title = "Terminate a Process";

  const answer = "kill 1234";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command sends a termination signal
        to a process with PID <code>1234</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
