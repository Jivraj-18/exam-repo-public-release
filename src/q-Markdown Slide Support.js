import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-reveal-markdown";
  const title = "RevealJS Markdown Support";

  const answer = "data-markdown";

  const question = html`
    <div class="mb-3">
      <p>
        In RevealJS, which <strong>HTML attribute</strong> allows you to write
        slide content using <strong>Markdown syntax</strong> instead of plain HTML?
      </p>
      <label for="${id}" class="form-label">Attribute:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
