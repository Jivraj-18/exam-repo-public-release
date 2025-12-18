import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-count-lines";
  const title = "Count Lines in a File";
  const answer = "wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command is used to <strong>count the number of lines</strong>
        in a file?
      </p>
      <p class="text-muted">
        Example usage: command filename.txt
      </p>
    </div>
  `;

  return { id, title, question, answer, weight };
}
