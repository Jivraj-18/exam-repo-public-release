import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-redirect";
  const title = "Output Redirection";

  const answer = ">";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux operator is used to
        <strong>redirect command output</strong> to a file,
        replacing its existing contents?
      </p>
      <label for="${id}" class="form-label">Operator:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
