import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-hidden-files";
  const title = "List Hidden Files";
  const answer = "ls -a";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command lists <strong>all files including hidden files</strong>
        in the current directory?
      </p>
      <p class="text-muted">
        Enter only the command.
      </p>
    </div>
  `;

  return { id, title, question, answer, weight };
}
