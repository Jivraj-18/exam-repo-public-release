import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vision-type";
  const title = "Vision API Content Type";

  const answer = "image_url";

  const question = html`
    <div class="mb-3">
      <p>
        When sending an image to OpenAI’s Vision model inside a chat message,
        what is the required <strong>content type</strong> used for the image?
      </p>
      <label for="${id}" class="form-label">Content type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
