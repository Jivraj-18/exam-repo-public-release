import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-awk-second-column";
  const title = "Extract CSV Column";

  const answer = "awk -F',' '{print $2}' data.csv";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command prints only the
        <strong>second column</strong> from a comma-separated file
        <strong>data.csv</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
