import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-log-filter";
  const title = "Shell: Filter error responses";

  const answer = "grep \"status=5\" access.log | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        You are analyzing an HTTP access log stored in <code>access.log</code>.
        Each line contains a field like <code>status=500</code>.
      </p>
      <p>
        Which shell command counts <strong>all server error responses (5xx)</strong>
        in the file?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
