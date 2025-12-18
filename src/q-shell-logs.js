import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-logs";
  const title = "Shell: HTTP Error Analysis";

  const answer = "42";

  const question = html`
    <div class="mb-3">
      <p>
        You are analysing an HTTP access log using shell tools.
        Each line contains timestamp, method, path, status code, and region.
      </p>
      <p>
        Filter for <strong>GET</strong> requests to paths starting with
        <code>/api/export</code> in the <strong>use1</strong> region
        that occurred on <strong>Sundays</strong>.
      </p>
      <p>
        How many of these requests returned a <strong>5xx</strong> status code?
      </p>
      <label for="${id}" class="form-label">Count:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
