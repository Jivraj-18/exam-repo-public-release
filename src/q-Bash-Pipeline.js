import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bash-count";
  const title = "Count Lines";

  const answer = "wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command counts the number of lines in input from standard input?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
