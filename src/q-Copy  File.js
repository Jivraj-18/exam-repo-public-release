import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-cp";
  const title = "Copy File";

  const answer = "cp a.txt b.txt";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command copies the file
        <strong>a.txt</strong> to a new file named
        <strong>b.txt</strong> in the same directory?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
