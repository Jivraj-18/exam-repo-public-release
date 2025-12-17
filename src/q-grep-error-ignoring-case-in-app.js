import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-basic-3";
  const title = "Find text in logs";

  const answer = 'grep -i "error" app.log';

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command searches the file <code>app.log</code> for lines
        containing the word <strong>error</strong>, ignoring
        <strong>case differences</strong> (e.g. ERROR, Error)?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
