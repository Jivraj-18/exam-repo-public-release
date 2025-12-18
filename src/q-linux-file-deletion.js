import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-linux-delete-file";
  const title = "Delete a File in Linux";

  const answer = "rm file.txt";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command deletes a file named <code>file.txt</code>
        from the current directory?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
