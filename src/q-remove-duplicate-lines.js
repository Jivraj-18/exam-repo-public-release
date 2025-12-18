import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-editor-dedupe";
  const title = "Editor: Remove Duplicate Lines";

  const answer = "Sort lines and remove duplicates";

  const question = html`
    <div class="mb-3">
      <p>
        In a text editor like VS Code, what is the correct way to
        <strong>remove duplicate lines</strong> from a file?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
