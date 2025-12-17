import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-count-errors";
  const title = "Shell Log Analysis";

  const answer = "grep \"ERROR\" app.log | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        Which shell command counts the number of lines containing
        the word <strong>ERROR</strong> in a file named <code>app.log</code>?
      </p>
      <label for=${id} class="form-label">Shell Command:</label>
      <input class="form-control" id=${id} name=${id} />
    </div>
  `;

  return { id, title, weight, question, answer };
}
