import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-image-generation";
  const title = "LLM Image Generation";

  const answer = "gpt-image-1";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI model is specifically designed for
        <strong>image generation and image editing</strong>
        tasks via the Images API?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
