import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-marp-export";
  const title = "Marp Export Command";

  const answer = "marp slides.md -o slides.html";

  const question = html`
    <div class="mb-3">
      <p>
        You are creating technical documentation using <strong>Marp</strong>.
        Which command exports a Markdown file named
        <code>slides.md</code> into an <strong>HTML presentation</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
