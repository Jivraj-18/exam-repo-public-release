import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-csv-summary";
  const title = "llm: CSV Summary Pipeline";

  const answer = 'cat data.csv | llm "Generate a brief statistical summary with insights"';

  const question = html`
    <div class="mb-3">
      <p>
        You have a file called <code>data.csv</code>. Write a
        <strong>Bash pipeline</strong> that reads the file and uses
        Simon Willison's <code>llm</code> CLI to generate a
        <strong>brief statistical summary with insights</strong>.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
