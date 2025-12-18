import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-grep-count";
  const title = "Count matching lines using grep";

  const answer = "grep -i error server.log | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a file <code>server.log</code>.
        Write a single shell command to count how many lines
        contain the word <strong>error</strong>, ignoring case.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
