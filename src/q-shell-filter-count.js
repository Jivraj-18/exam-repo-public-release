import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-status-count";
  const title = "Count Successful HTTP Responses";

  const answer = "grep \"status=200\" access.log | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        You have an HTTP access log named <code>access.log</code>.
        Which shell command counts how many requests returned a
        <strong>200 OK</strong> status?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
