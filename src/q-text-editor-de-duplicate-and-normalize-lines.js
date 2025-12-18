import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-editor-normalize";
  const title = "Editor: Normalize and Deduplicate";

  const answer = "Convert all lines to lowercase, trim whitespace, then remove duplicate lines";

  const question = html`
    <div class="mb-3">
      <p>
        You have a text file containing category labels with inconsistent
        casing, spacing, and duplicates.
      </p>
      <p>
        In a code editor like VS Code, what sequence of actions ensures you
        end up with <strong>unique, lowercase, trimmed labels</strong>?
      </p>
      <label for="${id}" class="form-label">Steps:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
