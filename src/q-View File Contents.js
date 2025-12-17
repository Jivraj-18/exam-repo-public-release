import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-cat";
  const title = "View File Contents";

  const answer = "cat notes.txt";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command displays the contents of a file named
        <strong>notes.txt</strong> directly in the terminal?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
