import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-weekend-errors";
  const title = "Shell: Weekend API Error Audit";

  const answer = "grep | awk | wc";

  const question = html`
    <div class="mb-3">
      <p>
        You are auditing HTTP access logs to quantify API instability.
        Each log line includes a UTC timestamp, HTTP method, path, status code,
        and cluster name.
      </p>
      <p>
        How would you count <strong>5xx errors</strong> for <code>POST</code> requests
        to paths starting with <code>/api/payments</code>,
        restricted to the <strong>use1</strong> cluster
        on <strong>Saturdays and Sundays</strong>?
      </p>
      <label for="${id}" class="form-label">Shell pipeline:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
