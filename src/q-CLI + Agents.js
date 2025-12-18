import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 2 }) {
  const id = "q-cli-evil";
  const title = "The Pipe That Lies";

  const answer = "stdin";

  const question = html`
    <div class="mb-3">
      <p>
        This command works:
        <br />
        <code>git diff | llm "analyze"</code>
        <br /><br />
        No files were passed.
        No flags were used.
        And yet the AI read everything.
        <br /><br />
        What invisible Unix mechanism
        carried the diff into the AI tool?
      </p>
      <label for="${id}" class="form-label">Mechanism:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
