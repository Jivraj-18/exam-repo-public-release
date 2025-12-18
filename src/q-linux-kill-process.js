import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-linux-kill";
  const title = "Terminate a Process";

  const answer = "kill -9";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command forcefully terminates a process
        using the <strong>SIGKILL</strong> signal?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

