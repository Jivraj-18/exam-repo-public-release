import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-uv-metadata";
  const title = "uv Inline Script Metadata";

  const answer = "# /// script";

  const question = html`
    <div class="mb-3">
      <p>
        The <code>uv</code> tool supports inline script metadata (PEP 723) to run Python scripts 
        with dependencies without a separate requirements file. 
      </p>
      <p>
        What is the <strong>exact line of text</strong> that must appear at the start of the 
        dependency block in your Python file?
      </p>
      <label for="${id}" class="form-label">Start marker:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="# /// script" />
    </div>
  `;

  return { id, title, weight, question, answer };
}