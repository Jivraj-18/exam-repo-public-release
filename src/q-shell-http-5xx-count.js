import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-http-5xx-count";
  const title = "Quantify Server Errors from Logs";

  const answer = "grep";

  const question = html`
    <div class="mb-3">
      <p>
        Which Unix command-line tool is most commonly used to
        <strong>filter log lines containing HTTP 5xx status codes</strong>
        before piping them into tools like <code>wc</code> or <code>awk</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
