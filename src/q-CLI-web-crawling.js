import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-recursive";
  const title = "Recursive Website Download";

  const answer = "wget --recursive --no-parent https://example.com/docs/";

  const question = html`
    <div class="mb-3">
      <p>
        Which <code>wget</code> command downloads a website recursively
        <strong>without visiting parent directories</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
