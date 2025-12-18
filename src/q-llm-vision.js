import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-vision";
  const title = "LLM Vision Input Type";

  const answer = "image_url";

  const question = html`
    <div class="mb-3">
      <p>
        When sending an image to OpenAI's vision-enabled chat models,
        which <strong>content type</strong> is used to include the image
        inside a user message?
      </p>
      <label for="${id}" class="form-label">Content type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}