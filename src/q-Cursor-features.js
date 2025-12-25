import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cursor-syntax";
  const title = "Cursor Context Syntax";

  const answer = "@";

  const question = html`
    <div class="mb-3">
      <p>
        In the Cursor editor, which specific symbol do you type to reference 
        specific files, functions, or the codebase in the chat?
      </p>
      <label for="${id}" class="form-label">Symbol:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}