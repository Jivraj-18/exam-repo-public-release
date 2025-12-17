import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-basic-4";
  const title = "Show file first lines";

  const answer = "head -n 15 results.csv";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command prints the <strong>first 15 lines</strong> of the
        file <code>results.csv</code> to the terminal?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
