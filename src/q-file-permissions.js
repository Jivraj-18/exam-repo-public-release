import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-chmod-exec";
  const title = "Make File Executable";

  const answer = "chmod +x script.sh";

  const question = html`
    <div class="mb-3">
      <p>
        Which command makes a shell script named
        <code>script.sh</code> executable?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
