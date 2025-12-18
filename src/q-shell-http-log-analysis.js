import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-http-log-analysis";
  const title = "Shell: HTTP Log Status Analysis";

  const answer = "grep \"status=500\" access.log | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        You are analyzing an HTTP access log file named <code>access.log</code>.
        Each line contains a key-value pair <code>status=XXX</code>.
      </p>
      <p>
        Which shell command counts how many requests resulted in an
        <strong>HTTP 500 Internal Server Error</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
