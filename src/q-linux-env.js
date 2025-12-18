import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-linux-env";
  const title = "Linux Environment Variable";

  const answer = "echo $PATH";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command displays the value of the <code>PATH</code>
        environment variable?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
