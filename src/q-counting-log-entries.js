import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-count";
  const title = "Shell: Counting Lines";

  const answer = "wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        You are auditing a server log file named <code>access.log</code>. Which
        command-line utility (with flag) would you use to count the
        <strong>total number of lines</strong> in the file to estimate traffic
        volume?
      </p>
      <label for="${id}" class="form-label">Command (e.g., cmd -opt):</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="cmd -opt"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
