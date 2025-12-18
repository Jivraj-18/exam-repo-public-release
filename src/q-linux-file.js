import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-tar-extract";
  const title = "Extract Tarball Archive";

  const answer = "tar -xzvf archive.tar.gz";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command <strong>extracts</strong> (uncompresses) a file named 
        <code>archive.tar.gz</code> in verbose mode?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}