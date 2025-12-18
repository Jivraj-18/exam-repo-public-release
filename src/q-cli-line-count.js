import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-line-count";
  const title = "Count Lines in File";

  const answer = "wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command is used to count the
        <strong>number of lines</strong> in a text file?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
