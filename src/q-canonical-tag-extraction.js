import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-editor-tag-normalisation";
  const title = "Editor: Canonical Tag Normalisation";

  const answer = "lowercase and hyphenated";

  const question = html`
    <div class="mb-3">
      <p>
        You are cleaning a plaintext incident export in a code editor.
        Tags appear with inconsistent casing and separators such as
        commas, pipes, and slashes.
      </p>
      <p>
        After extracting the tag values, how should they be transformed
        to produce <strong>canonical labels</strong> suitable for
        de-duplication and counting?
      </p>
      <label for="${id}" class="form-label">Canonical format:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
