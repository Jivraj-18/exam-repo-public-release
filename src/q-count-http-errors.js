import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-5xx";
  const title = "Shell: Count Server Errors";

  const answer = "grep 'status=5' access.log | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        Given an HTTP access log file <code>access.log</code>, which shell command
        counts all <strong>5xx server error</strong> responses?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
