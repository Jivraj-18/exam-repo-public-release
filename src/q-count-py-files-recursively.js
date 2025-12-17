import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-cli-basic-5";
    const title = "Count Python files";

    const answer = "find . -name \"*.py\" | wc -l";

    const question = html`
    <div class="mb-3">
      <p>
        Which Linux command counts how many <strong>Python files</strong>
        (files ending with <code>.py</code>) exist in the
        <strong>current directory and all subdirectories</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
