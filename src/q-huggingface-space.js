import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-hf-docker-sdk";
    const title = "Hugging Face Spaces SDK";

    const answer = "docker";

    const question = html`
    <div class="mb-3">
      <p>
        In the <code>README.md</code> frontmatter of a Hugging Face Space,
        which <strong>sdk</strong> value allows you to run a fully custom
        container environment?
      </p>
      <label for="${id}" class="form-label">SDK value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}