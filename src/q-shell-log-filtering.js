import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-http-errors";
  const title = "Shell: Count HTTP 5xx Errors";

  const answer = "grep 'status=5' access.log | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        You are analyzing a web server access log.
        Each line contains a field like <code>status=200</code>.
      </p>
      <p>
        Which shell command counts the number of requests that resulted in
        <strong>server-side errors (5xx)</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
