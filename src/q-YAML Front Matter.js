import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-marp-yaml";
  const title = "Marp Presentation Metadata";

  const answer = "marp: true";

  const question = html`
    <div class="mb-3">
      <p>
        What <strong>mandatory YAML front-matter line</strong> tells Marp that a
        Markdown file should be treated as a <strong>presentation</strong>?
      </p>
      <label for="${id}" class="form-label">YAML line:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
